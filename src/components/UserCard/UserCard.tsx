import React from 'react';
import styles from './UserCard.module.css';
import { Link } from 'react-router-dom';
import type { User } from "../../types";
import { motion } from 'framer-motion';

interface UserCardProps {
    user: User;
    index: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, index }) => {
    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.3,
                delay: index * 0.1, 
                ease: "easeOut"
            }}
            whileHover={{
                scale: 1.05,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: { duration: 0.2 }
            }}
        >
            <motion.h3 
                className={styles.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
            >
                {user.name}
            </motion.h3>
            <motion.p 
                className={styles.email}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
            >
                {user.email}
            </motion.p>
            <motion.p 
                className={styles.city}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
            >
                {user.address.city}
            </motion.p>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link to={`/user/${user.id}`} className={styles.link}>
                    Подробнее
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default UserCard;
