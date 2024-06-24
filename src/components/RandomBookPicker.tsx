import React, { useState } from "react";
import {
  Button,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";

// Define the Book interface
interface Book {
  ID: number;
  Title: string;
  Author: string;
  Genre: string;
  TBR: boolean;
}

// Define the props for the RandomBookPicker component
interface RandomBookPickerProps {
  brookesBooks: Book[];
  crystalsBooks: Book[];
}

const genreOptions = [
  "Romance",
  "Dark Romance",
  "YA",
  "Sci-Fi",
  "Mystery/Thriller",
  "Fiction",
  "Manga/Comics",
  "Nonfiction",
  "Classics",
  "Horror",
  "Self-Help",
];

// RandomBookPicker component
const RandomBookPicker: React.FC<RandomBookPickerProps> = ({
  brookesBooks,
  crystalsBooks,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Manage modal state
  const [selectedTable, setSelectedTable] = useState<string>(""); // Track selected table
  const [selectedGenre, setSelectedGenre] = useState<string>(""); // Track selected genre
  const [randomBook, setRandomBook] = useState<Book | null>(null); // Track the randomly selected book
  const [cycling, setCycling] = useState(false); // Track the state of book cycling

  // Handle changes in the table selection
  const handleTableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTable(e.target.value);
  };

  // Handle changes in the genre selection
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  // Pick a random book from the selected table and genre
  const pickRandomBook = () => {
    let filteredBooks: Book[] = [];

    // Filter books based on the selected table and genre
    if (selectedTable === "brookes") {
      filteredBooks = brookesBooks.filter(
        (book) =>
          !book.TBR && (selectedGenre === "" || book.Genre === selectedGenre)
      );
    } else if (selectedTable === "crystals") {
      filteredBooks = crystalsBooks.filter(
        (book) =>
          !book.TBR && (selectedGenre === "" || book.Genre === selectedGenre)
      );
    } else if (selectedTable === "both") {
      const brookesFiltered = brookesBooks.filter(
        (book) =>
          !book.TBR && (selectedGenre === "" || book.Genre === selectedGenre)
      );
      const crystalsFiltered = crystalsBooks.filter(
        (book) =>
          !book.TBR && (selectedGenre === "" || book.Genre === selectedGenre)
      );

      // Filter books that exist in both lists by title
      filteredBooks = brookesFiltered.filter((brookesBook) =>
        crystalsFiltered.some(
          (crystalsBook) => brookesBook.Title === crystalsBook.Title
        )
      );
    }

    if (filteredBooks.length === 0) {
      setRandomBook(null);
      return;
    }

    setCycling(true);

    // Function to cycle through books before selecting one
    const cycleBooks = (books: Book[], duration: number) => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        setRandomBook(books[currentIndex]);
        currentIndex = (currentIndex + 1) % books.length;
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setRandomBook(books[Math.floor(Math.random() * books.length)]);
        setCycling(false);
      }, duration);
    };

    cycleBooks(filteredBooks, 3000);
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
        Pick a Random Book
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Random Book Picker</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="table-choice" mb={4}>
              <FormLabel>Select Table</FormLabel>
              <Select
                placeholder="Select table"
                value={selectedTable}
                onChange={handleTableChange}
                isDisabled={cycling}
              >
                <option value="brookes">Brooke</option>
                <option value="crystals">Crystal</option>
                <option value="both">Both</option>
              </Select>
            </FormControl>
            <FormControl id="genre-choice" mb={4}>
              <FormLabel>Select Genre</FormLabel>
              <Select
                placeholder="Select genre"
                value={selectedGenre}
                onChange={handleGenreChange}
                isDisabled={cycling}
              >
                <option value="">Any Genre</option>
                {genreOptions.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button
              colorScheme="blue"
              width="full"
              onClick={pickRandomBook}
              isDisabled={cycling}
            >
              Start Picking
            </Button>
            <Flex
              justifyContent="center"
              alignItems="center"
              minHeight="100px"
              mt={4}
            >
              {randomBook ? (
                <Box
                  p={4}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  boxShadow="md"
                  bg="white"
                  textAlign="center"
                >
                  <Text fontSize="lg" fontWeight="bold">
                    {randomBook.Title}
                  </Text>
                  <Text>{randomBook.Author}</Text>
                  <Text>{randomBook.Genre}</Text>
                </Box>
              ) : (
                <Text>No books available to pick from.</Text>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RandomBookPicker;
