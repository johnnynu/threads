import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { InputGroup, InputRightElement } from "@chakra-ui/react";
import useDebounce from "../utility/debounce.js";

const ConfirmInfo = () => {
  const location = useLocation();
  const client = useApolloClient();
  const navigate = useNavigate();
  const user = location.state?.simplifiedUser;

  const [updateUserProfile, { data, loading, error }] =
    useMutation(UPDATE_USER_PROFILE);

  const formik = useFormik({
    initialValues: {
      displayName: user.displayName,
      username: "",
      email: user.email,
      bio: ""
    },
    validationSchema: Yup.object({
      displayName: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
      bio: Yup.string()
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await updateUserProfile({
          variables: {
            id: user.id,
            ...values,
            avatar: user.avatar
          }
        });
        // Redirect user to the main page after successful update
        if (response.data) {
          const updatedUser = response.data.updateUserProfile;
          navigate("/home", { state: { user: updatedUser } });
        }
      } catch (error) {
        // If the error message includes "Username already exists", set the form's username field error
        if (error.message.includes("Username already exists")) {
          setErrors({
            username:
              "Username already exists. Please choose a different username."
          });
        }
      } finally {
        setSubmitting(false);
      }
    }
  });

  const debouncedUsername = useDebounce(formik.values.username, 500);
  const [usernameExists, setUsernameExists] = useState(false);

  useEffect(() => {
    const checkUsername = async () => {
      if (debouncedUsername) {
        const { data } = await client.query({
          query: CHECK_USERNAME,
          variables: { username: debouncedUsername }
        });
        setUsernameExists(!!data?.user);
      }
    };
    checkUsername();
  }, [debouncedUsername, client]);

  useEffect(() => {
    if (usernameExists) {
      formik.setFieldError("username", "Username is already taken");
    }
  }, [usernameExists, formik]);

  return (
    <Box w="full" maxW="md" mx="auto" mt={5}>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={5}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="displayName"
              value={formik.values.displayName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormControl>

          <FormControl
            isInvalid={formik.touched.username && !!formik.errors.username}
          >
            <FormLabel>Username</FormLabel>
            <InputGroup>
              <Input
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                borderColor={
                  formik.touched.username && formik.errors.username
                    ? "red.500"
                    : "gray.200"
                }
                backgroundColor={
                  formik.touched.username && formik.errors.username
                    ? "red.100"
                    : "white"
                }
                pr="4.5rem"
              />
              <InputRightElement width="4.5rem">
                {formik.touched.username && formik.errors.username ? (
                  <CloseIcon color="red.500" />
                ) : null}
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input name="email" value={formik.values.email} isReadOnly />
          </FormControl>

          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea
              name="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Confirm
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

const CHECK_USERNAME = gql`
  query checkUsername($username: String!) {
    checkUsername(username: $username)
  }
`;

const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $id: ID!
    $username: String!
    $displayName: String!
    $email: String!
    $bio: String
    $avatar: String
  ) {
    updateUserProfile(
      id: $id
      username: $username
      displayName: $displayName
      email: $email
      bio: $bio
      avatar: $avatar
    ) {
      id
      username
      displayName
      email
      bio
      avatar
    }
  }
`;

export default ConfirmInfo;
