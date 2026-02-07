# Specification

## Summary
**Goal:** Fix the Motoko canister HTTP handler to route specific JSON endpoints with CORS headers, and remove the HTML fallback landing page.

**Planned changes:**
- Add `public query func http_request(req : HttpRequest) : async HttpResponse` in `backend/main.mo` implementing Internet Computer HTTP interface.
- Parse `req.url` to route only by URL path (ignore any query string) and route by `req.method` + path.
- Implement exact responses: `OPTIONS` => 204 empty body; `GET /health` and stub Google auth routes => 200 JSON; all other routes => 404 JSON.
- Add required CORS headers to every response (including 204 and 404).
- Disable/remove the HTML landing page response so no route returns HTML.

**User-visible outcome:** Hitting `/health`, `/auth/google/start`, and `/auth/google/callback` returns the specified JSON responses with CORS enabled; all other paths return a JSON 404 instead of an HTML page.
