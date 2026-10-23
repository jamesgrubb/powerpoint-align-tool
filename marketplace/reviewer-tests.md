# Reviewer instructions and release acceptance

Draft: do not submit until pending host tests pass. No application login, subscription, test credentials or payment is required. Test only in disposable presentations. Use unrotated rectangles of unequal widths/heights to make results clear.

## Main workflow

1. Install the add-in. Create a blank presentation with three separated rectangles, then select all three.
2. Before manually opening the panel, press the left-alignment shortcut (Option+A on Mac, Alt+A on Windows). Record whether the panel opens AND whether the alignment executes on this first press. Release acceptance requires the command to execute once, without a second press.
3. Test left, right, top, bottom, horizontal centre and vertical centre (A, D, W, S, H, V with Option/Alt). Confirm relevant edges/centres coincide. Undo restores the previous positions after each operation.
4. Close the panel. Repeat every shortcut with focus on the slide canvas; verify commands execute once.
5. Select one rectangle. Check all six alignments against slide boundaries and centres, including a custom slide size. Undo each operation.
6. Select three unequal rectangles. Use Option/Alt+Shift+H and +V. Verify edge-to-edge gaps are equal; outer objects remain in place. Undo each operation.
7. Open a second/new presentation and an existing saved presentation; repeat first-use and panel-closed shortcuts. Restart PowerPoint and repeat.
8. Test no selection, only two objects for distribution, rotated objects, and insufficient space. Confirm a clear error and no partial edit.
9. Edit text and type normal content; confirm object shortcuts do not unexpectedly modify objects during text entry. Test shortcut conflicts using Office's choice dialog and verify the chosen mapping.
10. Tab through panel controls; check focus visibility, accessible names and screen reader status messages. Check narrow panels, high contrast and zoom. Click each button once to verify the same operation as its shortcut.

## Evidence matrix

| Environment / check | Status | Evidence |
| --- | --- | --- |
| Mac shortcuts with panel closed | User confirmed | Conversation 21 October 2026; exact host version not recorded in this confirmation |
| Mac unopened panel | Opens on shortcut, user confirmed | First-press operation itself pending |
| Mac full matrix, exact current build | Pending | Record OS, PowerPoint build, date, manifest and commit |
| Windows full matrix | Pending | Test default Alt conflicts with ribbon shortcuts |
| PowerPoint web compatibility | Pending | Verify supported APIs and browser conflicts |
| Undo on all commands | Pending | Host-level check required |
| Accessibility | Pending | Keyboard, screen reader, contrast and zoom |

A passing geometry test suite or manifest validator does not substitute for shortcut acceptance. Do not label pending tests as passed.
