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
import { useState, useEffect } from "react";
import { useMutation, useSubscription, gql } from "@apollo/client";

function Haunt({
  haunt,
  hauntLikes,
  currentUserId,
  createLoading,
  disableDelete
}) {
  const createdAtDate = new Date(Number(haunt.createdAt));
  const timeDifference = formatDistanceToNow(createdAtDate);

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [newContent, setNewContent] = useState(haunt.content);
  const [userHasLiked, setUserHasLiked] = useState(false);

  const [likes, setLikes] = useState(hauntLikes || []);

  useEffect(() => {
    console.log("likes:", likes);
  }, [likes]);

  useEffect(() => {
    const existingLike = likes.find((like) => like.userId === currentUserId);
    setUserHasLiked(!!existingLike);
  }, [likes, currentUserId]);

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

  const [createLike] = useMutation(CREATE_LIKE);
  const [deleteLike] = useMutation(DELETE_LIKE);

  useSubscription(LIKE_CREATED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const { hauntId, likeId } = subscriptionData.data.likeCreated;
      if (hauntId === haunt.id) {
        setLikes((prevLikes) => [
          ...prevLikes,
          { id: likeId, userId: currentUserId }
        ]);
      }
    }
  });

  useSubscription(LIKE_DELETED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const { hauntId, likeId } = subscriptionData.data.likeDeleted;
      if (hauntId === haunt.id) {
        setLikes((prevLikes) => prevLikes.filter((like) => like.id !== likeId));
      }
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

  const handleLike = async () => {
    if (!currentUserId) {
      // User is not logged in
      alert("You must be logged in to like a haunt!");
      return;
    }

    const existingLike = likes.find((like) => like.userId === currentUserId);

    if (existingLike) {
      // User has already liked this haunt, so we'll unlike it
      await deleteLike({ variables: { id: existingLike.id } });
    } else {
      // User has not liked this haunt yet, so we'll like it
      await createLike({ variables: { hauntId: haunt.id } });
    }
  };

  return (
    <Flex
      direction="row"
      p={4}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      marginBottom="20px"
      bg="black"
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
                background="black"
                color="white"
              />
              <IconButton
                aria-label="Delete"
                icon={<DeleteIcon />}
                onClick={handleDelete}
                isDisabled={createLoading || isDeleted || disableDelete} // disable the button while deleting
                background="black"
                color="white"
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
            color="white"
          />
          <IconButton
            aria-label="Retweet"
            icon={<RepeatIcon />}
            variant="outline"
            size="sm"
            color="white"
          />
          <HStack spacing={1}>
            <IconButton
              aria-label="Like"
              icon={<StarIcon />}
              variant={userHasLiked ? "solid" : "outline"}
              colorScheme={userHasLiked ? "purple" : "white"}
              size="sm"
              onClick={handleLike}
            />
            <Text>{likes ? likes.length : 0}</Text>
          </HStack>

          <IconButton
            aria-label="Share"
            icon={<AttachmentIcon />}
            variant="outline"
            size="sm"
            color="white"
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

const LIKE_CREATED = gql`
  subscription {
    likeCreated {
      hauntId
      likeId
      likeCount
    }
  }
`;

const LIKE_DELETED = gql`
  subscription {
    likeDeleted {
      hauntId
      likeId
      likeCount
    }
  }
`;

const CREATE_LIKE = gql`
  mutation CreateLike($hauntId: String!) {
    createLike(hauntId: $hauntId) {
      id
    }
  }
`;

const DELETE_LIKE = gql`
  mutation DeleteLike($id: String!) {
    deleteLike(id: $id)
  }
`;

export default Haunt;
