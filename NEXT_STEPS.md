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
