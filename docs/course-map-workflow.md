# Course guide maps

The user requested this as the default for all course guides on October 15, 2026. See AGENTS.md for the publishing checklist.

- `src/data/course-maps.json`: fourteen guides, 140 ordered entries, approximate property coordinates and lookup/operator source URLs. Locations were checked for property and locality matches; not precise hole or entrance locations.
- `scripts/map-data/state-outlines.json`: simplified state polygons extracted from https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json (accessed October 15, 2026). Geographic reference outlines; no navigation use.
- `src/lib/course-map-renderer.mjs`: state-bound coordinate projection, dimpled lime ball markers, left title/right state map title layout with small golf-ball markers (no panels or legend). Michigan retains both peninsulas; New York retains Long Island.
- `scripts/generate-course-maps.mjs`: runs automatically through npm prebuild. Requires sharp, validates course counts/names/coordinates/sources, and creates responsive 1200×630 PNG/WebP title images, 600px WebP thumbnails, plus individual SVG maps.
- `src/lib/course-maps-remark.mjs`: inserts a linked per-course figure after every matched numbered H2 while compiling Markdown. It does not modify article body content.

To add a state guide, add the relevant state polygon with provenance, add numbered course location records using the same schema, and write the article with matching names. Verify suspicious geocoder matches against official venue information. Use the complete state outline and clear approximate-location captions. No API calls or map provider keys are needed at build or page-view time.

Run `npm run build`, check the location-map count equals the guide's course count, and inspect the generated overview for clipped markers or state boundaries. Generated files are deterministic and may be committed with the article. Publishing through the existing GitHub workflow triggers Cloudflare deployment.

Wisconsin and Georgia outlines were added October 15, 2026 from the same PublicaMundi US state collection. Course coordinates use ArcGIS property/place candidates matched against operator locality and address information; shared resort facilities may use one approximate property point. The four new guides include 40 individual maps and four overview maps.

Texas added October 15, 2026 using the same PublicaMundi state-outline source and ArcGIS property matching workflow. Two guides add 20 individual course figures and two overview maps. Current operator names and access requirements are preserved, including Lost Pines Golf Club (formerly Wolfdancer), resort-only Barton Creek/TPC access and Fields Ranch public bookings.
