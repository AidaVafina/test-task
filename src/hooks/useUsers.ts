import { useState, useMemo } from 'react';
import type { User } from "../types";
import { getUsers } from "../utils/api";
import { useQuery } from '@tanstack/react-query';

interface UseUsersResult {
    users: User[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredUsers: User[];
    refetch: () => void;
}

export const useUsers = (): UseUsersResult => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const { data: users = [], isLoading, error, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    const filteredUsers = useMemo(() => {
        const lowerQuery = searchQuery.toLowerCase();
        return users.filter((user) =>
            user.name.toLowerCase().includes(lowerQuery)
        );
    }, [searchQuery, users]);

    return {
        users,
        loading: isLoading,
        error: error ? error.message : null,
        searchQuery,
        setSearchQuery,
        filteredUsers,
        refetch,
    };
};
