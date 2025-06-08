import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './UserDetailPage.module.css';
import { useUser } from '../../hooks/useUser';
import { useUserPosts } from '../../hooks/useUserPosts';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import UserDetails from '../../components/UserDetails/UserDetails';
import { motion, AnimatePresence } from 'framer-motion';

const UserDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const userId = Number(id);
    const {
        user,
        loading: userLoading,
        error: userError,
        refetch: refetchUser,
    } = useUser(userId);

    const {
        posts,
        loading: postsLoading,
        error: postsError,
        refetch: refetchPosts,
    } = useUserPosts(userId);

    const handleBack = () => {
        navigate('/');
    };

    const postVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.1,
                duration: 0.3,
                ease: "easeOut"
            }
        })
    };

    return (
        <motion.div 
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.button 
                className={styles.backButton} 
                onClick={handleBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                ← Назад
            </motion.button>

            {userLoading && <Loading />}

            {userError && <ErrorMessage message={userError} onRetry={refetchUser} />}

            {!userLoading && !userError && user && (
                <UserDetails user={user} />
            )}

            <motion.h2 
                className={styles.postsTitle}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                Посты пользователя
            </motion.h2>

            {postsLoading && <Loading />}

            {postsError && <ErrorMessage message={postsError} onRetry={refetchPosts} />}

            {!postsLoading && !postsError && posts.length === 0 && (
                <motion.p 
                    className={styles.noPosts}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    У пользователя пока нет постов.
                </motion.p>
            )}

            <div className={styles.postsList}>
                <AnimatePresence>
                    {!postsLoading &&
                        !postsError &&
                        posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                className={styles.postCard}
                                variants={postVariants}
                                initial="hidden"
                                animate="visible"
                                custom={index}
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <motion.h3 
                                    className={styles.postTitle}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                >
                                    {post.title}
                                </motion.h3>
                                <motion.p 
                                    className={styles.postBody}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                >
                                    {post.body}
                                </motion.p>
                            </motion.div>
                        ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default UserDetailPage;
