import React, { useEffect, useState } from "react";
import Logo from "./Logo.png";
import { Box, Flex, Grid, Image, Button, Checkbox, Stack, Text, Input } from "@chakra-ui/react";
import axios from "axios";
import ProductSimple from "./Card";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Catalogue() {
  const [plants, setPlants] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  const [house, setHouse] = useState(false);
  const [set, setSet] = useState(false);
  const [pot, setPot] = useState(false);
  const [soil, setSoil] = useState(false);

  useEffect(() => {
    axios
      .get(`https://run.mocky.io/v3/85502878-3238-4697-9d85-7f13ddba3ee0`)
      .then((res) => {
        setPlants(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, []);

  const applyFilters = () => {
    let newData = [];
    if (house) {
      newData = newData.concat(
        plants.filter((ele) => ele.category === "houseplant")
      );
    }
    if (set) {
      newData = newData.concat(
        plants.filter((ele) => ele.category === "houseplantsets")
      );
    }
    if (pot) {
      newData = newData.concat(
        plants.filter((ele) => ele.category === "plantpots")
      );
    }
    if (soil) {
      newData = newData.concat(
        plants.filter((ele) => ele.category === "soil and fertilisers")
      );
    }
    if (!house && !set && !pot && !soil) {
      newData = plants;
    }
    setData(newData);
  };

  const search = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = plants.filter((ele) =>
      ele.name.toLowerCase().includes(searchTerm)
    );
    setData(filteredData);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box w={"80%"} m={"auto"} padding={"2%"}>
      <Navbar />

      <Box>
        <Image src={Logo} alt="catalogue logo" marginBottom={"5%"} />
      </Box>

      <Flex>
        <Box ml={4} mr={4}>
          <Box color={"black"} m={"auto"} w={"200px"}>
            <Stack>
              <Input
                placeholder="Search"
                _placeholder={{ opacity: 1, color: "black" }}
                border={"1px"}
                borderColor={"#486d00"}
                onChange={search}
              />
              <Link>
                <Text
                  align={"left"}
                  onClick={() => {
                    setHouse(false);
                    setSet(false);
                    setPot(false);
                    setSoil(false);
                    setData(plants); // Reset data to original
                  }}
                >
                  Reset Filter
                </Text>
              </Link>
              <Checkbox
                borderColor="black"
                colorScheme="black"
                isChecked={house}
                onChange={() => setHouse(!house)}
              >
                Sustainable grass Multch
              </Checkbox>
              <Checkbox
                borderColor="black"
                colorScheme="black"
                isChecked={set}
                onChange={() => setSet(!set)}
              >
                Grass infused compostable paper
              </Checkbox>
              <Checkbox
                borderColor="black"
                colorScheme="black"
                isChecked={pot}
                onChange={() => setPot(!pot)}
              >
                Grass Cliper
              </Checkbox>
              <Checkbox
                borderColor="black"
                colorScheme="black"
                isChecked={soil}
                onChange={() => setSoil(!soil)}
              >
                Soil and Fertilizer
              </Checkbox>
              <Button
                mt={4}
                colorScheme="green"
                onClick={applyFilters}
              >
                Apply Filters
              </Button>
            </Stack>
          </Box>
        </Box>

        <Flex flexDirection="column" w={"100%"}>
          <Grid templateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]} gap={5}>
            {currentItems.map((ele, idx) => (
              <ProductSimple
                key={idx}
                id={idx}
                src={ele.image}
                name={ele.name}
                price={ele.price}
                data={ele}
              />
            ))}
          </Grid>
          <Flex justifyContent="center" my={4} p={"1%"}>
            {pageNumbers.map((number) => (
              <Button
                key={number}
                mx={1}
                colorScheme={currentPage === number ? "green" : "gray"}
                color={currentPage === number ? "white" : "black"}
                onClick={() => paginate(number)}
                bgColor={currentPage === number ? "green.500" : "gray.200"}
              >
                {number}
              </Button>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </Box>
  );
}
