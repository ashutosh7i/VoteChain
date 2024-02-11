import React from "react";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const Page2 = () => {
  return (
    <ChakraProvider>
      <Flex alignItems="center" justifyContent="center" gap="20" my="7">
        <Box width="500px" height="300px">
          <Line
            data={{
              labels: ["A", "B", "C", "D", "E", "F", "G"],
              datasets: [
                {
                  label: "Party1",
                  data: [200, 234, 757, 234, 234, 234, 234],
                },
              ],
            }}
          />
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default Page2;
