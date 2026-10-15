# Break 90 Golf publishing requirements

## Course-guide maps (user preference, October 15, 2026)

Every future state course roundup must include:
- A simple state-outline location map for every numbered course, with the branded lime dimpled golf-ball marker and an accessible directions link.
- A title/share image showing the state and every course in the article. Use numbered markers and the complete course legend; group nearby properties when needed for legibility.
- Verified approximate property coordinates and source URLs in `src/data/course-maps.json`. Do not guess coordinates or accept an unrelated geocoder match. Compare matched property and locality to the operator's official course details. Separate courses at one property may share an approximate property marker.
- A state outline in `scripts/map-data/state-outlines.json` with source attribution recorded in `docs/course-map-workflow.md`.

Use slugs containing `golf-courses-` for state roundups, with numbered `## 1. Exact Course Name` headings. Add matching `guides[slug]` data (state, numbered courses with exact heading name, locality, lon/lat, officialSource, locationSource, checked, precision). Set frontmatter image paths to `/images/articles/<slug>.png` and describe the map accurately in imageAlt/imageCaption.

`npm run build` runs the map generator, creates responsive title images and individual SVGs, and rejects missing or stale map entries. The remark plugin inserts maps beside matching course headings automatically. Never silently omit maps to get a build to pass.

Run the build and check the generated article has one location map per numbered course. Visually inspect each new state's outline/overview, nearby-course grouping, and mobile readability. State maps show approximate areas, not hole layouts or driving directions. Preserve Michigan's Upper Peninsula and New York's Long Island.
