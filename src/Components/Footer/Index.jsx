import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Footer.css';

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const LargeWithLogoCentered = () => {
  const handlePhoneClick = () => {
    window.location.href = 'tel:+996500002007';
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:news@line.kg';
  };

  const handleAddressClick = () => {
    window.location.href =
      'https://www.google.com/maps/search/?api=1&query=г.+Бишкек, проспект Эркиндик 46';
  };

  return (
    <Box bg="var(--color-bg)" color="var(--color-text)">
      <div className="bg-[var(--color-text-base)] w-[100%] h-4"></div>
      <Container
        as={Stack}
        maxW={'7xl'}
        py={10}
        className="flex justify-center items-center  mr-[13%]"
      >
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={10}>
          <Stack align={'flex-start'}>
            <ListHeader>Свяжитесь с нами</ListHeader>

            <Box as="a" href={'#'}>
              <p className="text-[var(--color-text-base)] font-[500] max-2xl:w-[160%]">
                Телефон:{' '}
                <span
                  onClick={handlePhoneClick}
                  className="text-[var(--color-text)] cursor-pointer hover:underline"
                >
                  +996 (500) 002 007
                </span>
              </p>
            </Box>

            <Box as="a" href={'#'}>
              <p className="text-[var(--color-text-base)] font-[500]">
                Email:{' '}
                <span
                  onClick={handleEmailClick}
                  className="text-[var(--color-text)] cursor-pointer hover:underline"
                >
                  news@line.kg
                </span>
              </p>
            </Box>

            <Box as="a" href={'#'}>
              <p className="text-[var(--color-text-base)] font-[500]">
                Адрес:{' '}
                <span
                  onClick={handleAddressClick}
                  className="text-[var(--color-text)] cursor-pointer hover:underline"
                >
                  г. Бишкек, проспект Эркиндик 46
                </span>
              </p>
            </Box>
          </Stack>

          <Stack align={'flex-start'} className="category">
            <ListHeader>Ссылки</ListHeader>
            <Box as="a">
              <li className="flex text-[var(--color-text-base)]">
                <AiOutlineArrowRight />
                <Link
                  to="/about"
                  className="text-[var(--color-text)] text-[15px] font-[500] ml-[5px]
                                        hover:text-[var(--color-text-base)]"
                >
                  О проекте
                </Link>
              </li>
            </Box>

            <Box as="a">
              <li className="flex text-[var(--color-text-base)]">
                <AiOutlineArrowRight />
                <Link
                  to="/contact"
                  className="text-[var(--color-text)] text-[15px] font-[500] ml-[5px]
                                        hover:text-[var(--color-text-base)]"
                >
                  Контакты
                </Link>
              </li>
            </Box>

            <Box as="a">
              <li className="flex text-[var(--color-text-base)]">
                <AiOutlineArrowRight />
                <Link
                  to="/termsOfUse"
                  className="text-[var(--color-text)] text-[15px] font-[500] ml-[5px]
                                        hover:text-[var(--color-text-base)]"
                >
                  Правила использования
                </Link>
              </li>
            </Box>

            <Box as="a">
              <li className="flex text-[var(--color-text-base)]">
                <AiOutlineArrowRight />
                <Link
                  to="/advertising"
                  className="text-[var(--color-text)] text-[15px] font-[500] ml-[5px]
                                        hover:text-[var(--color-text-base)]"
                >
                  Реклама
                </Link>
              </li>
            </Box>

            <Box as="a">
              <li className="flex text-[var(--color-text-base)]">
                <AiOutlineArrowRight />
                <Link
                  to="/policy"
                  className="text-[var(--color-text)] text-[15px] font-[500] ml-[5px]
                                        hover:text-[var(--color-text-base)]"
                >
                  Политика конфиденциальности
                </Link>
              </li>
            </Box>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>О нас</ListHeader>
            <Box as="a" textColor="var(--color-text-base)">
              Наша цель - держать вас в курсе всех событий и происшествий,
              происходящих в мире.
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('[#7a7777]'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('[#7a7777]'),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <h1 className="text-[20px] text-[var(--color-text-base)]">18+</h1>
        </Flex>
        <Text
          pt={6}
          fontSize={'md'}
          textAlign={'center'}
          textColor={'var(--color-text-base)'}
          className="font-[600]"
        >
          © 2023 Все права защищены. <br />
          Использование материалов разрешено только с письменного разрешения
          компании. <br />
          Любое копирование, воспроизведение или распространение контента без
          разрешения запрещено.
        </Text>
      </Box>
    </Box>
  );
};

export default LargeWithLogoCentered;
