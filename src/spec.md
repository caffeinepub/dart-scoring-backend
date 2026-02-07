# Specification

## Summary
**Goal:** Fix the Motoko canister HTTP request handler to correctly route by HTTP method + URL path (ignoring query strings), serve specific JSON endpoints with CORS, handle OPTIONS, and keep the existing HTML landing page as a fallback.

**Planned changes:**
- Implement or correct `public query func http_request(req : HttpRequest) : async HttpResponse` in `backend/main.mo` to route using `req.method` and the path component of `req.url` (ignoring any query string).
- Add JSON routes:
  - `GET /health` → `200` JSON `{"ok": true}`
  - `GET /auth/google/start` → `200` JSON `{"ok": true, "message": "google start reached"}`
  - `GET /auth/google/callback` → `200` JSON `{"ok": true, "message": "google callback reached"}`
- Add CORS headers to all JSON responses:
  - `Access-Control-Allow-Origin: *`
  - `Access-Control-Allow-Methods: GET,POST,PUT,OPTIONS`
  - `Access-Control-Allow-Headers: Content-Type, Authorization, X-ADMIN-TOKEN`
- Handle `OPTIONS` for any path with `204`, empty body, and the specified CORS headers.
- For any non-matching path, continue returning the existing HTML landing page response (`200`, `Content-Type: text/html`).

**User-visible outcome:** Visiting `/health`, `/auth/google/start`, and `/auth/google/callback` returns JSON (with CORS), any `OPTIONS` request returns `204` with CORS headers, and all other paths still show the existing HTML landing page.
