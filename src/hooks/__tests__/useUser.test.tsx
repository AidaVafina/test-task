import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { useUser } from '../useUser';
import * as api from '../../utils/api';
import type { PropsWithChildren } from 'react';

const mockUser = { 
  id: 1, 
  name: 'Alice', 
  email: 'alice@mail.com', 
  address: { 
    city: 'Moscow', 
    street: 'Test Street', 
    suite: 'Suite 1', 
    zipcode: '12345',
    geo: { lat: '55.7558', lng: '37.6176' }
  }, 
  username: 'alice', 
  phone: '123-456-7890', 
  website: 'alice.com', 
  company: { 
    name: 'Test Company',
    catchPhrase: 'Test phrase',
    bs: 'Test bs'
  } 
};

describe('useUser', () => {
  beforeEach(() => {
    vi.spyOn(api, 'getUserById').mockResolvedValue(mockUser);
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

  it('должен возвращать пользователя по id', async () => {
    const { result } = renderHook(() => useUser(1), { wrapper });
    await waitFor(() => !result.current.loading);
    expect(result.current.user).toBeDefined();
    expect(result.current.user?.name).toBe('Alice');
  });
}); 