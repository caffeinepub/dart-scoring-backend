import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Player {
    id: Id;
    name: string;
}
export interface ThrowResult {
    multiplier: bigint;
    score: bigint;
}
export interface GameView {
    id: Id;
    playerIds: Array<Id>;
    totalScores: Array<bigint>;
    turns: Array<TurnResult>;
    currentPlayer: bigint;
    isOver: boolean;
    remainingScores: Array<bigint>;
    throws: Array<ThrowResult>;
}
export type HttpMethod = string;
export interface HttpResponse {
    body: HttpBody;
    headers: Array<HttpHeader>;
    status_code: HttpStatusCode;
}
export type Id = bigint;
export type HttpBody = Uint8Array;
export interface GameState {
    totalScores: Array<bigint>;
    currentPlayer: bigint;
    isOver: boolean;
    remainingScores: Array<bigint>;
}
export interface TurnResult {
    throws: Array<ThrowResult>;
}
export interface HttpRequest {
    url: string;
    method: HttpMethod;
    body: HttpBody;
    headers: Array<HttpHeader>;
}
export type HttpHeader = [string, string];
export type HttpStatusCode = number;
export interface backendInterface {
    createGame(playerIds: Array<Id>): Promise<GameView>;
    createPlayer(name: string): Promise<Player>;
    getAllGames(): Promise<Array<GameView>>;
    getAllPlayers(): Promise<Array<Player>>;
    getGameState(gameId: Id): Promise<GameState>;
    http_request(req: HttpRequest): Promise<HttpResponse>;
    recordThrow(gameId: Id, value: bigint, multiplier: bigint): Promise<ThrowResult>;
    recordTurn(gameId: Id, throws: Array<ThrowResult>): Promise<TurnResult>;
}
