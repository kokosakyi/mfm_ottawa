import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { HeroSlides } from './collections/HeroSlides'
import { Ministries } from './collections/Ministries'
import { Books } from './collections/Books'
import { Events } from './collections/Events'
import { GalleryItems } from './collections/GalleryItems'
import { Resources } from './collections/Resources'
import { Branches } from './collections/Branches'
import { ContactSubmissions } from './collections/ContactSubmissions'

import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'
import { AboutPage } from './globals/AboutPage'
import { ConnectPage } from './globals/ConnectPage'
import { PrivacyPolicyPage } from './globals/PrivacyPolicyPage'
import { ensureSeeded } from './seed/seedDatabase'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isPostgres = Boolean(
  process.env.DATABASE_URI &&
    (process.env.DATABASE_URI.startsWith('postgres://') ||
      process.env.DATABASE_URI.startsWith('postgresql://')),
)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — MFM Ottawa CMS',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    HeroSlides,
    Books,
    Events,
    GalleryItems,
    Resources,
    Ministries,
    Branches,
    ContactSubmissions,
  ],
  globals: [SiteSettings, HomePage, AboutPage, ConnectPage, PrivacyPolicyPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'mfm-ottawa-payload-cms-secret-key',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: isPostgres
    ? postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI,
        },
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URI || 'file:./mfm-ottawa.db',
        },
      }),
  plugins: [
    s3Storage({
      collections: {
        media: {
          generateFileURL: process.env.R2_PUBLIC_URL
            ? ({ filename, prefix }) => {
                const base = process.env.R2_PUBLIC_URL!.replace(/\/$/, '')
                const cleanFilename = encodeURI(filename)
                return prefix ? `${base}/${prefix}/${cleanFilename}` : `${base}/${cleanFilename}`
              }
            : undefined,
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
        region: process.env.S3_REGION || 'auto',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
      enabled: Boolean(
        process.env.S3_BUCKET &&
        process.env.S3_ACCESS_KEY_ID &&
        process.env.S3_SECRET_ACCESS_KEY,
      ),
    }),
  ],
  sharp,
  onInit: async (payload) => {
    await ensureSeeded(payload)
  },
})
