import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
    return (
        <div className={styles.container}>
            <p className={styles.text}>Ошибка: {message}</p>
            {onRetry && (
                <button className={styles.button} onClick={onRetry}>
                    Повторить
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
