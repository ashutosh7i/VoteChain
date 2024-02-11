import React from "react";
import {
  Box,
  Stack,
  HStack,
  VStack,
  Link,
  Divider,
  Image,
  Text,
  Button,
  IconButton,
  LinkProps,
  Flex,
  Heading,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons

const Footer = () => {
  return (
    <Box
      p={{ base: 3, md: 5 }}
      maxW="100vw"
      marginInline="auto"
      mt={40}
      bg={
        "linear-gradient(270deg, #011228 -21.91%, rgba(1, 18, 40, 0.83) 100.84%, rgba(1, 18, 40, 0.77) 101.34%, rgba(1, 18, 40, 0.77) 102.73%, rgba(1, 18, 40, 0.00) 105.07%, rgba(1, 18, 40, 0.79) 105.07%)"
      }
    >
      <Box maxW="100vw">
        <Flex
          align={"center"}
          justify={"space-between"}
          w={"80vw"}
          m={"auto"}
          direction={{ base: "column", md: "row" }}
        >
          <Stack
            spacing={{ base: 8, md: 0 }}
            justifyContent="space-between"
            direction={{ base: "column", md: "row" }}
          >
            <HStack spacing={"30"}>
              <VStack w={"50%"} textAlign={"left"}>
                <Text
                  fontSize={"4xl"}
                  fontWeight={"semibold"}
                  fontFamily={"Helvetica"}
                  color={"white"}
                  textAlign={"left"}
                >
                  VoteCHAIN
                </Text>

                <Text fontFamily={"Helvetica"} color={"white"} fontSize={"md"}>
                  VoteChain : The online voting systems represent a significant
                  advancement in the democratization of elections. By harnessing
                  the power of blockchain technology, these systems offer
                  unprecedented security, transparency, and accessibility,
                  revolutionizing the way we participate in democratic
                  processes.
                </Text>
              </VStack>
              <VStack mx={"10"}>
                <Heading
                  fontFamily={"Helvetica"}
                  color={"white"}
                  fontSize={"xl"}
                  fontWeight={"bold"}
                >
                  About
                </Heading>

                <Text color={"white"} fontFamily={"Helvetica"}>
                  About Booths
                </Text>
                <Text color={"white"} fontFamily={"Helvetica"}>
                  Honable Commission
                </Text>
                <Text color={"white"} fontFamily={"Helvetica"}>
                  FAQ
                </Text>
              </VStack>

              <VStack ml={"10"}>
                <Heading
                  fontFamily={"Helvetica"}
                  color={"white"}
                  fontSize={"xl"}
                  fontWeight={"bold"}
                >
                  Contact
                </Heading>

                <Text color={"white"} fontFamily={"Helvetica"}>
                  TollFree-000-123
                </Text>
                <Text color={"white"} fontFamily={"Helvetica"}>
                  Email
                </Text>
                <Text color={"white"} fontFamily={"Helvetica"}>
                  Send SMS
                </Text>
              </VStack>
            </HStack>
          </Stack>
        </Flex>
      </Box>
      <Text
        textAlign={"center"}
        color={"white"}
        fontSize={"md"}
        fontFamily={"Helvetica"}
        mt={"5"}
      >
        Copyright © 2024, VoteChain. All rights reserved.
      </Text>
    </Box>
  );
};

const CustomLink = ({ children, ...props }) => {
  return (
    <Link
      href="#"
      fontSize="sm"
      _hover={{ textDecoration: "underline" }}
      {...props}
    >
      {children}
    </Link>
  );
};

export default Footer;
