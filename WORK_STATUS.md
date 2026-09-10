# Cineyah — Work Status

Last updated: 2026-09-10

GitHub source of truth: `shadratalmn7-sudo/cineyah`

Configured live URL: `https://cineyah.shadrat-almn7.chatgpt.site`

## Last implementation commit

- Latest code/implementation merge SHA before this handoff document: `0c0cbbd00ebaffda79143700c06a4978fe3bdb90`.
- This `WORK_STATUS.md` update is committed after that SHA; another agent should read current `main` HEAD for the documentation commit itself.

## What was completed

- Re-read the latest `main` before implementation and preserved valid existing work.
- Homepage movie interactions are link-based and route to `/{locale}/movies/{id}/`; the old homepage `selected` / `watching` preview/player overlay path was retired.
- Removed the legacy click interceptor, legacy overlay/player global CSS, and the self-mutating preview patch workflow/script that could reintroduce the old overlay.
- Built one dynamic bilingual movie-page template for all public movies, with poster/backdrop, available titles, description/story, year, localized runtime, genres, country/language/director/cast when known, real quality/subtitle state, rights/source information, conditional watch/download actions, recommendations, back navigation and AR/EN switching.
- Added collapsible `حقوق ومصدر المحتوى` / `Rights & Content Source` with only known source/license/attribution/download/right-status fields.
- Added `أفلام مشابهة` / `Similar Movies` and `قد يعجبك أيضًا` / `You May Also Like`; the current title is excluded and all recommendation cards use standalone movie routes.
- Native player uses HTML5 `<video controls playsInline>` with no YouTube/iframe primary player and no forced `crossOrigin`. It has a finite 15-second readiness timeout, explicit failure/retry state, and source fallback only when multiple declared legal sources exist.
- Quality UI is rendered only when more than one real source exists. Subtitle tracks come only from declared licensed tracks. Download appears only when both `downloadAllowed` and a concrete `downloadUrl` exist.
- Mobile CSS was revised for homepage, movie page, player, cards, hero, search, spacing, recommendation rails and portrait/landscape sizing. Arabic pages use RTL via `dir`.
- Series remains an accepted section with zero titles and the Arabic empty message `لا توجد مسلسلات متاحة حاليًا.`
- All 19 project genres are available under the collapsible Genres / التصنيفات control.
- Movie publication invariant is strict `runtimeMinutes >= 90`; the current catalog minimum is 92 minutes.
- Added the first 20-title Horror batch focused on supernatural/occult/haunted/demonic/jinn/black-magic themes. These are public metadata pages only because Cineyah does not currently have verified streaming rights for them.
- Added bilingual SEO metadata, canonical, hreflang AR/EN, OpenGraph, static route enumeration and truthful Movie JSON-LD fields.
- Added CI invariants preventing runtime-under-90 movies, homepage overlay regressions, YouTube/iframe playback, forced CORS, fake quality controls, missing rights/recommendation sections and accidental Ulises playback re-enablement.

## Build and verification

Three relevant PR verification runs completed successfully after the implementation and cleanup work. Each verified:

- pinned `pnpm` installation;
- `pnpm install --frozen-lockfile`;
- catalog/UX invariants;
- `pnpm exec tsc --noEmit`;
- `pnpm build` production build.

Latest verification run: GitHub Actions run `34514528580`, completed successfully on 2026-09-10. The immediately preceding cleanup run `34514195985` and main implementation run `34513954698` also completed successfully.

The production build statically enumerates Arabic and English movie routes through `generateStaticParams`, so both `/ar/movies/{id}/` and `/en/movies/{id}/` are covered by the build.

No real iPhone/Safari device was available in this execution environment. Mobile/iOS behavior was therefore code/HTML/CSS/CI-reviewed, not claimed as real-device playback verification.

## Player status

- Native HTML5 player architecture: implemented.
- YouTube/iframe primary playback: absent by invariant.
- Forced `crossOrigin="anonymous"`: absent by invariant.
- Native controls provide play/pause, current time/duration, seek, volume where the platform exposes it, and native fullscreen behavior where supported.
- Loading cannot remain indefinite: a 15-second readiness timeout exposes a clear error state.
- Real multi-source fallback is implemented, but no current movie has an approved playback source, so it is not being falsely demonstrated with synthetic sources.
- Current playable-stream movie count: **0**.

