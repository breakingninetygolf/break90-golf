# Break 90 Golf

A responsive Astro 5 static website for everyday golfers. Includes six initial articles, a working browser-only score calculator with a downloadable practice checklist, editable affiliate product data, newsletter integration, SEO metadata and a sitemap.

## Local development

Requires Node.js 20.3+ (Node 22 recommended).

```bash
npm install
npm run dev
```

Visit http://localhost:4321. Production build: `npm run build` (output `dist/`).

## Free Cloudflare deployment

1. Create a free GitHub account and a private or public repository, e.g. `break90-golf`.
2. Upload this project's files to the repository root. **Do not upload the enclosing folder as a nested folder.**
3. Create a free Cloudflare account. In **Workers & Pages**, create a **Pages** project and connect the GitHub repository. (Cloudflare's UI may change.)
4. Configure framework preset **Astro**, build command `npm run build`, output directory `dist`, and Node.js version **22** (e.g. `NODE_VERSION=22` environment variable).
5. Deploy. Cloudflare provides a free `*.pages.dev` address. No custom domain is required.
6. After deployment, set `SITE_URL` in Cloudflare build environment variables to the exact deployed `https://...pages.dev` URL, and redeploy. This fixes canonical URLs and sitemap links.
7. Later, add a custom domain under the project's domain settings and update `SITE_URL`.

If the Cloudflare UI instead offers Workers static assets, you can deploy `dist/` as a static assets project, but this README documents the simpler Pages Git-integration workflow.

## Editing content (no coding)

**Pages CMS** is a GitHub-backed editor available at https://pagescms.org/. Sign in with GitHub and select your repository. The `.pages.yml` file defines editable golf articles and products. The CMS writes changes back to GitHub, triggering an automatic Cloudflare rebuild.

Articles are stored as Markdown in `src/content/articles/`. Products are stored in `src/data/products.json`. The website currently lists product categories as placeholders with **no fabricated Amazon links**. Once you join Amazon Associates, paste your approved tracking URLs into each product's `url` field in Pages CMS. Only links with a nonempty URL render a product button. Do not paste unauthorized product photos or scrape Amazon images/prices.

**CMS note:** Pages CMS versions may differ in how they edit top-level JSON arrays. If the Products editor does not expose the list correctly, edit `src/data/products.json` directly on GitHub or migrate the product data to a collection of individual Markdown files. Article editing is ready via the CMS configuration.

## Newsletter

This website uses an optional **Buttondown** hosted subscription form. It is deliberately disabled until configured, so visitor emails are never collected without a destination.

1. Create a Buttondown account and choose a username.
2. In Cloudflare Pages > Settings > Environment variables, set `PUBLIC_BUTTONDOWN_USERNAME` to that username for production builds.
3. Redeploy, then subscribe with a test email and confirm that Buttondown receives it.
4. Verify the Buttondown account plan, sender settings, and any required email confirmation flow.

If you choose a different email provider, replace `src/components/Newsletter.astro` with its official hosted form embed.

## Affiliate compliance

Before activating Amazon affiliate links: apply to Amazon Associates, obtain your tracking ID, follow its current operating agreement and content rules, and add the exact required disclosure (`As an Amazon Associate I earn from qualifying purchases.`) to your site. Keep clear disclosures near recommendations and avoid unapproved Amazon imagery, scraped prices, or unsupported product claims.

## Pre-launch checklist

- [ ] Confirm the brand name and domain availability / trademarks
- [ ] Add operator contact information to Privacy page
- [ ] Verify newsletter signup and privacy language
- [ ] Review all article claims and test calculator on phone and desktop
- [ ] Configure canonical SITE_URL and submit sitemap to Search Console
- [ ] Apply for Amazon Associates and add approved links only after acceptance
- [ ] Add real photography or properly licensed assets if desired
- [ ] Test links, forms, accessibility and production build

## Costs

Static Cloudflare Pages hosting and Pages CMS may be usable on free tiers within limits. A `pages.dev` address is free. Custom domain, paid newsletter tiers and transaction processing are optional costs.
