import {
  IconButton,
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
  Select,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import genreOptions from "./genreOptions";
import React, { useState, useEffect } from "react";

// Define the properties for the UpdateBookButton component
interface UpdateBookButtonProps {
  book: {
    ID: number;
    Title: string;
    Author: string;
    Genre: string;
    TBR: boolean;
  };
  onUpdate: () => void; // Callback function to refresh book data after update
  table: string; // Prop to differentiate between Brooke's and Crystal's table
}

const UpdateButton: React.FC<UpdateBookButtonProps> = ({
  book,
  onUpdate,
  table,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI hook for modal visibility
  const [title, setTitle] = useState(""); // State for book title
  const [author, setAuthor] = useState(""); // State for book author
  const [genre, setGenre] = useState(""); // State for book genre
  const [tbr, setTbr] = useState(false); // State for book TBR status
  const toast = useToast(); // Chakra UI hook for toast notifications

  // Populate state with book details when the component mounts or when the book prop changes
  useEffect(() => {
    if (book) {
      console.log("Received book:", book);
      setTitle(book.Title);
      setAuthor(book.Author);
      setGenre(book.Genre);
      setTbr(book.TBR);
    }
  }, [book]);

  // Function to handle the update of the book details
  const handleUpdate = async () => {
    const updatedBook = {
      Title: title,
      Author: author,
      Genre: genre,
      TBR: tbr,
    };

    // Determine the API endpoint based on the table prop
    const apiEndpoint =
      table === "brookes_Books"
        ? `https://dummyValue.execute-api.us-east-1.amazonaws.com/Production/updateBooks?id=${book.ID}`
        : `https://dummyValue.execute-api.us-east-1.amazonaws.com/Production/UpdateCrystalsBooks?id=${book.ID}`;

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Call the onUpdate callback to refresh the book data and close the modal
      onUpdate();
      onClose();

      // Show a success toast notifacation
      toast({
        title: "Book updated.",
        description: "The book has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating book:", error);

      // Show an error taost notification
      toast({
        title: "Error updating book.",
        description: "There was an error updating the book.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <IconButton
        aria-label="Edit book"
        icon={<FaEdit />}
        variant="ghost"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Enter book title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl id="author" isRequired>
              <FormLabel>Author</FormLabel>
              <Input
                placeholder="Enter book author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </FormControl>
            <FormControl id="genre" isRequired>
              <FormLabel>Genre</FormLabel>
              <Select
                placeholder="Select genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
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
                value={tbr ? "true" : "false"}
                onChange={(e) => setTbr(e.target.value === "true")}
              >
                <option value="true">Read</option>
                <option value="false">Not Read</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleUpdate}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateButton;