## Ulises (2012)

- Public movie information page remains available.
- Cineyah in-site playback is **disabled** (`sources: []`).
- Reason: the currently known Internet Archive MP4 is about 3,888,170,753 bytes (~3.89 GB). Although prior server probes showed H.264/AAC, HTTP range support and successful ffmpeg decoding, the user's real iPhone/Safari test stalled at approximately `0:00 / 1:37:28`. Server/codec probes are not treated as proof of Safari playback.
- Declared item license retained: **CC BY 4.0**, source: Internet Archive, attribution: `Ulises (2012), Abel Amador Alcalá`.
- A source download link remains exposed because the declared license permits it; this is separate from Cineyah playback.
- The old `repair-ulises` workflow/script was deleted so it cannot automatically republish the known-stalling MP4.
- Required before restoring Watch: a legal browser-suitable rendition/source plus practical Safari/iPhone playback verification.

## Current inventory

- Public movie pages: **25**.
- Public playable-stream movies: **0**.
- Horror public movie pages: **20**.
- Horror playable-stream movies: **0**.
- Series: **0**.
- Licensed subtitle tracks attached: **0**.
- All public movies satisfy `>= 90 min`; current minimum runtime: **92 min**.

Metadata/no-Cineyah-playback pages currently include all 25 public movies. Ulises additionally exposes its licensed source download link. The four pre-existing studio metadata pages are `Spider-Man: No Way Home`, `Dune: Part Two`, `The Batman`, and `Interstellar`. The 20 Horror pages are `The Exorcist`, `The Shining`, `Rosemary's Baby`, `The Omen`, `The Changeling`, `The Others`, `The Conjuring`, `The Conjuring 2`, `Insidious`, `Sinister`, `Hereditary`, `The Witch`, `The Wailing`, `Noroi: The Curse`, `Incantation`, `The Exorcism of Emily Rose`, `The Rite`, `The Possession`, `Dabbe: The Possession`, and `Siccin`.

## Rights / content-source state

- Ulises: Internet Archive item page; declared CC BY 4.0; attribution recorded; download allowed; in-site playback disabled pending a Safari-suitable source.
- Four studio titles: metadata/information only with JustWatch information links; Cineyah does not publish a stream or download for them.
- Horror batch: metadata sources are recorded per item (primarily Wikipedia; IMDb for Siccin). These references are metadata sources, **not** streaming-right grants. No Watch or Download action is published for the Horror batch.
- No pirated source, DRM bypass, hidden YouTube branding, unknown-rights subtitle file or fabricated license was added.

## Deployment status

- GitHub `main` contains the implementation and verified builds.
- The repository has no GitHub Actions deployment workflow for the configured `chatgpt.site` host.
- This chat execution environment exposes GitHub write/actions access but no ChatGPT Sites deployment control.
- Direct live fetch of `https://cineyah.shadrat-almn7.chatgpt.site` was attempted from the available web runtime and returned a cache-miss/fetch failure, so **deployment of the new `main` is not claimed as verified live**.
- Previous versions of the site existed at the configured URL, but that is not evidence that this specific `main` SHA is deployed.

## Remaining issues

- Deploy/synchronize current GitHub `main` to the configured ChatGPT Sites project using an environment that exposes the Sites deployment action, then verify the deployed revision.
- Perform a real iPhone/Safari QA pass for homepage navigation, RTL, movie-page mobile layout, native player shell and fullscreen behavior.
- Find a smaller/legal browser-suitable Ulises playback rendition or another authorized source and verify it on Safari/iPhone before restoring Watch.
- Acquire/verify actual streaming rights and any licensed subtitle tracks before converting Horror metadata pages into playable titles.
- Continue Horror toward the larger catalog target only under the same `>=90 min` and legal-first rules.

## Next handoff action

Start from current GitHub `main`, do not restore any retired overlay or Ulises auto-repair workflow, deploy that exact revision to the configured ChatGPT Sites project, verify AR/EN movie routes on the live host, then run real iPhone/Safari QA. Only after a legal playback source passes that QA should any Watch button be enabled for Ulises or the Horror catalog.
