# Release candidate validation — 23 October 2026

- Version: 1.0.2 (manifest 1.0.2.0).
- 13 tests passed: geometry plus simulated Office action dispatch, first-call execution, single-object dimensions, unsupported APIs, error handling, conflict display and Mac keycaps.
- JavaScript syntax and git whitespace checks passed.
- Local HTTP checks: all app/support/policy/manifest/shortcut/icon URLs return 200; test source returns 404.
- Production manifest validation: XML schema and resource definitions accepted before deployment. The validator reported expected unreachable support/icon URLs because new assets had not yet been deployed. Rerun after deployment.
- Sidebar visually inspected in an ordinary browser. This is not a native PowerPoint test or a marketplace screenshot.

Actual host keyboard routing, Undo and Windows acceptance remain release gates. See reviewer-tests.md; never infer a host pass from mocked tests.
