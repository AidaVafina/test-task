import React from 'react';
import styles from './UserDetails.module.css';
import type {User} from "../../types";

interface UserDetailsProps {
    user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.name}>{user.name}</h2>
            <p className={styles.item}>
                <strong>Email: </strong>
                <a href={`mailto:${user.email}`} className={styles.link}>
                    {user.email}
                </a>
            </p>
            <p className={styles.item}>
                <strong>Телефон: </strong>
                <a href={`tel:${user.phone}`} className={styles.link}>
                    {user.phone}
                </a>
            </p>
            <p className={styles.item}>
                <strong>Адрес: </strong>
                {`${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
            </p>
            <p className={styles.item}>
                <strong>Компания: </strong>
                {user.company.name}
            </p>
        </div>
    );
};

export default UserDetails;
