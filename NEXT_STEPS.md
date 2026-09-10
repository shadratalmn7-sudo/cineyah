# Next Steps for Another Work Session

1. Read `README.md`, `WORK_STATUS.md`, `ARCHITECTURE.md`, `CONTENT_POLICY.md`, `AUTOMATIONS.md`, and `DEPLOYMENT.md` first.
2. Clone `https://github.com/shadratalmn7-sudo/cineyah`, run `git log -1 --oneline`, and inspect the latest commit. GitHub is the source of truth.
3. Do not rebuild completed UI, Movies/Series separation, duration formatting, search, genre filtering, or the native player without a verified regression.
4. Run the production build and a short smoke test, then start from the exact status in `WORK_STATUS.md`.

## Next priority

Expand the movie library in large automated batches. Every public movie must:

- be from 2005 or newer unless the owner changes that rule;
- be a complete feature of at least 90 minutes;
- display duration as hours/minutes, never raw public minutes;
- have a clear license allowing commercial streaming in the implemented way;
- use a direct legal MP4/HLS/DASH source in Cineyah's native player;
- never use a YouTube embed when YouTube branding/interface appears;
- expose only real qualities and Arabic, English, or Off subtitle choices;
- prefer a legally licensed Arabic subtitle track;
- have a concise, human, non-infringing 2–4 sentence synopsis;
- go to Needs Review whenever type, ownership, license, runtime, safety, source, or subtitle rights are unclear.

Movies and Series must remain separate in discovery, genres, search, and results. Complete the qualified movie catalog first; then implement and populate series seasons/episodes, previous/next playback, and verified countdown autoplay.

Do not use Moviz Time or similar aggregation sites unless they provide independently verifiable commercial redistribution and embedding authorization for the specific title. Search visibility and technical playback are not licenses.

After acquisition: implement persistent ingestion/admin, health checks, localized SEO routes/sitemaps, analytics, then policy-compliant advertising.

## Latest concrete continuation

GitHub import is finished; do not recreate the repository. Start with latest main, not the old local handoff commit. The latest source adds `lib/catalog.ts`, title routes and `scripts/discover-films.py`.

1. Inspect Actions → Discover licensed feature candidates. Its first push and daily schedule produce an artifact; verify actual execution and download the report. Local API request timed out in Work. Do not claim 1,000 discovered or published from the configured limit.
2. Review `content/review.json`, particularly Valkaama. Retrieve the creator-authorized MKV and English SRT, measure the complete runtime, convert AC3 to AAC/MP4 and SRT to VTT, arrange authorized hosting, preserve ShareAlike attribution, and test before publishing. Prefer licensed Arabic subtitles.
3. Add the missing rights/probe/synopsis/import stages. Discovery only is implemented. Never automate rights approval from Internet Archive license metadata alone.
4. Diagnose Ulises playback: current cloud browser reaches retry/error, not confirmed playback. Investigate source headers/codecs and actual device behavior.
5. Verify sitemap/robots on production, then continue toward at least 1,000 distinct films. Do not inflate genre overlap into distinct movie count.

First action next session: inspect run `34492224567` and its `film-discovery-report` artifact. It was still in progress at final documentation time. Start from GitHub main; all 121 tracked files are preserved.

## Latest owner priority — supersedes broad acquisition order

Read `CONTENT_ROADMAP.md`. Focus on the first **100 supernatural horror movies** (sorcery, jinn, ghosts, possession); crime-only films do not qualify. Then 100 per other genre. Discovery defaults to `--genre horror`. The user corrected “Arabic” to “horror”; do not add an Arabic-origin restriction.
