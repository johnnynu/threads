import {
  Box,
  Text,
  Avatar,
  VStack,
  HStack,
  IconButton,
  Flex,
  Button,
  Input
} from "@chakra-ui/react";
import {
  ChatIcon,
  RepeatIcon,
  StarIcon,
  AttachmentIcon,
  EditIcon,
  CheckIcon,
  DeleteIcon
} from "@chakra-ui/icons";
import { formatDistanceToNow, set } from "date-fns";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

function Haunt({ haunt, currentUserId, createLoading, disableDelete }) {
  const createdAtDate = new Date(Number(haunt.createdAt));
  const timeDifference = formatDistanceToNow(createdAtDate);

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [newContent, setNewContent] = useState(haunt.content);

  const [editHaunt] = useMutation(EDIT_HAUNT, {
    refetchQueries: [{ query: GET_ALL_HAUNTS }]
  });

  const [deleteHaunt] = useMutation(DELETE_HAUNT, {
    refetchQueries: [{ query: GET_ALL_HAUNTS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setIsDeleted(false);
    },
    onError: () => {
      setIsDeleted(false);
    }
  });

  const handleEdit = () => {
    editHaunt({ variables: { id: haunt.id, content: newContent } });
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDeleted(true);
    deleteHaunt({ variables: { id: haunt.id } });
  };

  console.log("In Haunt:", createLoading);

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
          {haunt.user.id === currentUserId && (
            <HStack>
              <IconButton
                aria-label="Edit"
                icon={isEditing ? <CheckIcon /> : <EditIcon />}
                onClick={isEditing ? handleEdit : () => setIsEditing(true)}
              />
              <IconButton
                aria-label="Delete"
                icon={<DeleteIcon />}
                onClick={handleDelete}
                isDisabled={createLoading || isDeleted || disableDelete} // disable the button while deleting
              />
            </HStack>
          )}
        </Flex>
        {isEditing ? (
          <Input
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        ) : (
          <Text>{haunt.content}</Text>
        )}
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

const EDIT_HAUNT = gql`
  mutation EditHaunt($id: String!, $content: String!) {
    editHaunt(id: $id, content: $content) {
      id
      content
    }
  }
`;

const GET_ALL_HAUNTS = gql`
  query getAllHaunts {
    getAllHaunts {
      id
      content
      user {
        id
        username
        displayName
        avatar
      }
      createdAt
    }
  }
`;

const DELETE_HAUNT = gql`
  mutation deleteHaunt($id: String!) {
    deleteHaunt(id: $id)
  }
`;

export default Haunt;