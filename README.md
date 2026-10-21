# Slide Tools — Mac PowerPoint prototype

Independent Office web add-in: Figma alignment shortcuts, equal-gap distribution, captured-reference sizing, position swapping, and configurable shortcuts. No backend receives presentation data.

## Run and load

Requires Node.js and PowerPoint for Mac 16.105.2+, PowerPointApi 1.5 and SharedRuntime 1.1. Slide alignment also requires PowerPointApi 1.10 (checked at runtime).

1. Install trusted HTTPS certificates using `npx office-addin-dev-certs install`. macOS may request Keychain permission. Server reads `~/.office-addin-dev-certs/localhost.key` and `localhost.crt`; override directory with `SLIDE_TOOLS_CERT_DIR`.
2. Run `npm start` in this directory. Keep the server running at https://localhost:3443.
3. Copy `manifest.xml` to `~/Library/Containers/com.microsoft.Powerpoint/Data/Documents/wef/slide-tools.xml`, creating the directory if absent.
4. Load Slide Tools via PowerPoint's Add-ins menu. If absent, save work and restart PowerPoint.
5. Open Slide Tools from the Home ribbon once per presentation to activate keyboard actions.

## Default keys

| Action | Key |
| --- | --- |
| Left / right | Option+A / D |
| Top / bottom | Option+W / S |
| Horizontal / vertical centers | Option+H / V |
| Horizontal / vertical equal gaps | Option+Shift+H / V |
| Match width / height / both | Option+Shift+W / S / B |
| Swap top-left positions | Option+Shift+X |

Capture one reference object's size before selecting objects to resize. Matching dimensions can distort pictures. Distribution preserves outer objects and rejects negative gaps. Rotated objects are rejected in this preview. Shortcuts are stored using Office settings; conflicts may prompt for a choice. Test shape shortcuts outside text editing.

## Duplicate in place — native companion

Office.js has no general shape duplication method. `DuplicateInPlace.bas` uses PowerPoint's native VBA Duplicate method to preserve editable objects, restore the original range's left/top coordinates, and select the copies.

Import the module via PowerPoint's Visual Basic Editor > File > Import File into a dedicated macro-enabled presentation (.pptm). Run `DuplicateInPlace` using Tools > Macro > Macros. It can later be packaged as a .ppam add-in. The web add-in does not call this module. Command+D remapping to the macro needs a separate native Mac integration and is not implemented or verified. Built-in Duplicate is unchanged.

## Validation

`npm test`: geometry tests for all six alignments, unequal-size distribution, swap round trips, resizing, slide centering, and invalid selections. `npm run check`: syntax checks.

Live host behavior, shortcut conflicts, Undo, and macro execution still require PowerPoint validation. On a disposable slide, test three unequal shapes, every operation, and Undo. Test keys with the sidebar closed and while editing text. Verify the native macro duplicates single and multiple selections without moving them and leaves copies selected.

## Remove

Remove only `slide-tools.xml` from PowerPoint's wef folder, save your work and restart PowerPoint. Stop the Node server. Remove the imported macro module separately if installed.

## References

- https://learn.microsoft.com/en-us/office/dev/add-ins/design/keyboard-shortcuts
- https://learn.microsoft.com/en-us/office/dev/add-ins/develop/configure-your-add-in-to-use-a-shared-runtime
- https://learn.microsoft.com/en-us/office/dev/add-ins/testing/sideload-an-office-add-in-on-mac
- https://learn.microsoft.com/en-us/office/vba/api/powerpoint.shaperange.duplicate

## Current verification status

Microsoft manifest validator passes; six geometry tests and JavaScript syntax checks pass. After restarting PowerPoint, the Slide Tools sidebar loads successfully and displays “Align left · 3 objects.” This status was observed in the existing presentation; no edits were made to that presentation during verification. The earlier disabled-add-in blocker is resolved. Full shortcut, Undo, and object-operation acceptance testing remains outstanding. The duplicate-in-place macro has not been imported or executed; Command+D replacement remains unfinished.

## Railway hosting

Hosted at https://heroic-reverence-production-529f.up.railway.app. Deployment 9fdd79c8-fe49-4ab3-9932-0e8d271a3241 reached SUCCESS. manifest.xml uses the hosted URL; manifest.local.xml preserves the local development setup. Railway serves the static add-in code; presentation edits still run inside PowerPoint. No local server is needed with the hosted manifest. Restart PowerPoint to reload a replaced manifest.

## Small-group beta

Share https://heroic-reverence-production-529f.up.railway.app/install.html for Mac setup, manifest download, test checklist, limitations, and removal instructions. Duplicate-in-place is explicitly excluded from this beta. No invitations have been sent.
