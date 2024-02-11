import { Box, Flex, Spacer, Link, Image } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box
      py={3}
      px={8}
      color="black"
      boxShadow={"3px 0.5px 1px gray"}
      // border={"1px solid #e2e8f0"}
      position={"fixed"}
      width={"100%"}
      zIndex={1}
      backdropFilter={"blur(10px)"}
      top={0}
    >
      <Flex alignItems="center" justifyContent="center" p={4}>
        <Link href="/">
          <Image src="../assest/vote-chain logo.png" width={"70px"} />
        </Link>
        <Spacer />
        <Flex alignItems="center" justifyContent="center" mr={"10"}>
          <Link
            href="/Elections"
            mr={4}
            fontSize={"30px"}
            fontFamily={"Helvetica"}
            fontWeight={"bold"}
            px={7}
            textDecoration={"none"}
          >
            Elections
          </Link>
          <Link
            href="/Explorer"
            mr={4}
            fontSize={"30px"}
            fontFamily={"Helvetica"}
            fontWeight={"bold"}
            px={7}
            textDecoration={"none"}
          >
            Explorer
          </Link>
          <Link
            href="/Toll-Free"
            fontSize={"30px"}
            fontFamily={"Helvetica"}
            fontWeight={"bold"}
            px={7}
            textDecoration={"none"}
          >
            Toll-Free
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
