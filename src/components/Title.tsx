import { Text } from "@chakra-ui/react";

// Title component definition
const Title = () => {
  return (
    <Text
      fontSize={{ base: "35px", md: "40px", lg: "56px" }}
      textAlign="center"
      fontFamily="'Rubik Bubbles', sans-serif"
      color="#eaf2d7"
      textShadow="0px 0px 5px rgba(0, 0, 0, 0.3)"
    >
      Brooke & Crystal's Bookshelf
    </Text>
  );
};

export default Title;
