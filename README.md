This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Marketing & analytics (Meta Pixel + Conversions API)

Facebook/Instagram ad tracking is wired into the booking funnel. Copy `.env.example`
to `.env.local` and fill in:

| Variable | Where | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_META_PIXEL_ID` | Events Manager → Data sources | Public Pixel/Dataset ID |
| `META_CAPI_ACCESS_TOKEN` | Events Manager → Settings → Conversions API | **Server secret** |
| `META_CAPI_TEST_EVENT_CODE` | Events Manager → Test Events | QA only — leave unset in prod |

With no env vars set, nothing tracks and the consent banner stays hidden — the app
runs normally.

**Funnel → Meta event mapping** (the "how far along did they get" signal):

| Booking step | Meta event |
| --- | --- |
| `/booking` opened | `InitiateCheckout` |
| Box count chosen | `AddToCart` |
| Delivery date chosen | custom `SelectDeliveryDate` |
| Contact details submitted | `AddPaymentInfo` |
| Summary viewed | custom `ViewSummary` |
| Booking confirmed | `Purchase` (browser **and** server CAPI, deduplicated by `event_id`) |

The browser Pixel only loads after the user accepts the consent banner. The server
`Purchase` is sent from the `createBooking` action with SHA-256-hashed email/phone.

**Before go-live in Meta Business Manager:** create the Pixel + CAPI token, verify the
domain `heybox.dk`, and rank events in Aggregated Event Measurement (mark `Purchase`
as priority 1 for iOS).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
