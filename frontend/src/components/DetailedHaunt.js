import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../utility/UserProvider";
import {
  Box,
  Text,
  Avatar,
  VStack,
  HStack,
  IconButton,
  Flex,
  Divider
} from "@chakra-ui/react";
import {
  ChatIcon,
  RepeatIcon,
  StarIcon,
  ArrowBackIcon
} from "@chakra-ui/icons";
import { useQuery, useMutation, useSubscription, gql } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";

const DetailedHaunt = () => {
  const { id: hauntId } = useParams();
  const { user } = useUser();
  const currentUserId = user?.id;
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, data, refetch } = useQuery(GET_DETAILED_HAUNT, {
    variables: { hauntId }
  });

  console.log(data);
  const haunt = data ? data.haunt : null;

  const [likes, setLikes] = useState(haunt ? haunt.likes : []); // Initialize with the likes data for this specific haunt
  const [userHasLiked, setUserHasLiked] = useState(false); // Initialize based on whether the current user has liked this haunt

  // In your mutation response, make sure to return the updated haunt
  const [createLike] = useMutation(CREATE_LIKE, {
    onCompleted: () => {
      refetch();
    }
  });

  const [deleteLike] = useMutation(DELETE_LIKE, {
    onCompleted: () => {
      refetch();
    }
  });

  useEffect(() => {
    if (haunt && haunt.likes) {
      const userLike = haunt.likes.find(
        (like) => like.userId === currentUserId
      );
      setUserHasLiked(!!userLike);
    }
  }, [haunt, currentUserId]);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Flex direction="column" p={6} alignItems="center" color="white">
      <Box mb={4}>
        <IconButton
          icon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          variant="ghost"
          color="white"
          aria-label="Go back"
        />
      </Box>
      <Box
        w="600px"
        p={4}
        bg="black"
        borderRadius="md"
        boxShadow="sm"
        border="1px solid"
        borderColor="white"
      >
        <HStack spacing={4}>
          <Avatar src={haunt.user.avatar} size="lg" />
          <VStack align="start" spacing={1} w="full">
            <HStack>
              <Text fontWeight="bold" fontSize="lg">
                {haunt.user.displayName}
              </Text>
              <Text color="gray.400">@{haunt.user.username}</Text>
            </HStack>
            <Text fontSize="md">{haunt.content}</Text>
            <HStack mt={2} spacing={4}>
              <IconButton
                icon={<ChatIcon />}
                variant="outline"
                color="white"
                aria-label="Reply"
              />
              <IconButton
                icon={<RepeatIcon />}
                variant="outline"
                color="white"
                aria-label="Repost"
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
            </HStack>
          </VStack>
        </HStack>
        <Divider mt={4} mb={4} borderColor="gray.700" />
        <Box mt={4}>
          {haunt.replies.map((reply) => (
            <Box key={reply.id} mt={4}>
              <HStack spacing={4}>
                <Avatar src={reply.user.avatar} size="md" />
                <VStack align="start" spacing={1} w="full">
                  <HStack>
                    <Text fontWeight="bold" fontSize="md">
                      {reply.user.displayName}
                    </Text>
                    <Text color="gray.400">@{reply.user.username}</Text>
                  </HStack>
                  <Text fontSize="md">{reply.content}</Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        </Box>
      </Box>
    </Flex>
  );
};

const GET_DETAILED_HAUNT = gql`
  query GetDetailedHaunt($hauntId: String!) {
    haunt(id: $hauntId) {
      id
      content
      user {
        id
        username
        displayName
        avatar
      }
      createdAt
      likes {
        id
        userId
        hauntId
      }
      reposts {
        id
        userId
        hauntId
      }
      replies {
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

export default DetailedHaunt;
