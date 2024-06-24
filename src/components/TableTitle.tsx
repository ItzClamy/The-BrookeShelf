// src/components/TableTitle.tsx
import React from "react";
import { Box, Text, Stack } from "@chakra-ui/react";
import type { ResponsiveValue } from "@chakra-ui/styled-system";

interface TableTitleProps {
  title: string;
  totalRead: number;
  totalUnread: number;
  justifyContent?: ResponsiveValue<"flex-start" | "center" | "flex-end">;
  mb?: ResponsiveValue<string | number>;
}

const TableTitle: React.FC<TableTitleProps> = ({
  title,
  totalRead,
  totalUnread,
  justifyContent = "flex-start",
  mb,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      mb={mb}
      alignItems={justifyContent}
    >
      <Text
        fontSize="2xl"
        textShadow="0px 0px 5px rgba(0, 0, 0, 0.3)"
        color="#eaf2d7"
        fontFamily="'Rubik Bubbles', sans-serif"
      >
        {title}
      </Text>
      <Stack
        direction="row"
        textShadow="0px 0px 5px rgba(0, 0, 0, 0.3)"
        spacing={4}
        fontFamily="'Rubik Bubbles', sans-serif"
        justifyContent={justifyContent}
      >
        <Text fontSize="md" color="#eaf2d7">
          Read: {totalRead}
        </Text>
        <Text fontSize="md" color="#eaf2d7">
          Unread: {totalUnread}
        </Text>
      </Stack>
    </Box>
  );
};

export default TableTitle;
