import React from "react";
import { IconButton, Button } from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";

// DeleteButton component props definition
interface DeleteButtonProps {
  bookId: number;
  onDelete: () => void; // Function to refresh the book list after deletion
}

// DeleteButton component
const DeleteButton: React.FC<DeleteButtonProps> = ({ bookId, onDelete }) => {
  // Chakra UI hook for managing modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  // Function to handle the deletion of a book
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://dummyValue.execute-api.us-east-1.amazonaws.com/Production/deleteBook?id=${bookId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response is OK
      if (response.ok) {
        console.log("Book deleted successfully");
        onClose(); // Close the dialog
        onDelete(); // Refresh the book list
      } else {
        console.error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <>
      {/* Button to open the delete confirmation dialog */}
      <IconButton
        aria-label="Delete book"
        icon={<FaRegTrashAlt />}
        variant="ghost"
        onClick={onOpen}
      />
      {/* Delete confirmation dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Book
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this book? This action cannot be
              undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteButton;
