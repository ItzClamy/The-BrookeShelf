import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
  IconButton,
  Box,
  Flex,
} from "@chakra-ui/react";
import { AddIcon, ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import genreOptions from "./genreOptions";

// Define the Book interface
interface Book {
  title: string;
  author: string;
  genre: string;
  tbr: string;
  table: string;
}

// Define the AddButtonProps interface
interface AddButtonProps {
  onBooksAdded: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onBooksAdded }) => {
  // Manage modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Manage books state with initial empty book object
  const [books, setBooks] = useState<Book[]>([
    { title: "", author: "", genre: "", tbr: "", table: "" },
  ]);
  // Track the current index of the book form being edited
  const [currentIndex, setCurrentIndex] = useState(0);

  // handle input changes for book form fields
  const handleInputChange = (
    index: number,
    field: keyof Book,
    value: string
  ) => {
    const newBooks = [...books];
    newBooks[index][field] = value;
    setBooks(newBooks);
  };

  // Handle adding books to the database
  const handleAddBook = async () => {
    const bookData = books.map((book) => ({
      Title: book.title,
      Author: book.author,
      Genre: book.genre,
      TBR: book.tbr === "true",
      table: book.table,
    }));

    try {
      const response = await fetch(
        "https://dummyValue.execute-api.us-east-1.amazonaws.com/Production/AddBookFunction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ books: bookData }),
        }
      );

      if (response.ok) {
        console.log("Books added successfully");
        onClose();

        // Reset books state and current index
        setBooks([{ title: "", author: "", genre: "", tbr: "", table: "" }]);
        setCurrentIndex(0);
        onBooksAdded(); // Refresh the book list
      } else {
        console.error("Failed to add books");
      }
    } catch (error) {
      console.error("Error adding books:", error);
    }
  };

  // Add a new book form to the state
  const addNewBookForm = () => {
    setBooks([
      ...books,
      { title: "", author: "", genre: "", tbr: "", table: "" },
    ]);
    setCurrentIndex(books.length);
  };

  // Navigate to the previous book form
  const goToPreviousBook = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Navigate to the next book form
  const goToNextBook = () => {
    if (currentIndex < books.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        color="#eaf2d7"
        bg="#520160"
        borderColor="gray.300"
        _hover={{ bg: "gray.50" }}
      >
        Add Book
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Enter book title"
                value={books[currentIndex].title}
                onChange={(e) =>
                  handleInputChange(currentIndex, "title", e.target.value)
                }
              />
            </FormControl>
            <FormControl id="author" isRequired>
              <FormLabel>Author</FormLabel>
              <Input
                placeholder="Enter book author"
                value={books[currentIndex].author}
                onChange={(e) =>
                  handleInputChange(currentIndex, "author", e.target.value)
                }
              />
            </FormControl>
            <FormControl id="genre" isRequired>
              <FormLabel>Genre</FormLabel>
              <Select
                placeholder="Select genre"
                value={books[currentIndex].genre}
                onChange={(e) =>
                  handleInputChange(currentIndex, "genre", e.target.value)
                }
              >
                {genreOptions.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="tbr">
              <FormLabel>To Be Read</FormLabel>
              <Select
                placeholder="Select status"
                value={books[currentIndex].tbr}
                onChange={(e) =>
                  handleInputChange(currentIndex, "tbr", e.target.value)
                }
              >
                <option value="true">Read</option>
                <option value="false">Not Read</option>
              </Select>
            </FormControl>
            <FormControl id="table" isRequired>
              <FormLabel>Table</FormLabel>
              <Select
                placeholder="Select table"
                value={books[currentIndex].table}
                onChange={(e) =>
                  handleInputChange(currentIndex, "table", e.target.value)
                }
              >
                <option value="brookes">Brooke's</option>
                <option value="crystals">Crystal's</option>
                <option value="both">Both</option>
              </Select>
            </FormControl>
            <Flex justify="space-between" mt={4}>
              <IconButton
                icon={<ArrowBackIcon />}
                aria-label="Previous Book"
                onClick={goToPreviousBook}
                isDisabled={currentIndex === 0}
              />
              <IconButton
                icon={<ArrowForwardIcon />}
                aria-label="Next Book"
                onClick={goToNextBook}
                isDisabled={currentIndex === books.length - 1}
              />
            </Flex>
            <Box mt={4}>
              <Button
                leftIcon={<AddIcon />}
                onClick={addNewBookForm}
                variant="outline"
                bg="white"
                borderColor="gray.300"
                color="#C8A2C8"
                _hover={{ bg: "gray.50" }}
              >
                Add Another Book
              </Button>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              mr={3}
              variant="outline"
              bg="white"
              borderColor="gray.300"
              color="#C8A2C8"
              _hover={{ bg: "gray.50" }}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              bg="white"
              borderColor="gray.300"
              color="#C8A2C8"
              _hover={{ bg: "gray.50" }}
              onClick={handleAddBook}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddButton;
