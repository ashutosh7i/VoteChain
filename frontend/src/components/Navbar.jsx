import { Box, Flex, Spacer, Link, Button, Center } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box py={7} px={8} color="black" boxShadow={"3px 0.5px 1px gray"}>
      <Flex alignItems="center" justifyContent="center">
        <Link href="/" fontSize="2xl" fontWeight="bold" fontFamily={"Poppins"}>
          VoteChain
        </Link>
        <Spacer />
        <Flex alignItems="center" justifyContent="center" mr={"10"}>
          <Link
            href="/page1"
            mr={4}
            fontSize={"xl"}
            fontFamily={"Poppins"}
            fontWeight={"semi-bold"}
            px={4}
          >
            Elections
          </Link>
          <Link
            href="/page2"
            mr={4}
            fontSize={"xl"}
            fontFamily={"Poppins"}
            fontWeight={"semi-bold"}
            px={4}
          >
            Explorer
          </Link>
          <Link
            href="/page3"
            fontSize={"xl"}
            fontFamily={"Poppins"}
            fontWeight={"semi-bold"}
            px={4}
          >
            Toll-Free
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
