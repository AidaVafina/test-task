import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { useUserPosts } from '../useUserPosts';
import * as api from '../../utils/api';
import type { PropsWithChildren } from 'react';

const mockPosts = [
  { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
  { id: 2, userId: 1, title: 'Post 2', body: 'Body 2' },
];

describe('useUserPosts', () => {
  beforeEach(() => {
    vi.spyOn(api, 'getPostsByUserId').mockResolvedValue(mockPosts);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: PropsWithChildren) => {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };

  it('должен возвращать посты пользователя по userId', async () => {
    const { result } = renderHook(() => useUserPosts(1), { wrapper });
    await waitFor(() => !result.current.loading);
    expect(result.current.posts).toHaveLength(2);
    expect(result.current.posts[0].title).toBe('Post 1');
  });
}); 