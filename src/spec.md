# Specification

## Summary
**Goal:** Build a Motoko canister that persists dart scoring data and exposes a Candid API for managing players, games, and scoring events, plus a minimal themed frontend landing page.

**Planned changes:**
- Implement a single-actor Motoko backend (backend/main.mo) with stable, upgrade-safe storage for core dart scoring models (Player, Game, GameRules, Throw, Turn, Leg/Round, GameStatus).
- Expose Candid update/query APIs to create players and games, configure basic rules (starting score, double-out, max darts per turn), list games, and fetch game state by id.
- Add scoring APIs to record turns/throws with validation and deterministic score computation (including bust handling and optional double-out finishing), plus a query to retrieve a game’s current scoreboard/state (players, remaining scores, whose turn, legs/sets if modeled).
- Implement Result-style error handling for all methods (no traps on invalid input), deterministic/stable IDs via stably stored counters, and explicitly allow any caller to create/update games if no auth is added.
- Create a minimal frontend landing page (English) describing the backend and how to use it, applying a consistent distinct non-blue/purple theme without modifying immutable UI component paths.

**User-visible outcome:** Users can call a Candid API to create players and games, record dart scoring events with correct rules (including bust and double-out), and query game/scoreboard state; a simple themed landing page describes the service and usage.
