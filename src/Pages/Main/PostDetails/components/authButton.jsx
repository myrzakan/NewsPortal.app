import { Box, Text, Link } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './authButtonCommitsStyles.module.scss';

export const AuthButtonPostDetals = () => {
  return (
    <Box className={styles.authButton_content}>
      <Text className={styles.text}>
        <Link
          as={RouterLink}
          to="../../../Auth/SignIn"
          color="var(--color-text-base)"
        >
          Войдите
        </Link>{' '}
        или{' '}
      </Text>
      <Text className={styles.text}>
        <Link
          as={RouterLink}
          to="../../../Auth/SignUp"
          color="var(--color-text-base)"
        >
          Зарегистрируйтесь
        </Link>{' '}
        чтобы оставить отзыв на этот пост
      </Text>
    </Box>
  );
};
