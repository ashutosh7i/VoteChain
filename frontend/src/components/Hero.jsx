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
  VStack,
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
        minH="100vh"
        px={8}
        mb={16}
        {...props}
        mt={6}
      >
        <Stack
          spacing={4}
          // w={{ base: "80%", md: "40%" }}
          align={["center", "center", "flex-start", "flex-start"]}
          width={["100%", "100%", "50%", "50%"]}
        >
          <Text
            color="#001B40"
            fontWeight="bold"
            fontSize="70px"
            // lineHeight="1.2"
            _dark={{
              color: "blue",
            }}
            fontFamily={"Helvetica"}
          >
            Casting Trust In Every{" "}
            <Text as="span" color="#11448A">
              Vote.
            </Text>
          </Text>
          <Text
            color="black"
            fontSize="22px"
            _dark={{
              color: "white",
            }}
            fontFamily={"Helvetica"}
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
        justifyContent={"space-between"}
        mt={10}
      >
        <Flex
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          m={"auto"}
        >
          <Stack>
            <HStack alignItems={"center"} justifyContent={"space-evenly"}>
              <Link href="/">
                <Card bg={"white"} h={"400px"} w={"300px"} mr={"40"}>
                  <Heading textAlign={"center"} fontFamily={"Helvetica"}>
                    Electors
                  </Heading>
                  <Image w={"200px"} m={"auto"} src="../assest/election.png" />
                </Card>
              </Link>
              <Link href="/">
                <Card bg={"white"} mr={"40"} h={"400px"} w={"300px"}>
                  <Heading textAlign={"center"} fontFamily={"Helvetica"}>
                    Parties & Candidates
                  </Heading>
                  <Image w={"200px"} m={"auto"} src="../assest/parties.png" />
                </Card>
              </Link>
              <Link href="/">
                <Card bg={"white"} mr={"40"} h={"400px"} w={"300px"}>
                  <Heading textAlign={"center"} fontFamily={"Helvetica"}>
                    Elections
                  </Heading>
                  <Image w={"200px"} m={"auto"} src="../assest/elections.png" />
                </Card>
              </Link>
            </HStack>
          </Stack>
        </Flex>
      </Box>

      <Box>
        <Heading
          textAlign={"center"}
          mt={"20"}
          mb={"10"}
          textTransform={"uppercase"}
          fontFamily={"Helvetica"}
        >
          A platform for secure voting and results.
        </Heading>
      </Box>

      <Box>
        <Flex>
          <HStack justifyContent={"space-between"}>
            <VStack
              width={"40%"}
              align={"center"}
              justify={"center"}
              //   border={"1px solid black"}
              ml={"10"}
              p={"10"}
              my={"10"}
            >
              <Text
                fontSize={"2xl"}
                fontWeight={"600"}
                textTransform={"uppercase"}
                fontFamily={"Helvetica"}
              >
                Secure , Transparaent and efficient voting solution.
              </Text>
              <Text
                textAlign={"left"}
                fontSize={"2xl"}
                width={"100%"}
                fontFamily={"Helvetica"}
              >
                Utilizing blockchain and RFID, ensures secure, transparent
                voting with real-time results, privacy protection, scalability,
                and auditability, fostering trust and participation in the
                electoral process.
              </Text>
            </VStack>

            <Box
              width={"40%"}
              height={"400px"}
              bg={"white"}
              mr={"10"}
              border={"5px solid black"}
              borderRadius={"6px"}
            >
              <Text
                p={"25"}
                fontSize={"larger"}
                color={"black"}
                textTransform={"uppercase"}
                fontWeight={"600"}
                fontFamily={"Helvetica"}
              >
                Get Previous Elections Results in an instant and check real-time
                elections count in graphs and numbers.
              </Text>
            </Box>
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default Hero;
