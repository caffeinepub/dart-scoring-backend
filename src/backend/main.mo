import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";

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

  let gameIdCounter = Map.empty<Id, Id>();
  let playerIdCounter = Map.empty<Id, Id>();
  let players = Map.empty<Id, Player>();
  let games = Map.empty<Id, Game>();

  func generateId(map : Map.Map<Id, Id>) : Id {
    let old = map.size();
    map.add(old + 1, old + 1);
    old + 1;
  };

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
    gameToView(game);
  };

  func gameToView(game : Game) : GameView {
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

  public shared ({ caller }) func recordThrow(gameId : Id, value : Nat, multiplier : Nat) : async ThrowResult {
    if (value > 20 and value != 25) {
      Runtime.trap("Invalid value");
    };
    if (multiplier > 3) {
      Runtime.trap("Invalid multiplier");
    };

    let throwResult = {
      score = value;
      multiplier;
    };

    let game = switch (games.get(gameId)) {
      case (null) { Runtime.trap("Game does not exist") };
      case (?game) { game };
    };
    game.throws.add(throwResult);

    throwResult;
  };

  public shared ({ caller }) func recordTurn(gameId : Id, throws : [ThrowResult]) : async TurnResult {
    if (throws.size() != 3) {
      Runtime.trap("A turn must have 3 throws");
    };
    let turnResult : TurnResult = {
      throws;
    };

    let game = switch (games.get(gameId)) {
      case (null) { Runtime.trap("Game does not exist") };
      case (?game) { game };
    };
    game.turns.add(turnResult);

    turnResult;
  };

  public query ({ caller }) func getGameState(gameId : Id) : async GameState {
    let game = switch (games.get(gameId)) {
      case (null) { Runtime.trap("Game does not exist") };
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
      func(game) { gameToView(game) }
    );
  };
};
