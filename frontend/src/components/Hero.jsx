import React from "react";
import { useEffect } from "react";
import {
  Link,
  Box,
  Flex,
  Text,
  Button,
  Stack,
  HStack,
  Spacer,
  Card,
  Heading,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import Carousel from "./Carousel";

const Hero = (props) => {
  return (
    <>
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column-reverse", md: "row" }}
        wrap="no-wrap"
        minH="70vh"
        px={8}
        mb={16}
        {...props}
        my={10}
      >
        <Stack
          spacing={4}
          // w={{ base: "80%", md: "40%" }}
          align={["center", "center", "flex-start", "flex-start"]}
          w={"60%"}
        >
          <Text
            color="#001B40"
            fontWeight="bold"
            fontSize="5xl"
            lineHeight="1.2"
            _dark={{
              color: "blue",
            }}
            fontFamily={"Roboto"}
          >
            Casting Trust In Every{" "}
            <Text as="span" color="#11448A">
              Vote.
            </Text>
          </Text>
          <Text
            color="black"
            mb={4}
            fontSize="2xl"
            lineHeight="1.2"
            _dark={{
              color: "white",
            }}
            fontFamily={"Roboto"}
          >
            Revolutionizing the way we participate in democratic processes by
            leveraging cutting-edge blockchain technology. Our online voting
            system ensures the integrity, transparency, and accessibility of
            elections, empowering citizens to securely cast their votes.
          </Text>
        </Stack>
        {/* <Spacer /> */}
        <Carousel />
      </Flex>

      {/* main section  for hero page */}

      <Box
        bg="#443988"
        _dark={{
          bg: "#3e3e3e",
        }}
        p={10}
        alignItems="center"
        justifyContent="center"
        mt={10}
      >
        <Flex display={"flex"} alignItems={"center"} justify={"center"}>
          <Stack>
            <HStack spacing={"80"}>
              <Card bg={"white"}>
                <Heading textAlign={"center"}>Electors</Heading>
                <Image src="../assest/election.png" />
              </Card>
              <Card bg={"white"}>
                <Heading textAlign={"center"}>Parties & Candidates</Heading>
                <Image src="../assest/parties.png" />
              </Card>
              <Card bg={"white"}>
                <Heading textAlign={"center"}>Elections</Heading>
                <Image src="../assest/elections.png" />
              </Card>
            </HStack>
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

export default Hero;
