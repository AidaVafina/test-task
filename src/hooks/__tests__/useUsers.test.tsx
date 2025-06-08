import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { useUsers } from '../useUsers';
import * as api from '../../utils/api';
import type { PropsWithChildren } from 'react';

const mockUsers = [
  { 
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
  },
  { 
    id: 2, 
    name: 'Bob', 
    email: 'bob@mail.com', 
    address: { 
      city: 'SPB', 
      street: 'Another Street', 
      suite: 'Suite 2', 
      zipcode: '54321',
      geo: { lat: '59.9311', lng: '30.3609' }
    }, 
    username: 'bob', 
    phone: '098-765-4321', 
    website: 'bob.com', 
    company: { 
      name: 'Bob Corp',
      catchPhrase: 'Bob phrase',
      bs: 'Bob bs'
    } 
  },
];

describe('useUsers', () => {
  beforeEach(() => {
    vi.spyOn(api, 'getUsers').mockResolvedValue(mockUsers);
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

  it('должен возвращать пользователей после загрузки', async () => {
    const { result } = renderHook(() => useUsers(), { wrapper });
    await waitFor(() => !result.current.loading);
    expect(result.current.users).toHaveLength(2);
    expect(result.current.users[0].name).toBe('Alice');
  });

  it('должен фильтровать пользователей по поисковому запросу', async () => {
    const { result } = renderHook(() => useUsers(), { wrapper });
    await waitFor(() => !result.current.loading);
    act(() => {
      result.current.setSearchQuery('bob');
    });
    expect(result.current.filteredUsers).toHaveLength(1);
    expect(result.current.filteredUsers[0].name).toBe('Bob');
  });
}); 