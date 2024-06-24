// src/App.tsx
import Title from "./components/Title";
import { useAuth0 } from "@auth0/auth0-react";
import SearchInput from "./components/SearchBar";
import TableTitle from "./components/TableTitle";
import AddButton from "./components/AddBookButton";
import BrookesTable from "./components/BrookesTable";
import CrystalsTable from "./components/CrystalsTable";
import { useState, useCallback, useEffect } from "react";
import RandomBookPicker from "./components/RandomBookPicker";
import { Grid, GridItem, Box, Flex } from "@chakra-ui/react";

// Define the Book interface
interface Book {
  ID: number;
  Title: string;
  Author: string;
  Genre: string;
  TBR: boolean;
}

function App() {
  // Destructure authentication methods and states from useAuth0 hook
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  // State for storing book data
  const [brookesBooks, setBrookesBooks] = useState<Book[]>([]);
  const [crystalsBooks, setCrystalsBooks] = useState<Book[]>([]);
  const [searchValues, setSearchValues] = useState({
    title: "",
    author: "",
    genre: "",
  });

  // Fetch books for Brooke's table
  const fetchBrookesBooks = useCallback(async () => {
    try {
      const response = await fetch(
        "https://dummyValue.execute-api.us-east-1.amazonaws.com/Production/dummyValue"
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();
      setBrookesBooks(data);
    } catch (error) {
      console.error("Error fetching Brookes books:", error);
    }
  }, []);

  // Fetch books for Crystal's table
  const fetchCrystalsBooks = useCallback(async () => {
    try {
      const response = await fetch(
        "https://dummyValue.execute-api.us-east-1.amazonaws.com/Production/dummyValue"
      );
      const data = await response.json();
      setCrystalsBooks(data);
    } catch (error) {
      console.error("Error fetching Crystals books:", error);
    }
  }, []);

  // Fetch books data on component mount
  useEffect(() => {
    fetchBrookesBooks();
    fetchCrystalsBooks();
  }, [fetchBrookesBooks, fetchCrystalsBooks]);

  // Handle changes in the search input fields
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Filter books based on search criteria
  const filterBooks = (books: Book[]) => {
    return books.filter(
      (book) =>
        (searchValues.title === "" ||
          book.Title.toLowerCase().includes(
            searchValues.title.toLowerCase()
          )) &&
        (searchValues.author === "" ||
          book.Author.toLowerCase().includes(
            searchValues.author.toLowerCase()
          )) &&
        (searchValues.genre === "" ||
          book.Genre.toLowerCase() === searchValues.genre.toLowerCase())
    );
  };

  // Calculate read and unread counts for Brooke's books
  const brookesReadCount = brookesBooks.filter((book) => book.TBR).length;
  const brookesUnreadCount = brookesBooks.length - brookesReadCount;

  // Calculate read and unread counts for Crystal's books
  const crystalsReadCount = crystalsBooks.filter((book) => book.TBR).length;
  const crystalsUnreadCount = crystalsBooks.length - crystalsReadCount;

  // Ensure the user is authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  // Show loading message while authentication is in progress
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render the app only if authenticated
  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <Box position="relative">
      <Grid
        templateAreas={{
          base: `"title" "search" "buttons" "brookesTableTitle" "brookesTable" "crystalsTableTitle" "crystalsTable"`,
          lg: `"title title" "search search" "buttons buttons" "brookesTableTitle crystalsTableTitle" "brookesTable crystalsTable"`,
        }}
        gridTemplateRows="auto auto auto auto 1fr"
        gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        gap={4}
        p={4}
      >
        <GridItem area="title">
          <Title />
        </GridItem>
        <GridItem area="search">
          <SearchInput
            searchValues={searchValues}
            handleSearchChange={handleSearchChange}
          />
        </GridItem>
        <GridItem area="buttons" display="flex" justifyContent="center">
          <Flex gap={2}>
            <AddButton
              onBooksAdded={() => {
                fetchBrookesBooks();
                fetchCrystalsBooks();
              }}
            />
            <RandomBookPicker
              brookesBooks={brookesBooks}
              crystalsBooks={crystalsBooks}
            />
          </Flex>
        </GridItem>
        <GridItem area="brookesTableTitle">
          <TableTitle
            title="Brooke's Shelf"
            mb={-4}
            justifyContent="flex-start"
            totalRead={brookesReadCount}
            totalUnread={brookesUnreadCount}
          />
        </GridItem>
        <GridItem area="brookesTable" position="relative">
          <BrookesTable
            books={filterBooks(brookesBooks)}
            setBooks={setBrookesBooks}
            fetchBooks={fetchBrookesBooks}
          />
        </GridItem>
        <GridItem area="crystalsTableTitle">
          <TableTitle
            title="Crystal's Shelf"
            mb={-4}
            justifyContent="flex-end"
            totalRead={crystalsReadCount}
            totalUnread={crystalsUnreadCount}
          />
        </GridItem>
        <GridItem area="crystalsTable" position="relative">
          <CrystalsTable
            books={filterBooks(crystalsBooks)}
            setBooks={setCrystalsBooks}
            fetchBooks={fetchCrystalsBooks}
          />
        </GridItem>
      </Grid>
    </Box>
  );
}

export default App;
