import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const bucket = 'mfm-ottawa-media'
const assetsDir = path.resolve('public/assets')

function getFiles(dir) {
  const subdirs = fs.readdirSync(dir)
  const files = []
  for (const file of subdirs) {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...getFiles(fullPath))
    } else {
      files.push(fullPath)
    }
  }
  return files
}

const allFiles = getFiles(assetsDir)
console.log(`Found ${allFiles.length} files in public/assets to sync to Cloudflare R2 (${bucket})...\n`)

let uploaded = 0
for (const file of allFiles) {
  const relPath = path.relative('public', file).replace(/\\/g, '/')
  const destination = `${bucket}/${relPath}`

  try {
    console.log(`[${++uploaded}/${allFiles.length}] Uploading ${relPath}...`)
    execSync(`npx wrangler r2 object put "${destination}" --file="${file}" --remote`, {
      stdio: 'pipe',
    })
  } catch (err) {
    console.error(`Failed to upload ${relPath}:`, err.message)
  }
}

console.log('\nSync to Cloudflare R2 complete!')
