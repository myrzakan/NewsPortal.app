import { Box, Text, Link } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

export const AuthButtonPostDetals = () => {
  return (
    <Box
      className="flex flex-col items-center border-dashed border border-[#7a7777] rounded-lg w-[800px]
      h-[200px] mb-[100px] text-[#7a7777] font-bold p-5 pt-[60px] relative left-[34rem]"
    >
      <Text fontSize="lg">
        <Link as={RouterLink} to="../../../Auth/SignIn" color="var(--color-text-base)">
          Войдите
        </Link>{' '}
        или{' '}
      </Text>
      <Text fontSize="lg">
        <Link as={RouterLink} to="../../../Auth/SignUp" color="var(--color-text-base)">
          Зарегистрируйтесь
        </Link>{' '}
        чтобы оставить отзыв на этот пост
      </Text>
    </Box>
  )
}
