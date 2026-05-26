import { config } from 'dotenv'
config({ path: '.env.local' })

async function seed() {
  const { db } = await import('./index')
  const { pricingTiers } = await import('./schema')
  const { TIERS } = await import('../booking/constants')

  const rows = TIERS.map((t) => ({
    max_boxes: isFinite(t.maxBoxes) ? t.maxBoxes : null,
    base_weeks: t.baseWeeks,
    price_per_box: t.pricePerBox,
    extra_week_price_per_box: t.extraWeekPricePerBox,
    cleaning_price_per_box: t.cleaningPricePerBox,
    carrying_price_per_box: t.carryingPricePerBox,
    is_active: true,
  }))

  await db.insert(pricingTiers).values(rows)
  console.log(`Seeded ${rows.length} pricing tiers`)
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
