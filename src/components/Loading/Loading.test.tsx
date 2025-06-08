import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Loading from './Loading';
import styles from './Loading.module.css';

describe('Loading Component', () => {
    it('should match snapshot', () => {
        const { container } = render(<Loading />);
        expect(container).toMatchSnapshot();
    });

    it('should render loading text', () => {
        const { container } = render(<Loading />);
        expect(container.textContent).toContain('Загрузка...');
    });

    it('should render spinner', () => {
        const { container } = render(<Loading />);
        expect(container.querySelector(`.${styles.spinner}`)).toBeInTheDocument();
    });
}); 