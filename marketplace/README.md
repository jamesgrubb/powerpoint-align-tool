# Marketplace release candidate 1.0.2

Publisher: James Grubb Ltd. Product: Slide Tools. First release: free, no app login or in-app purchases. Public support and privacy contact: james@jamesgrubb.co.uk (confirmed by owner). Partner Center publisher verification must match the legal publisher before submission.

## Prepared

- Production XML manifest and shortcuts.json, eight commands only.
- Original alignment icon, PNGs at 16/20/24/32/40/48/64/80/96/300 pixels; 32 px IconUrl and 64 px HighResolutionIconUrl.
- Support, privacy and licence pages; review the published wording before submitting.
- Listing copy and reviewer instructions, including error paths, conflicts, Undo and first-use shortcuts.
- Automated geometry and simulated Office command tests; GitHub Actions runs checks on pushes and pull requests.
- Existing Railway service connected to repository main (verify deployment result separately).

## Release gates still requiring evidence

- Partner Center enrolment and verified publisher identity; Microsoft billing correction is case 2610220050002227 and is separate from publisher verification.
- Real PowerPoint Mac/Windows acceptance of every shortcut on first use, with panel closed, in a new deck and after restart. User has confirmed Mac shortcuts previously; exact 1.0.2 build needs verification. Windows owner test is pending.
- Confirm single-object slide alignment on PowerPointApi 1.10 and document older-host limitation.
- Real PowerPoint screenshots for the store; a browser preview is not a host screenshot.
- Final owner review of privacy/licence/contact and platform claims before marketplace submission.
- Production manifest validation after deployment and all public URL checks.

Do not submit while shortcut acceptance remains pending. Automated dispatch tests do not test Office’s actual keyboard routing or Undo.

## Links

- Install beta: https://powerpoint-align-tool.up.railway.app/install.html
- Manifest: https://powerpoint-align-tool.up.railway.app/manifest.xml
- Support: https://powerpoint-align-tool.up.railway.app/support.html
- Privacy: https://powerpoint-align-tool.up.railway.app/privacy.html
- Licence: https://powerpoint-align-tool.up.railway.app/terms.html
- Publisher portal: https://partner.microsoft.com/dashboard
- Official checklist: https://learn.microsoft.com/en-us/partner-center/marketplace-offers/checklist
- Shortcut support: https://learn.microsoft.com/en-us/office/dev/add-ins/design/keyboard-shortcuts
