import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserCard from './UserCard';

// моковые данные для теста
const mockUser = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    address: {
        city: 'New York',
        street: '123 Main St',
        suite: 'Apt 4B',
        zipcode: '10001',
        geo: {
            lat: '40.7128',
            lng: '-74.0060'
        }
    },
    phone: '123-456-7890',
    website: 'johndoe.com',
    company: {
        name: 'Test Company',
        catchPhrase: 'Test catch phrase',
        bs: 'Test bs'
    }
};

describe('UserCard Component', () => {
    it('should match snapshot', () => {
        const { container } = render(
            <BrowserRouter>
                <UserCard user={mockUser} index={0} />
            </BrowserRouter>
        );
        expect(container).toMatchSnapshot();
    });

    it('should render user information correctly', () => {
        const { container } = render(
            <BrowserRouter>
                <UserCard user={mockUser} index={0} />
            </BrowserRouter>
        );

        expect(container.textContent).toContain(mockUser.name);
        expect(container.textContent).toContain(mockUser.email);
        expect(container.textContent).toContain(mockUser.address.city);
        expect(container.textContent).toContain('Подробнее');
    });
}); 