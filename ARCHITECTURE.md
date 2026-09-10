# Cineyah Architecture

Cineyah is a server-rendered bilingual Vinext application targeting a Cloudflare Workers-compatible runtime. No paid service, storage, translation API, video CDN, advertising zone, or auto-renewing trial is enabled.

## Public application

- Arabic and English live under `/ar/` and `/en/`.
- Movies and series are separate catalog modes. A mode switch changes the visible genres, search scope, results, and empty state without a page refresh.
- English work and genre names are primary; Arabic names appear directly underneath.
- Movies pass a hard numeric runtime gate of at least 90 minutes. Raw minutes remain internal and are formatted as localized hours and minutes in the UI.
- The series data model, season selector, season accents, episode navigation, and next-episode countdown are present as a scaffold. The public series catalog is intentionally empty until complete-series rights can be verified.

## Playback

Public playback is **direct-media only**. Cineyah uses its own HTML5 player for verified direct MP4, HLS, or DASH sources whose terms permit this use. YouTube and third-party branded iframes are not public playback sources, and Cineyah never hides third-party branding with CSS or overlays.

The player exposes only qualities that exist in the approved source record. Subtitle choices are restricted to Arabic, English, and Off; Arabic is selected by default when a licensed Arabic track exists. Resume state is stored locally on the viewer's device. A movie never starts another movie automatically.

## License gate

Only item-level records with a direct source page, explicit commercial-use license or verified public-domain status, working full-length media, and required attribution can become public. CC BY, CC BY-SA, CC0, and verified public domain are potentially eligible. NonCommercial is rejected. NoDerivatives is view-only and cannot receive derived subtitles. Ambiguity is routed to Needs Review.

Internet Archive, Wikimedia Commons, and similar hosts are discovery providers, not blanket proof of rights. Each item requires its own license, uploader/creator, runtime, file, and reuse checks. Wikidata may supplement metadata under CC0 but does not license an underlying film.

Current approved public record:

- **Ulises (2012)** — 97 minutes, direct 1080p MP4, CC BY 4.0, attributed to Abel Amador Alcalá. No licensed Arabic or English subtitle track is currently attached.

## Ingestion boundary

The intended batch pipeline is:

Discover → classify Movie/Series → verify creator/source → validate license → probe runtime/media → record real renditions → inspect Arabic/English subtitles → validate metadata/synopsis → safety review → deduplicate → publish or Needs Review → regenerate indexes and sitemaps.

A failed or incomplete run must preserve the last known-good public catalog. Health failures hide an item for review rather than silently deleting its audit record.

## Deferred infrastructure

Persistent D1-backed administration, reports, aggregated analytics, scheduled ingestion, health checks, and advertising integrations remain unbuilt. HilltopAds requires owner authentication and real zone identifiers before any live VAST or external-ad behavior can be verified. No revenue figures may be synthesized.
