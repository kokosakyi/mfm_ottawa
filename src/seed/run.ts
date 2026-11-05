import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { ensureSeeded } from './seedDatabase'

async function run() {
  const payload = await getPayload({ config })
  await ensureSeeded(payload)
  console.log('Seed check complete.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
