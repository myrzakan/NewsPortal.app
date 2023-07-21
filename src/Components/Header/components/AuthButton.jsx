import { Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function WithoutNavbar() {
  return (
    <Box>
      <Link to="../../../Auth/SignIn">
        <Button fontSize={'sm'} fontWeight={400} variant={'link'}>
          Sign In
        </Button>
      </Link>
      <Link to="../../../Auth/SignUp">
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'pink.400'}
          _hover={{ bg: 'pink.300' }}
        >
          Sign Up
        </Button>
      </Link>
    </Box>
  );
}
