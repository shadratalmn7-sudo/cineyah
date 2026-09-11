# Deployment

## Production

- Legacy Sites URL: https://cineyah.shadrat-almn7.chatgpt.site
- GitHub source: https://github.com/shadratalmn7-sudo/cineyah
- Current verified Sites deployment: version 7, succeeded 2026-09-10
- No custom domain, paid storage, paid CDN, or paid API is enabled.

## GitHub Pages fallback / production mirror

- Public fallback URL: https://shadratalmn7-sudo.github.io/cineyah/
- The `deploy-github-pages.yml` workflow deploys the current `main` branch automatically on every push.
- Use GitHub Pages as the stable public fallback whenever the legacy `chatgpt.site` hostname is unavailable or fails DNS resolution.

## Safe release procedure

1. Pull the latest `main` from GitHub.
2. Verify the tree contains no secrets or generated local runtime state.
3. Run the supported production build.
4. Smoke-test `/ar/`, `/en/`, Movies/Series isolation, search, details, and the native player DOM.
5. Commit and push the exact tested source.
6. Package and deploy that exact commit through the configured Sites project.
7. Confirm deployment success and update `WORK_STATUS.md`.

Do not activate paid services or trials. Store future Cloudflare, HilltopAds, analytics, or admin credentials only in the platform secret manager, never in Git.

## Source provenance

The first GitHub import used GitHub's Git Data API, so GitHub and the Sites source remote have different commit histories but identical source trees. Version 7 uses Sites SHA `609dd2b2ef8d25b7f510c3ba90cb1b8f136aea34`; the same code is GitHub SHA `3af040758949c881f5e841c6362e2e6588fd791f` (tree `11f8df5f1f2102d627bce361154b1c63a0a45136`). New documentation/discovery-only commits do not change the deployed website. Do not force-push one remote over the other's history. GitHub remains the source of truth; mirror its file tree onto the existing Sites history when preparing a deployment and compare tree hashes.
