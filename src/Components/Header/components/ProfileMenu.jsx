import React from 'react';
import { Avatar, VStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, IconButton, HStack, Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import { FiBell, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function ProfileSection() {

  const navigate = useNavigate()

  const onSignOut = React.useCallback(() => {
    localStorage.removeItem('pocketbase_auth')
    navigate('/')
  }, [])

  // const pbAuth = JSON.parse(localStorage.getItem('pocketbase_auth'));

  return (
    <HStack spacing={{ base: '0', md: '6' }}>
      {/* <IconButton
        size="lg"
        variant="ghost"
        aria-label="open menu"
        icon={<FiBell />}
      /> */}
      <Flex alignItems={'center'}>
        <Menu className='bg-slate-600'>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: 'none' }}
            className='relative top-1 left-[109rem]' 
          >
            <HStack>
              {/* <Avatar
                size={'sm'}
                src={
                  'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                }
              /> */}
              <VStack
                display={{ base: 'none', md: 'flex' }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="sm">d</Text>
                <Text fontSize="xs" color="gray.600">
                  d
                </Text>
              </VStack>
              <Box display={{ base: 'none', md: 'flex' }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            bg={useColorModeValue('#333')}
            borderColor={useColorModeValue('#333')}
          >
            {/* <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Billing</MenuItem> */}
            <MenuDivider />
            <MenuItem 
              className='bg-[#333]'
              onClick={onSignOut}
            >Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
}
