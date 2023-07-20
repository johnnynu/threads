import {
  Box,
  Heading,
  Input,
  List,
  ListItem,
  Link,
  Text,
  Skeleton
} from "@chakra-ui/react";

function RightSidebar({ trends, isLoading }) {
  return (
    <Box
      width="350px"
      padding="20px"
      borderLeft="1px solid"
      borderColor="gray.200"
    >
      <Input
        placeholder="Search Ghost"
        marginBottom="20px"
        borderRadius="full"
        bg="gray.100"
        _placeholder={{ color: "gray.500" }}
      />
      <Heading as="h2" size="md" marginBottom="10px">
        Trends for you
      </Heading>
      <List spacing={3}>
        {isLoading ? (
          // Display skeleton text if the trends are loading
          <>
            <Skeleton height="20px" />
            <Skeleton height="20px" marginLeft="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" marginLeft="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" marginLeft="20px" />
          </>
        ) : (
          // Display the trends if they have loaded
          trends.map((trend, index) => (
            <ListItem key={index}>
              <Link fontWeight="bold" color="blue.500">
                {trend}
              </Link>
              <Text color="gray.500">Trending in OpenAI</Text>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
}

export default RightSidebar;
