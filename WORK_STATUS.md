# Work Status

Last updated: 2026-09-10

Live environment: https://cineyah.shadrat-almn7.chatgpt.site

GitHub source of truth: https://github.com/shadratalmn7-sudo/cineyah

Last verified deployment: version 6 from local Sites commit `f63e423ca584dd3e2fd5016c415dbcdf5737e821` (succeeded on 2026-09-10).

Last verified code commit before the GitHub handoff documentation: `f63e423ca584dd3e2fd5016c415dbcdf5737e821`. The final GitHub handoff SHA is reported in the completion message and can be read with `git rev-parse HEAD` after cloning.

## Current inventory

- Public movies: **1**
- Public series: **0**
- Public episodes: **0**
- Needs Review: **2**
- Public movie: **Ulises (2012)** — 97 minutes, Drama/Mystery, direct 1080p MP4, CC BY 4.0.
- Review candidates: **LOON (2017)** and **Teddy Bears Live Forever (2019)**.
- Licensed Arabic subtitle tracks attached: **0**
- Licensed English subtitle tracks attached: **0**

## Built in the current source tree

- Bilingual Arabic/English application with centralized interface copy.
- Fast Movies/Series mode switch with separated catalog, genres, search scope, and empty states.
- English titles and genre names primary, Arabic directly beneath.
- Hard 90-minute publication filter for movies and localized duration formatting (`1 ساعة و37 دقيقة` / `1h 37m`).
- One item-level verified, post-2005, feature-length public movie.
- Cineyah-branded direct HTML5 player with no YouTube iframe or external channel branding.
- Play/pause, seeking, volume, fullscreen, Picture in Picture where supported, and device-local resume state.
- Quality menu generated only from actual approved renditions.
- Subtitle menu restricted to Arabic, English, and Off; Arabic defaults on when available.
- Series scaffolding for seasons, season accents, episodes, previous/next navigation, and a next-episode countdown. No unverified series content is published.
- Responsive catalog, instant search suggestions, bilingual genre filters, detail view, automatic seven-day New badge, and reduced-motion handling.
- Per-item source, license, attribution, and download-permission fields.

## Tested

- Fresh production build passed on 2026-09-10.
- Browser QA passed for Arabic rendering, Movies/Series separation without refresh, series empty-state isolation, scoped instant search, 90-minute runtime formatting, one native `<video>`, zero iframes, zero YouTube text/branding, and the direct approved MP4 URL.
- The source accepted byte-range delivery (`206`) for a one-megabyte probe and exposed the expected 3,888,170,753-byte media size.
- The cloud-browser media decoder showed the new honest retry state instead of completing playback. Playback is therefore **built and source-reachable, but not verified end-to-end in the cloud browser**.
- Subtitle menu behavior is implemented but cannot be media-verified because the sole public film has no licensed Arabic or English subtitle track.
- Series player/autoplay remains scaffold-only and is not claimed as tested.

## Not complete

- Catalog targets: 100 each for Action, Horror, and Comedy; 50 for every other listed genre. Current published coverage is Drama 1 and Mystery 1 from the same film; all other genre counts are zero.
- Legal Arabic subtitles for the current public film.
- Persistent database-backed ingestion, admin actions, Needs Review, reports, analytics, and health checks.
- Automated discovery, source/license rechecks, subtitle probes, deduplication, and sitemap regeneration.
- Dedicated detail/watch URLs, localized SEO metadata, structured data, and production sitemaps.
- HilltopAds VAST, external 30-minute cooldown ad, download-ad completion gate, AdBlock differentiation, and official revenue data.
- End-to-end cross-browser and mobile playback verification.

## Subsystem status

- Public site: live.
- Movies: 1 published; catalog targets are not met.
- Series: UI/data scaffold only; 0 public series and 0 episodes.
- Player: native Cineyah player is built; the direct source responds, but the cloud-browser decoder did not complete playback and showed the retry state.
- Subtitles: Arabic/English/Off UI is built; no legally licensed track is attached to the current film.
- SEO: bilingual locale routes and localized UI exist; dedicated title/watch routes, canonical/hreflang, structured data, and generated sitemaps are incomplete.
- Ads: not connected; no VAST, external cooldown ad, download ad gate, or revenue API.
- Admin: not implemented as a secured end-to-end dashboard.
- Automated ingestion: policy and pipeline are documented only; no scheduled persistent importer is running.

## Important constraints

- No paid service is enabled.
- Famous copyrighted studio films, including Marvel/Spider-Man titles, are excluded unless a verifiable commercial streaming license is obtained.
- A host's license metadata is not sufficient by itself; every film is checked at item level.
- YouTube-branded playback is not accepted for the public catalog and is never cosmetically hidden.
