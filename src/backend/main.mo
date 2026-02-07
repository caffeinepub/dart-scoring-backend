import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Text "mo:core/Text";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Char "mo:core/Char";

actor {
  module Player {
    public func compare(player1 : Player, player2 : Player) : Order.Order {
      Text.compare(player1.name, player2.name);
    };
  };

  module Game {
    public func compare(game1 : Game, game2 : Game) : Order.Order {
      Nat.compare(game1.id, game2.id);
    };
  };

  type Id = Nat;
  type Player = {
    id : Id;
    name : Text;
  };

  type ThrowResult = {
    score : Nat;
    multiplier : Nat;
  };

  type TurnResult = {
    throws : [ThrowResult];
  };

  type GameState = {
    currentPlayer : Nat;
    remainingScores : [Nat];
    totalScores : [Nat];
    isOver : Bool;
  };

  type Game = {
    id : Id;
    playerIds : [Id];
    currentPlayer : Nat;
    remainingScores : [Nat];
    totalScores : [Nat];
    isOver : Bool;
    throws : List.List<ThrowResult>;
    turns : List.List<TurnResult>;
  };

  type GameView = {
    id : Id;
    playerIds : [Id];
    currentPlayer : Nat;
    remainingScores : [Nat];
    totalScores : [Nat];
    isOver : Bool;
    throws : [ThrowResult];
    turns : [TurnResult];
  };

  module GameView {
    public func fromGame(game : Game) : GameView {
      {
        id = game.id;
        playerIds = game.playerIds;
        currentPlayer = game.currentPlayer;
        remainingScores = game.remainingScores;
        totalScores = game.totalScores;
        isOver = game.isOver;
        throws = game.throws.toArray();
        turns = game.turns.toArray();
      };
    };
  };

  let games = Map.empty<Id, Game>();
  let players = Map.empty<Id, Player>();

  let gameIdCounter = Map.empty<Id, Id>();
  let playerIdCounter = Map.empty<Id, Id>();

  func generateId(map : Map.Map<Id, Id>) : Id {
    let old = map.size();
    map.add(old + 1, old + 1);
    old + 1;
  };

  // Game Logic Functions
  public shared ({ caller }) func createPlayer(name : Text) : async Player {
    let id = generateId(playerIdCounter);
    let player = {
      id;
      name;
    };
    players.add(id, player);
    player;
  };

  public shared ({ caller }) func createGame(playerIds : [Id]) : async GameView {
    let id = generateId(gameIdCounter);
    let game = {
      id;
      playerIds;
      currentPlayer = 0;
      remainingScores = Array.repeat(501, playerIds.size());
      totalScores = Array.repeat(0, playerIds.size());
      isOver = false;
      throws = List.empty<ThrowResult>();
      turns = List.empty<TurnResult>();
    };
    games.add(id, game);
    mergeGameWithThrowsAndTurns(game);
  };

  public shared ({ caller }) func recordThrow(gameId : Id, value : Nat, multiplier : Nat) : async ThrowResult {
    if (value > 20 and value != 25) {
      return { score = 0; multiplier = 0 };
    };
    if (multiplier > 3) {
      return { score = 0; multiplier = 0 };
    };

    let throwResult = {
      score = value;
      multiplier;
    };

    switch (games.get(gameId)) {
      case (null) { throwResult };
      case (?game) {
        game.throws.add(throwResult);
        throwResult;
      };
    };
  };

  public shared ({ caller }) func recordTurn(gameId : Id, throws : [ThrowResult]) : async TurnResult {
    if (throws.size() != 3) {
      return { throws = [] };
    };

    let turnResult = { throws };

    switch (games.get(gameId)) {
      case (null) { turnResult };
      case (?game) {
        game.turns.add(turnResult);
        turnResult;
      };
    };
  };

  public query ({ caller }) func getGameState(gameId : Id) : async GameState {
    let game = switch (games.get(gameId)) {
      case (null) { return { currentPlayer = 0; remainingScores = []; totalScores = []; isOver = true } };
      case (?game) { game };
    };
    {
      currentPlayer = game.currentPlayer;
      remainingScores = game.remainingScores;
      totalScores = game.totalScores;
      isOver = game.isOver;
    };
  };

  public query ({ caller }) func getAllPlayers() : async [Player] {
    players.values().toArray().sort();
  };

  public query ({ caller }) func getAllGames() : async [GameView] {
    games.values().toArray().map(
      func(game) { mergeGameWithThrowsAndTurns(game) }
    );
  };

  func mergeGameWithThrowsAndTurns(game : Game) : GameView {
    {
      id = game.id;
      playerIds = game.playerIds;
      currentPlayer = game.currentPlayer;
      remainingScores = game.remainingScores;
      totalScores = game.totalScores;
      isOver = game.isOver;
      throws = game.throws.toArray();
      turns = game.turns.toArray();
    };
  };

  // HTTP Routing patterns
  type Route =
    { #health } or { #authGoogleStart } or { #authGoogleCallback } or { #other };

  func routePath(path : Text) : Route {
    switch (path) {
      case ("/health") { #health };
      case ("/auth/google/start") { #authGoogleStart };
      case ("/auth/google/callback") { #authGoogleCallback };
      case (_) { #other };
    };
  };

  // Returns string up to first '?' (used for HTTP endpoint path matching)
  func pathOfUrl(url : Text) : Text {
    let questionMarkIndex = url.toArray().findIndex(func(c) { c == '?' });
    switch (questionMarkIndex) {
      case (null) { url };
      case (?index) {
        let chars = url.toArray();
        var path = "";
        var i = 0;
        while (i < index) {
          path #= chars[i].toText();
          i += 1;
        };
        path;
      };
    };
  };

  // ================
  // HTTP Interface
  // ================
  /// HTTP method.
  type HttpMethod = Text;
  /// HTTP header.
  type HttpHeader = (Text, Text);
  /// HTTP body.
  type HttpBody = [Nat8];
  /// HTTP status code.
  type HttpStatusCode = Nat16;
  /// HTTP request.
  type HttpRequest = {
    method : HttpMethod;
    url : Text;
    headers : [HttpHeader];
    body : HttpBody;
  };
  /// HTTP response.
  type HttpResponse = {
    status_code : HttpStatusCode;
    headers : [HttpHeader];
    body : HttpBody;
  };

  func defaultCORSHeaders() : [HttpHeader] {
    [
      ("Access-Control-Allow-Origin", "*"),
      ("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS"),
      ("Access-Control-Allow-Headers", "Content-Type, Authorization, X-ADMIN-TOKEN"),
    ];
  };

  func responseHeaders(contentType : Text) : [HttpHeader] {
    defaultCORSHeaders().concat([("Content-Type", contentType)]);
  };

  func textToHttpBody(text : Text) : HttpBody {
    text.toArray().map<Char, Nat8>(func(_c) { 1 });
  };

  func withCORS(body : Text, statusCode : HttpStatusCode, contentType : Text) : HttpResponse {
    {
      status_code = statusCode;
      headers = responseHeaders(contentType);
      body = textToHttpBody(body);
    };
  };

  func toHttpBody(text : Text) : HttpBody {
    let bytes = text.toArray();
    bytes.map<Nat8, Nat8>(func(_c) { 1 });
  };

  // Adapted from https://github.com/dfinity/examples/blob/9e0622fbbb57096ae895f2fc848023f37f130cad/http_requests/src/http_requests/http_requests.mo#L20
  public query ({ caller }) func http_request(req : HttpRequest) : async HttpResponse {
    let path = pathOfUrl(req.url);
    let route = routePath(path);

    switch (req.method, route) {
      case ("OPTIONS", _) {
        {
          status_code = 204;
          headers = defaultCORSHeaders();
          body = [];
        };
      };
      case ("GET", #health) {
        withCORS(
          "{\"ok\":true}",
          200,
          "application/json"
        );
      };
      case ("GET", #authGoogleStart) {
        withCORS(
          "{\"ok\":true,\"message\":\"google start reached\"}",
          200,
          "application/json"
        );
      };
      case ("GET", #authGoogleCallback) {
        withCORS(
          "{\"ok\":true,\"message\":\"google callback reached\"}",
          200,
          "application/json"
        );
      };
      case (_) {
        withCORS(
          "{\"error\":\"not_found\"}",
          404,
          "application/json"
        );
      };
    };
  };
};
