import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import {
  Avatar,
  Box,
  Text,
  ChakraProvider,
  Circle,
  Heading,
  Image,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";
ChartJS.register(CategoryScale, LinearScale);
ChartJS.register(PointElement);
ChartJS.register(LineElement);
ChartJS.register(BarElement);
// ... existing code
console.log("hello froma shu");
const Explorer = () => {
  const [candidate1, setCandidate1] = useState({});
  const [candidate2, setCandidate2] = useState({});
  const [candidate3, setCandidate3] = useState({});

  useEffect(() => {
    //call a api at localhost:3000/getallvotes
    //print its data
    axios.get("http://192.168.50.243:3000/getallvotes").then((res) => {
      setCandidate1(res.data.candidate1);
      setCandidate2(res.data.candidate2);
      setCandidate3(res.data.candidate3);
    });
  }, []);

  const [winner, setWinner] = useState(" ");
  useEffect(() => {
    if (candidate1 > candidate2 && candidate1 > candidate3) {
      setWinner("Candidate1");
    } else if (candidate2 > candidate1 && candidate2 > candidate3) {
      setWinner("Candidate2");
    } else {
      setWinner("Candidate3");
    }
  }, []);

  const data = {
    labels: ["Votes"],
    datasets: [
      {
        label: "Candidate1",
        data: [candidate1],
        backgroundColor: "pink",
        borderColor: "black",
        pointRadius: 5,
        pointHitRadius: 10,
        // ...other options
      },
      {
        label: "Candidate2",
        data: [candidate2],
        backgroundColor: "#6AD7E5",
        borderColor: "black",
        pointRadius: 5,
        pointHitRadius: 10,
        // ...other options
      },
      {
        label: "Candidate3",
        data: [candidate3],
        backgroundColor: "Red",
        borderColor: "black",
        pointRadius: 5,
        pointHitRadius: 10,
        // ...other options
      },
    ],
  };

  const options = {
    // ... other options
    tooltips: {
      enabled: true, // Ensure tooltips are enabled
      mode: "index", // Show tooltip for each data point on hover
      intersect: false, // Allow hover even without directly hitting the point
      callbacks: {
        label: (tooltipItem, data) => {
          const datasetLabel =
            data.datasets[tooltipItem.datasetIndex].label || "";
          const value =
            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          // Customize the tooltip content here (e.g., format values, add units)
          return `${datasetLabel}: ${value}`;
        },
      },
    },
  };

  return (
    <>
      <ChakraProvider>
        <Heading as="h1" size="2xl" textAlign="center" mt={"60"}>
          VoteChain Explorer
        </Heading>
        <Box style={{ width: 900, height: 600 }} m={"auto"} mt={"9"}>
          <Bar data={data} options={options} />
        </Box>

        <Box my={"-10"}>
          <Flex align={"center"} justify={"center"} px={"20"}>
            <HStack gap={"200"}>
              <HStack>
                <VStack>
                  <Image
                    width={"100px"}
                    name="cat"
                    src="../assest/Group10.png"
                  />
                  <Box
                    mt={"5"}
                    width={200}
                    height={2}
                    backgroundColor="pink"
                    borderRadius={4} // Add rounded corners if desired
                  />
                  <Box
                    width={200}
                    height={10}
                    backgroundColor="white"
                    borderRadius={4}
                  >
                    {candidate1 > candidate2 && candidate1 > candidate3 ? (
                      <Text
                        fontWeight={"bold"}
                        fontSize={"4xl"}
                        textAlign={"center"}
                      >
                        Winner
                      </Text>
                    ) : null}
                  </Box>
                </VStack>
                <Text
                  fontSize={"2xl"}
                  fontWeight={"600"}
                >{`${candidate1}`}</Text>
              </HStack>

              <HStack>
                <VStack>
                  <Image width={"70px"} name="cat" src="../assest/Go.png" />
                  <Box
                    width={200}
                    height={2}
                    backgroundColor="#6AD7E5"
                    borderRadius={4}
                  />
                  <Box
                    width={200}
                    height={10}
                    backgroundColor="white"
                    borderRadius={4}
                  >
                    {candidate2 > candidate1 && candidate2 > candidate3 ? (
                      <Text
                        fontWeight={"bold"}
                        fontSize={"4xl"}
                        textAlign={"center"}
                      >
                        Winner
                      </Text>
                    ) : null}
                  </Box>
                </VStack>
                <Text
                  fontSize={"2xl"}
                  fontWeight={"600"}
                >{`${candidate2}`}</Text>
              </HStack>

              <HStack>
                <VStack>
                  <Image
                    width={"70px"}
                    name="cat"
                    src="../assest/Logogram.png"
                  />
                  <Box
                    width={200}
                    height={2}
                    backgroundColor="Red"
                    borderRadius={4}
                  />
                  <Box
                    width={200}
                    height={10}
                    backgroundColor="white"
                    borderRadius={4}
                  >
                    {candidate3 > candidate1 && candidate3 > candidate2 ? (
                      <Text
                        fontWeight={"bold"}
                        fontSize={"4xl"}
                        textAlign={"center"}
                      >
                        Winner
                      </Text>
                    ) : null}
                  </Box>
                </VStack>
                <Text
                  fontSize={"2xl"}
                  fontWeight={"600"}
                >{`${candidate3}`}</Text>
              </HStack>
            </HStack>
          </Flex>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default Explorer;
