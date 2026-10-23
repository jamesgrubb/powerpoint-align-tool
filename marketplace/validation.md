# Release candidate validation — 23 October 2026

- Version: 1.0.2 (manifest 1.0.2.0).
- 13 tests passed: geometry plus simulated Office action dispatch, first-call execution, single-object dimensions, unsupported APIs, error handling, conflict display and Mac keycaps.
- JavaScript syntax and git whitespace checks passed.
- Local HTTP checks: all app/support/policy/manifest/shortcut/icon URLs return 200; test source returns 404.
- Microsoft production manifest validation passed after deployment, including reachable support page and correctly sized icons.
- Deployment da78f607-5dbe-4491-bdb7-ae305f6ddaca reached Deployment successful via GitHub, commit 216b8fc.
- All deployed app, manifest, shortcut, support, privacy, licence and main icon files returned HTTP 200 and matched source bytes.
- The local sideloaded manifest was updated from 1.0.1.0 to 1.0.2.0. PowerPoint restart/reload still required for manifest refresh.
- Native Mac host version inspected: 16.114.1 (26102031), Microsoft 365. A disposable deck was opened, but the native developer add-in picker did not activate the add-in during automation. Native shortcut tests remain unverified; no pass is claimed.
- Sidebar visually inspected in an ordinary browser. This is not a native PowerPoint test or a marketplace screenshot.

Actual host keyboard routing, Undo and Windows acceptance remain release gates. See reviewer-tests.md; never infer a host pass from mocked tests.
