import React from 'react';
import styles from './UsersPage.module.css';
import { useUsers } from '../../hooks/useUsers';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import SearchBar from '../../components/SearchBar/SearchBar';
import UserCard from '../../components/UserCard/UserCard';

const UsersPage: React.FC = () => {
    const {
        filteredUsers,
        loading,
        error,
        setSearchQuery,
        refetch,
    } = useUsers();


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Список пользователей</h1>

            <SearchBar onSearch={setSearchQuery} />

            {loading && <Loading />}

            {error && <ErrorMessage message={error} onRetry={refetch} />}

            {!loading && !error && filteredUsers.length === 0 && (
                <p className={styles.noResult}>Пользователи не найдены.</p>
            )}

            <div className={styles.grid}>
                {!loading &&
                    !error &&
                    filteredUsers.map((user, index) => (
                        <UserCard key={user.id} user={user} index={index} />
                    ))}
            </div>
        </div>
    );
};

export default UsersPage;
