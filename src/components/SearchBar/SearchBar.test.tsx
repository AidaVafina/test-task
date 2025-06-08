import { render, fireEvent, act } from '@testing-library/react';
import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
    const mockOnSearch = vi.fn();

    beforeEach(() => {
        mockOnSearch.mockClear();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should match snapshot', () => {
        const { container } = render(<SearchBar onSearch={mockOnSearch} />);
        expect(container).toMatchSnapshot();
    });

    it('should render search input', () => {
        const { container } = render(<SearchBar onSearch={mockOnSearch} />);
        expect(container.querySelector('input')).toBeInTheDocument();
    });

    it('should call onSearch when input changes', () => {
        const { container } = render(<SearchBar onSearch={mockOnSearch} />);
        const input = container.querySelector('input');
        
        if (input) {
            fireEvent.change(input, { target: { value: 'test' } });

            act(() => {
                vi.advanceTimersByTime(300);
            });
        }

        expect(mockOnSearch).toHaveBeenCalledWith('test');
    });
}); 