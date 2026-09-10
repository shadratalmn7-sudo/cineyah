# Automations

The target automation is batch-oriented and idempotent. It must never replace the public catalog with a partial or failed import.

## Ingestion stages

1. **Discover** — query approved legal sources in batches, prioritizing post-2005 feature films and Arabic-captioned media.
2. **Classify** — determine Movie or Series. Unknown classification becomes Needs Review.
3. **Verify source** — retain source page, provider, creator/uploader evidence, and file identifiers.
4. **License gate** — reject NonCommercial and unclear terms; record attribution, license URL, checked date, derivative permission, and download permission.
5. **Media probe** — verify URL, MIME type, byte-range playback, numeric runtime, and real resolution/renditions. Movies below 90 minutes are rejected.
6. **Subtitle gate** — inspect only licensed Arabic and English tracks. Arabic receives priority and is the default when present; unlicensed subtitles are rejected.
7. **Metadata** — normalize titles, year, language, country, genres, images, and a useful bilingual synopsis without copying protected catalog text.
8. **Safety** — reject explicit content; uncertainty becomes Needs Review.
9. **Deduplicate** — use stable source identifiers plus normalized title/year/runtime checks.
10. **Publish** — publish only fully passing records; otherwise preserve a hidden review record with reasons.
11. **Index** — rebuild search data, genre counts, localized metadata, and sitemaps from public records only.

## Health-check stages

Scheduled checks should probe video sources, subtitle files, images, metadata endpoints, pages, and critical dependencies. A failed source is hidden to Needs Review, not permanently deleted. The last known-good deployment remains available if discovery, indexing, or analytics fails.

## Current implementation status

- Hard 90-minute public filtering, direct-source filtering, localized duration formatting, and public genre filtering are implemented in the application.
- The current catalog is static in source control: one public record, zero series, and two documented review candidates.
- Scheduled discovery, persistent review storage, automated probing, sitemap regeneration, and health checks are specified but **not yet running**.
- Advertising automation is not configured. It cannot be implemented or verified until the owner authenticates and provides usable network zones; no paid service is enabled.
