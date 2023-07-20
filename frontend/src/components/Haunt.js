import {
  Box,
  Text,
  Avatar,
  VStack,
  HStack,
  IconButton,
  Flex
} from "@chakra-ui/react";
import {
  ChatIcon,
  RepeatIcon,
  StarIcon,
  AttachmentIcon
} from "@chakra-ui/icons";
import { formatDistanceToNow } from "date-fns";

function Haunt({ haunt }) {
  const createdAtDate = new Date(Number(haunt.createdAt));
  const timeDifference = formatDistanceToNow(createdAtDate);

  return (
    <Flex
      direction="row"
      p={4}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      marginBottom="20px"
      bg="white"
    >
      <Avatar src={haunt.user.avatar} />
      <VStack align="start" spacing={1} ml={4} w="full">
        <Flex direction="row" justify="space-between" w="full">
          <HStack>
            <Text fontWeight="bold">{haunt.user.displayName}</Text>
            <Text color="gray.500">@{haunt.user.username}</Text>
            <Text color="gray.500">·</Text>
            <Text color="gray.500">{timeDifference} ago</Text>
          </HStack>
        </Flex>
        <Text>{haunt.content}</Text>
        <HStack spacing={4}>
          <IconButton
            aria-label="Reply"
            icon={<ChatIcon />}
            variant="outline"
            size="sm"
          />
          <IconButton
            aria-label="Retweet"
            icon={<RepeatIcon />}
            variant="outline"
            size="sm"
          />
          <IconButton
            aria-label="Like"
            icon={<StarIcon />}
            variant="outline"
            size="sm"
          />
          <IconButton
            aria-label="Share"
            icon={<AttachmentIcon />}
            variant="outline"
            size="sm"
          />
        </HStack>
      </VStack>
    </Flex>
  );
}

export default Haunt;
