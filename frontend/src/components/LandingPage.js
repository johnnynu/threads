import React from "react";
import {
  Box,
  Button,
  Center,
  chakra,
  Flex,
  Icon,
  VStack,
  Image,
  Text
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import ghostBrand from "../assets/ghostlogo1.jpeg";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { gql, useApolloClient } from "@apollo/client";
import { useUser } from "../utility/UserProvider";

const LandingPage = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const provider = new GoogleAuthProvider();

  const { setUser } = useUser();

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = result.user.accessToken;
      const user = result.user;

      const simplifiedUser = {
        id: user.uid,
        displayName: user.displayName,
        email: user.email,
        avatar: user.photoURL
      };

      const { data: userData } = await client.query({
        query: GET_USER_BY_EMAIL,
        variables: { email: simplifiedUser.email }
      });

      if (userData?.getUserByEmail?.id) {
        console.log("User already exists in database");
        simplifiedUser.username = userData.getUserByEmail.username;
        setUser(simplifiedUser);
        navigate("/home", { state: { token, user: simplifiedUser } });
      } else {
        console.log("User does not exist in database");
        navigate("/confirminfo", { state: { token, simplifiedUser } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack
      align="center"
      justify="center"
      spacing={8}
      px={8}
      py={24}
      w="full"
      h="100vh"
    >
      <Image src={ghostBrand} boxSize="100px" alt="Logo" mb={4} />
      <chakra.h1
        mb={4}
        fontSize={{ base: "3xl", md: "4xl" }}
        fontWeight="bold"
        lineHeight={{ base: "shorter", md: "none" }}
        color="gray.900"
        _dark={{ color: "gray.200" }}
        letterSpacing={{ base: "normal", md: "tight" }}
      >
        Happening Now.
      </chakra.h1>
      <chakra.p
        mb={{ base: 10, md: 4 }}
        fontSize={{ base: "lg", md: "xl" }}
        fontWeight="thin"
        color="gray.500"
        letterSpacing="wider"
      >
        <Text>Join Ghost today</Text>
      </chakra.p>
      <Box
        as="form"
        mb={6}
        rounded="lg"
        shadow="xl"
        w={{ base: "full", md: "sm" }}
      >
        <Center pb={0} color="gray.700" _dark={{ color: "gray.600" }}>
          <chakra.p pt={2}>Start talking now</chakra.p>
        </Center>
        <Flex px={6} py={4}>
          <Button
            py={2}
            w="full"
            colorScheme="whiteAlpha"
            color="black"
            shadow="md"
            onClick={handleSignInWithGoogle}
            leftIcon={
              <Icon
                mr={1}
                aria-hidden="true"
                boxSize={6}
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="transparent"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                as={FcGoogle}
              />
            }
          >
            Continue with Google
          </Button>
        </Flex>
      </Box>
      <chakra.p fontSize="xs" textAlign="center" color="gray.600">
        By signing up you agree to our{" "}
        <chakra.a color="brand.500">Terms of Service</chakra.a>
      </chakra.p>
    </VStack>
  );
};

const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      username
      displayName
      email
      avatar
    }
  }
`;

export default LandingPage;
