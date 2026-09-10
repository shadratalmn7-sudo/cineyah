# Cineyah — سينياه

Cineyah is a bilingual Arabic/English, legal-first streaming platform under active development. Arabic is the default locale. The public experience uses a premium cinematic dark interface and a native HTML5 player without YouTube branding.

## Live site

- Public: https://cineyah.shadrat-almn7.chatgpt.site
- Arabic: https://cineyah.shadrat-almn7.chatgpt.site/ar/
- English: https://cineyah.shadrat-almn7.chatgpt.site/en/

## Current verified inventory

- Movies: 1 (`Ulises`, 2012, 97 minutes, direct MP4, CC BY 4.0)
- Series: 0
- Episodes: 0
- Needs Review: 3
- Licensed Arabic subtitle tracks: 0

The requested 1,000-film catalog is not complete: no title is published without an item-level commercial-use license, a direct playable source, and a movie runtime of at least 90 minutes.

## Start here

Future maintainers must read `WORK_STATUS.md`, `NEXT_STEPS.md`, `ARCHITECTURE.md`, `CONTENT_POLICY.md`, `AUTOMATIONS.md`, and `DEPLOYMENT.md` before changing code.

## Development

Requirements: Node.js 22.13+.

```bash
npm run install:ci
npm run build
```

## Security

- Never commit passwords, API keys, ad-zone credentials, tokens, or private signing material.
- Runtime secrets belong in the hosting provider's secret manager.
- Do not publish films found on search engines or upload hosts unless the rights record independently proves commercial streaming permission.

## Source of truth

GitHub: https://github.com/shadratalmn7-sudo/cineyah

## Batched discovery

`python scripts/discover-films.py --limit 1000 --workers 6` produces a resumable candidate report. GitHub Actions runs it daily and on workflow/script changes. Candidates are not automatically licensed or published. See `WORK_STATUS.md` for verified execution results.
