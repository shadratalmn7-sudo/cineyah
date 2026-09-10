# Deployment

## Production

- Live URL: https://cineyah.shadrat-almn7.chatgpt.site
- GitHub source: https://github.com/shadratalmn7-sudo/cineyah
- Current verified Sites deployment: version 6, succeeded 2026-09-10
- No custom domain, paid storage, paid CDN, or paid API is enabled.

## Safe release procedure

1. Pull the latest `main` from GitHub.
2. Verify the tree contains no secrets or generated local runtime state.
3. Run the supported production build.
4. Smoke-test `/ar/`, `/en/`, Movies/Series isolation, search, details, and the native player DOM.
5. Commit and push the exact tested source.
6. Package and deploy that exact commit through the configured Sites project.
7. Confirm deployment success and update `WORK_STATUS.md`.

Do not activate paid services or trials. Store future Cloudflare, HilltopAds, analytics, or admin credentials only in the platform secret manager, never in Git.
