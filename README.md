# Slide Tools for PowerPoint

Office web add-in for keyboard-driven object alignment and equal-gap spacing. Presentation edits run in PowerPoint; the app server serves static files and does not receive presentation content. No app account, payment, or macro is required.

## Features

- Six alignments: left, right, top, bottom, horizontal centre, vertical centre.
- One selected object aligns to the slide; multiple objects align to their combined bounds.
- Horizontal and vertical equal gaps for three or more objects, preserving outer positions.
- Keyboard shortcuts and graphical buttons. Rotated objects are rejected; overlapping distribution is rejected.

| Action | Mac | Windows |
| --- | --- | --- |
| Left / right | Option+A / D | Alt+A / D |
| Top / bottom | Option+W / S | Alt+W / S |
| Horizontal / vertical centres | Option+H / V | Alt+H / V |
| Horizontal / vertical gaps | Option+Shift+H / V | Alt+Shift+H / V |

## Development

Requires Node.js and Microsoft 365 PowerPoint with PowerPointApi 1.5 and SharedRuntime 1.1. Single-object slide alignment requires PowerPointApi 1.10, checked at runtime. Shortcut support must be verified on each advertised platform.

1. Install trusted local HTTPS certificates with `npx office-addin-dev-certs install`.
2. Run `npm start`. The local server uses https://localhost:3443 and certificates in `~/.office-addin-dev-certs`, overridable through `SLIDE_TOOLS_CERT_DIR`.
3. Sideload **manifest.local.xml** for local development. **manifest.xml** points to production.
4. For hosted beta installation, use https://powerpoint-align-tool.up.railway.app/install.html.

Production: https://powerpoint-align-tool.up.railway.app
Repository: https://github.com/jamesgrubb/powerpoint-align-tool (private)
Railway service: heroic-reverence. Production is connected to `jamesgrubb/powerpoint-align-tool`, branch `main`. Pushing main triggers Railway deployment. Check the deployment reaches Success before reporting a release as live.

## Checks and release preparation

Run `npm test` and `npm run check`. See [marketplace/README.md](marketplace/README.md) for submission preparation, remaining decisions, listing copy, privacy and licence pages, and the manual test matrix.

The user confirmed Mac shortcuts work with the panel closed and that a shortcut opens a previously unopened panel. Whether the first press also performs the requested operation remains to be verified. Windows and web acceptance testing is pending. Automated geometry tests do not prove host shortcut behaviour or Undo.

## Separate native experiments

VBA files and macro test presentations are development experiments, not part of the hosted add-in or marketplace offer. They are excluded from the Docker deployment. The add-in does not provide duplication, sizing, swapping, or layout-grid tools.
