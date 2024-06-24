import React from "react";
import { Th, IconButton, Flex, Box } from "@chakra-ui/react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

// Define the props for the SortableTh component
interface SortableThProps {
  column: string;
  sortColumn: string | null;
  sortDirection: "asc" | "desc" | null;
  onSort: (column: string) => void;
  children: React.ReactNode;
  fontSize?: string;
}

// Sorting component
const Sorting: React.FC<SortableThProps> = ({
  column,
  sortColumn,
  sortDirection,
  onSort,
  children,
  fontSize,
}) => {
  return (
    // Table header cell with text alignment and optional font size
    <Th className="sortable-column" textAlign="left" fontSize={fontSize}>
      <Flex align="center">
        <Box>{children}</Box>
        <IconButton
          aria-label={`Sort by ${column}`}
          icon={
            sortColumn === column ? (
              sortDirection === "asc" ? (
                <FaSortUp />
              ) : sortDirection === "desc" ? (
                <FaSortDown />
              ) : (
                <FaSort />
              )
            ) : (
              <FaSort />
            )
          }
          size="xs"
          variant="ghost"
          onClick={() => onSort(column)}
          ml={2}
        />
      </Flex>
    </Th>
  );
};

export default Sorting;
