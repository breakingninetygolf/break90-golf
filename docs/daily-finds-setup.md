# Daily Golf Finds

Automated five-per-day rotation of existing preapproved Amazon affiliate catalog products, published to /daily-finds/. The archive and category pages update from src/data/daily-finds.json automatically. Astro sitemap discovers all category pages; empty categories are noindex until populated.

Schedule: 15:17 UTC daily (GitHub scheduled runs may be delayed). Five unused entries are selected per edition. No ASINs are invented. Missing/invalid data prevents selection. If fewer than five unused products remain, no edition is published. New products in src/data/products.json become eligible automatically once their images are added.

**Important limitations**: This version does not discover new products, independently verify Amazon listings, or create new artwork. Existing catalog entries must be reviewed for correct product identity, affiliate eligibility, image rights and description accuracy before activating the scheduled job. For indefinitely posting five new products daily, integrate an Amazon-authorized product data source and image licensing workflow. Do not scrape Amazon. Amazon and FTC disclosure requirements should be checked before release. The public page includes a clear affiliate disclosure.

Before merge: run npm ci && npm run build, inspect desktop/mobile, verify internal links and metadata, and ensure GitHub Actions has permission to push to main. Cloudflare Pages must be connected to main. Do not merge without validating existing image licensing.
