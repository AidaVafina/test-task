import type { User } from "../types";
import { getUserById } from "../utils/api";
import { useQuery } from '@tanstack/react-query';

interface UseUserResult {
    user: User | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useUser = (userId: number): UseUserResult => {
    const { data: user, isLoading, error, refetch } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUserById(userId),
    });

    return {
        user: user || null,
        loading: isLoading,
        error: error ? error.message : null,
        refetch,
    };
};
