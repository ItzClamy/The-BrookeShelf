import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Box,
  Select,
} from "@chakra-ui/react";
import { FaBook, FaUser, FaTag } from "react-icons/fa";
import genreOptions from "./genreOptions";

// Define the props for the SearchInput component
interface SearchInputProps {
  searchValues: {
    title: string;
    author: string;
    genre: string;
  };
  handleSearchChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void; // Function to handle changes in the search inputs
}

// SearchInput component
const SearchInput: React.FC<SearchInputProps> = ({
  searchValues,
  handleSearchChange,
}) => {
  return (
    <Flex justifyContent="center" width="full">
      <InputGroup
        width={{
          base: "80%",
          sm: "60%",
          md: "60%",
          lg: "60%",
          xl: "45%",
          "2xl": "30%",
        }}
        display="flex"
        alignItems="center"
      >
        {/* Title input with icon */}
        <InputGroup flex="1">
          <InputLeftElement pointerEvents="none">
            <FaBook />
          </InputLeftElement>
          <Input
            name="title"
            value={searchValues.title}
            onChange={handleSearchChange}
            borderRadius="15px 0 0 15px"
            placeholder="Title"
            variant="outline"
            bg="white"
            color="gray.500"
          />
        </InputGroup>
        {/* Divider */}
        <Box mx={1} width="1px" bg="gray.200" height="40px" />
        {/* Author input with icon */}
        <InputGroup flex="1">
          <InputLeftElement pointerEvents="none">
            <FaUser />
          </InputLeftElement>
          <Input
            name="author"
            value={searchValues.author}
            onChange={handleSearchChange}
            placeholder="Author"
            variant="outline"
            bg="white"
            color="gray.500"
          />
        </InputGroup>
        {/* Divider */}
        <Box mx={1} width="1px" bg="gray.200" height="40px" />
        {/* Genre dropdown with icon */}
        <InputGroup flex="1">
          <InputLeftElement pointerEvents="none">
            <FaTag />
          </InputLeftElement>
          <Select
            name="genre"
            value={searchValues.genre}
            onChange={handleSearchChange}
            borderRadius="0 15px 15px 0"
            placeholder="Genre"
            variant="outline"
            bg="white"
            color="gray.500"
            sx={{
              paddingLeft: "35px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {genreOptions.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </Select>
        </InputGroup>
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
