import { render, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage Component', () => {
    const mockMessage = 'Test error message';
    const mockOnRetry = vi.fn();

    beforeEach(() => {
        mockOnRetry.mockClear();
    });

    it('should match snapshot with retry button', () => {
        const { container } = render(
            <ErrorMessage message={mockMessage} onRetry={mockOnRetry} />
        );
        expect(container).toMatchSnapshot();
    });

    it('should match snapshot without retry button', () => {
        const { container } = render(
            <ErrorMessage message={mockMessage} />
        );
        expect(container).toMatchSnapshot();
    });

    it('should render error message', () => {
        const { container } = render(
            <ErrorMessage message={mockMessage} onRetry={mockOnRetry} />
        );
        expect(container.textContent).toContain(mockMessage);
    });

    it('should call onRetry when button is clicked', () => {
        const { container } = render(
            <ErrorMessage message={mockMessage} onRetry={mockOnRetry} />
        );
        const button = container.querySelector('button');
        
        if (button) {
            fireEvent.click(button);
        }

        expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });
}); 