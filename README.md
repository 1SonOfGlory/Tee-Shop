# Tee Shop

An apparel and custom-print storefront built with React, Vinext, TypeScript, Drizzle, and Cloudflare bindings. The code covers product presentation, order status, artwork handling, and payment integration boundaries.

Use Node 22.13 or later. Run `npm ci`, then `npm run dev` or `npm run build`. `DB` and `ARTWORK` name the database and object-storage bindings. Apply the migrations in `drizzle/` to your own development database. Authentication depends on the hosting platform integration and needs an equivalent verified implementation on another host.

The original hosting identity, customer records, artwork uploads, merchant credentials, and photographs are excluded. Payment settlement and shipping are not validated by this source release. Use test credentials and fictional orders during development.
