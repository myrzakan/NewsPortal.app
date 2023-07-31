import { Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';



export const AuthButton = () => {
  return (
    <Box className='flex items-center justify-end mr-16'>
      <Link to="../../../Auth/SignIn">
        <Button fontSize={'sm'} fontWeight={400} variant={'link'} className='mr-3'>
          Sign In
        </Button>
      </Link>
      <Link to="../../../Auth/SignUp">
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          color={'var(--color-text)'}
          bg={' var(--color-text-base)'}
          _hover={{ opacity: 0.7 }}
        >
          Sign Up
        </Button>
      </Link>
    </Box>
  );
}
