import { sql } from 'drizzle-orm'
import {
  boolean,
  check,
  date,
  index,
  integer,
  numeric,
  pgEnum,
  pgPolicy,
  pgTable,
  smallint,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const bookingStatus = pgEnum('booking_status', [
  'pending',
  'confirmed',
  'active',
  'completed',
  'cancelled',
])

export const users = pgTable('users', {
  id: uuid().primaryKey().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  first_name: varchar({ length: 64 }).notNull(),
  sur_name: varchar({ length: 124 }).notNull(),
  phone: varchar({ length: 20 }),
  phone_country_code: varchar({ length: 6 }).notNull().default('+45'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ([
  pgPolicy("Users: public read", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
  pgPolicy("Users: self insert", { as: "permissive", for: "insert", to: ["authenticated"], withCheck: sql`(auth.uid() = id)` }),
  pgPolicy("Users: self update", { as: "permissive", for: "update", to: ["authenticated"], using: sql`(auth.uid() = id)` }),
  pgPolicy("Users: self delete", { as: "permissive", for: "delete", to: ["authenticated"], using: sql`(auth.uid() = id)` }),
]))

export const pricingTiers = pgTable('pricing_tiers', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  max_boxes: integer(),
  base_weeks: smallint().notNull(),
  price_per_box: numeric({ precision: 6, scale: 2, mode: 'number' }).notNull(),
  extra_week_price_per_box: numeric({ precision: 6, scale: 2, mode: 'number' }).notNull(),
  cleaning_price_per_box: numeric({ precision: 6, scale: 2, mode: 'number' }).notNull().default(0),
  carrying_price_per_box: numeric({ precision: 6, scale: 2, mode: 'number' }).notNull().default(0),
  is_active: boolean().notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ([
  uniqueIndex('pricing_tiers_one_active_per_threshold')
    .on(table.max_boxes)
    .where(sql`is_active = true`),
]))

export const bookings = pgTable('bookings', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  user_id: uuid().references(() => users.id),
  tier_id: uuid().notNull().references(() => pricingTiers.id),
  status: bookingStatus().notNull().default('pending'),
  delivery_address: text().notNull(),
  delivery_postcode: varchar({ length: 10 }).notNull(),
  pickup_address: text().notNull(),
  pickup_postcode: varchar({ length: 10 }).notNull(),
  box_count: integer().notNull(),
  delivery_date: date({ mode: 'date' }).notNull(),
  pickup_date: date({ mode: 'date' }).notNull(),
  extra_weeks: smallint().notNull().default(0),
  add_cleaning: boolean().notNull().default(false),
  add_carrying: boolean().notNull().default(false),
  total_price: numeric({ precision: 10, scale: 2, mode: 'number' }).notNull(),
  customer_name: varchar({ length: 128 }).notNull(),
  customer_email: varchar({ length: 255 }).notNull(),
  customer_phone: varchar({ length: 20 }).notNull(),
  customer_phone_country_code: varchar({ length: 6 }).notNull().default('+45'),
  booking_number: varchar({ length: 20 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ([
  index('bookings_dates_idx').on(table.delivery_date, table.pickup_date),
  pgPolicy("Bookings: public insert", { as: "permissive", for: "insert", to: ["public"], withCheck: sql`true` }),
  pgPolicy("Bookings: owner select", { as: "permissive", for: "select", to: ["authenticated"], using: sql`(auth.uid() = user_id)` }),
]))

export const boxPool = pgTable('box_pool', {
  id: integer().primaryKey().notNull(),
  total_boxes: integer().notNull(),
  buffer_boxes: integer().notNull().default(0),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ([
  check('box_pool_single_row', sql`${table.id} = 1`),
]))