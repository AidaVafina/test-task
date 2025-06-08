import React, {type ChangeEvent, useState} from 'react';
import styles from './SearchBar.module.css';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce(value, 300);

    React.useEffect(() => {
        onSearch(debouncedValue);
    }, [debouncedValue, onSearch]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                className={styles.input}
                placeholder="Поиск по имени пользователя..."
            />
        </div>
    );
};

export default SearchBar;
