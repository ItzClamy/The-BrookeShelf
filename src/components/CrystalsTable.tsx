import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  HStack,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import UpdateButton from "./UpdateBookButton";
import DeleteButton from "./DeleteBookButton";
import Sorting from "./Sorting";

// Define the Book interface
interface Book {
  ID: number;
  Title: string;
  Author: string;
  Genre: string;
  TBR: boolean;
}

// Define the CrystalsTable component props
interface CrystalsTableProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  fetchBooks: () => Promise<void>;
}

const CrystalsTable: React.FC<CrystalsTableProps> = ({
  books,
  setBooks,
  fetchBooks,
}) => {
  // State for sorting column and direction
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );

  // Fetch books data on component mount
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Set background colors of records based on the color mode
  const baseBg = useColorModeValue("white", "gray.800");
  const alternateBg = useColorModeValue("gray.100", "gray.700");

  // Set max height of the table based on the breakpoint
  const maxHeight = useBreakpointValue({
    base: "300px",
    md: "35vh",
    lg: "65vh",
    xl: "67vh",
  });

  // Set the font size of the title based on the breakpoint
  const titleFontSize = useBreakpointValue({
    base: "15px",
    sm: "lg",
    md: "20px",
    lg: "12px",
    xl: "20px",
  });

  // Handle sorting of the table columns
  const handleSort = (column: string) => {
    let newDirection: "asc" | "desc" | null = "asc";
    if (sortColumn === column) {
      if (sortDirection === "asc") {
        newDirection = "desc";
      } else if (sortDirection === "desc") {
        newDirection = null;
      }
    }

    setSortColumn(newDirection ? column : null);
    setSortDirection(newDirection);

    if (newDirection === null) {
      fetchBooks();
    } else {
      const sortedBooks = [...books].sort((a, b) => {
        if (a[column as keyof Book] < b[column as keyof Book]) {
          return newDirection === "asc" ? -1 : 1;
        }
        if (a[column as keyof Book] > b[column as keyof Book]) {
          return newDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
      setBooks(sortedBooks);
    }
  };

  return (
    <Box
      bg="white"
      border="1px solid black"
      borderRadius="md"
      p={4}
      overflowY="auto"
      maxH={maxHeight}
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Sorting
              column="Title"
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
              fontSize={titleFontSize}
            >
              Title
            </Sorting>
            <Sorting
              column="Author"
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
              fontSize={titleFontSize}
            >
              Author
            </Sorting>
            <Sorting
              column="TBR"
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
              fontSize={titleFontSize}
            >
              TBR
            </Sorting>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {books.map((item, index) => (
            <Tr key={index} bg={index % 2 === 0 ? baseBg : alternateBg}>
              <Td>{item.Title}</Td>
              <Td>{item.Author}</Td>
              <Td>{item.TBR ? "Read" : "Not Read"}</Td>
              <Td>
                <HStack spacing={0}>
                  <UpdateButton
                    book={item}
                    onUpdate={fetchBooks}
                    table="crystals_Books"
                  />
                  <DeleteButton bookId={item.ID} onDelete={fetchBooks} />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CrystalsTable;
