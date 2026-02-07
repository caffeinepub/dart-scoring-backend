import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Player, GameView, Id } from '../backend';

export function useGetAllPlayers() {
    const { actor, isFetching } = useActor();

    return useQuery<Player[]>({
        queryKey: ['players'],
        queryFn: async () => {
            if (!actor) return [];
            return actor.getAllPlayers();
        },
        enabled: !!actor && !isFetching,
    });
}

export function useGetAllGames() {
    const { actor, isFetching } = useActor();

    return useQuery<GameView[]>({
        queryKey: ['games'],
        queryFn: async () => {
            if (!actor) return [];
            return actor.getAllGames();
        },
        enabled: !!actor && !isFetching,
    });
}

export function useCreatePlayer() {
    const { actor } = useActor();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (name: string) => {
            if (!actor) throw new Error('Actor not initialized');
            return actor.createPlayer(name);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['players'] });
        },
    });
}

export function useCreateGame() {
    const { actor } = useActor();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (playerIds: Id[]) => {
            if (!actor) throw new Error('Actor not initialized');
            return actor.createGame(playerIds);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['games'] });
        },
    });
}
