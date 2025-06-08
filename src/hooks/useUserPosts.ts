import type { Post } from "../types";
import { getPostsByUserId } from "../utils/api";
import { useQuery } from '@tanstack/react-query';

interface UseUserPostsResult {
    posts: Post[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useUserPosts = (userId: number): UseUserPostsResult => {
    const { data: posts = [], isLoading, error, refetch } = useQuery({
        queryKey: ['userPosts', userId],
        queryFn: () => getPostsByUserId(userId),
    });

    return {
        posts,
        loading: isLoading,
        error: error ? error.message : null,
        refetch,
    };
};
