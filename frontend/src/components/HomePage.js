import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  Heading,
  Textarea,
  IconButton,
  Button,
  HStack,
  Spacer,
  Image,
  ButtonGroup,
  Flex,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";
import {
  FaFeather,
  FaRegImage,
  FaRegSmile,
  FaPollH,
  FaGift,
  FaHome,
  FaBell,
  FaEnvelope,
  FaRegListAlt,
  FaRegBookmark,
  FaUser,
  FaSearch
} from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { BiBadgeCheck } from "react-icons/bi";
import { RiGhost2Line } from "react-icons/ri";
import ForYou from "./ForYou";
import Following from "./Following";
import ghostBrand from "../assets/ghostlogo1.jpeg";

import { signOut } from "firebase/auth"; // import firebase auth signout
import { auth } from "../firebase"; // import your auth instance
import { FaEllipsisH } from "react-icons/fa"; // 3 dots icon

import RightSidebar from "./RightSidebar"; // adjust the path according to your file structure

import { useSubscription, useQuery, useMutation, gql } from "@apollo/client";

const HomePage = () => {
  const [tab, setTab] = useState("for-you");
  const [hauntText, setHauntText] = useState(""); // State for tweet input
  const [haunts, setHaunts] = useState([]); // State for storing haunts

  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData
  } = useQuery(GET_ALL_HAUNTS);

  console.log("user", user);

  const [createHaunt] = useMutation(CREATE_HAUNT);

  const { data: subscriptionData } = useSubscription(HAUNT_CREATED);

  // Update haunts state when queryData is available
  useEffect(() => {
    if (queryData) {
      setHaunts(queryData.getAllHaunts);
    }
  }, [queryData]);

  useEffect(() => {
    if (subscriptionData) {
      const newHaunts = [subscriptionData.hauntCreated, ...haunts];
      setHaunts(newHaunts);
    }
  }, [subscriptionData]);

  useEffect(() => {
    console.log("haunts after update:", haunts);
  }, [haunts]);

  // Handle the initial loading state
  if (queryLoading) return <p>Loading...</p>;
  if (queryError) {
    console.log("queryError", queryError);
    return <p>Error</p>;
  }

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  const handleSubmit = () => {
    createHaunt({ variables: { content: hauntText, userId: user.id } });
    // Clear the input field
    setHauntText("");
  };

  const handleOptionSelect = (option) => {
    // Here you would typically open a modal or perform another action relevant to the selected option
    console.log(option);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/"); // navigate back to landing page after signing out
  };

  const MainFeedTab = ({ children, tabName }) => (
    <Box
      borderBottom={tab === tabName ? "2px solid" : "none"}
      borderBottomColor="black.500"
      py={2}
      cursor="pointer"
      onClick={() => handleTabChange(tabName)}
      color={tab === tabName ? "black.500" : "gray.500"}
      fontWeight={tab === tabName ? "bold" : "normal"}
      flex="1"
      display="flex"
      justifyContent="center"
    >
      {children}
    </Box>
  );

  const LeftSidebarTab = ({ children, tabName, icon }) => (
    <Button
      size="lg"
      alignItems="center"
      variant="ghost"
      onClick={() => handleTabChange(tabName)}
      borderRadius="full"
      _hover={{ bg: "gray.100" }}
      my={1}
    >
      <Flex alignItems="center" justifyContent="flex-start">
        <Box width="20px">{icon}</Box>
        <Box ml={2}>{children}</Box>{" "}
        {/* This Box contains the label and has left margin */}
      </Flex>
    </Button>
  );

  return (
    <Box display="flex" p={5} alignItems="flex-start">
      {/* Left Sidebar */}
      <VStack align="center" flex="0.6" ml={150}>
        {" "}
        {/* Logo */}
        <Image
          src={ghostBrand}
          alt="Logo"
          boxSize="50px"
          mb={1} // Added some margin at the bottom to separate it from the tabs
          ml={2.5}
        />
        <ButtonGroup flexDirection="column" width="full">
          <LeftSidebarTab tabName="home" icon={<FaHome />}>
            Home
          </LeftSidebarTab>
          <LeftSidebarTab tabName="explore" icon={<FaSearch />}>
            Explore
          </LeftSidebarTab>
          <LeftSidebarTab tabName="notifications" icon={<FaBell />}>
            Notifications
          </LeftSidebarTab>
          <LeftSidebarTab tabName="messages" icon={<FaEnvelope />}>
            Messages
          </LeftSidebarTab>
          <LeftSidebarTab tabName="lists" icon={<FaRegListAlt />}>
            Lists
          </LeftSidebarTab>
          <LeftSidebarTab tabName="bookmarks" icon={<FaRegBookmark />}>
            Bookmarks
          </LeftSidebarTab>
          <LeftSidebarTab tabName="communities" icon={<BsPeopleFill />}>
            Communities
          </LeftSidebarTab>
          <LeftSidebarTab tabName="verified" icon={<BiBadgeCheck />}>
            Verified
          </LeftSidebarTab>
          <LeftSidebarTab tabName="profile" icon={<FaUser />}>
            Profile
          </LeftSidebarTab>
          {/* ... rest of the tabs */}
        </ButtonGroup>
        <Button
          leftIcon={<RiGhost2Line />}
          colorScheme="purple"
          alignItems={"center"}
          isFullWidth
          mt={1}
          ml={5}
        >
          Haunt
        </Button>
        <Flex direction="row" alignItems="center" mt={100} width="full">
          <Avatar name={user.displayName} src={user.avatar} size="sm" />
          <Flex
            direction="row"
            alignItems="center"
            width="full"
            justifyContent="space-between"
          >
            <VStack align="start" ml={3} width="100px">
              {" "}
              {/* <-- add a fixed width here */}
              <Text fontWeight="bold">{user.displayName}</Text>
              <Text mt={-3} color="gray.500">
                @{user.username}
              </Text>
            </VStack>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<FaEllipsisH />}
                size="xs"
                variant="outline"
              />
              <MenuList>
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </VStack>

      {/* Main Feed */}
      <VStack
        align="start"
        spacing={5}
        flex="1.4"
        borderLeft="1px"
        borderRight="1px"
        borderColor="gray.200"
        pl={5}
        pr={5}
      >
        <Heading size="md">Home</Heading>

        {/* Tab Buttons */}
        <Box display="flex" justifyContent="space-between" width="full">
          <MainFeedTab tabName="for-you">For You</MainFeedTab>
          <MainFeedTab tabName="following">Following</MainFeedTab>
        </Box>

        {/* Tweet input field */}
        <Box width="full">
          <Textarea
            placeholder="What's happening?"
            value={hauntText}
            onChange={(e) => setHauntText(e.target.value)}
            size="sm"
            resize="none"
            maxLength={280}
          />

          {/* Tweet options */}
          <HStack spacing={1} mt={2}>
            <IconButton
              icon={<FaRegImage />}
              onClick={() => handleOptionSelect("image")}
            />
            <IconButton
              icon={<FaRegSmile />}
              onClick={() => handleOptionSelect("emoji")}
            />
            <IconButton
              icon={<FaPollH />}
              onClick={() => handleOptionSelect("poll")}
            />
            <IconButton
              icon={<FaGift />}
              onClick={() => handleOptionSelect("gift")}
            />
            <Spacer />
            {/* Tweet Button */}
            <Button
              leftIcon={<RiGhost2Line />}
              onClick={handleSubmit}
              isDisabled={hauntText.length === 0}
              colorScheme="purple"
            >
              Haunt
            </Button>
          </HStack>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <small>{280 - hauntText.length} characters left</small>
          </Box>
        </Box>
        {/* Conditional rendering of tab contents */}
        {tab === "for-you" && (
          <ForYou haunts={haunts} currentUserId={user.id} />
        )}
        {tab === "following" && <Following />}
      </VStack>

      {/* Right Sidebar */}
      {/* ... Add right sidebar with flex="1" */}
      <VStack align="start" spacing={5} flex="1">
        <RightSidebar
          trends={["Trend 1", "Trend 2", "Trend 3"]}
          isLoading={true}
        />
      </VStack>
    </Box>
  );
};

const CREATE_HAUNT = gql`
  mutation CreateHaunt($content: String!, $userId: String!) {
    createHaunt(content: $content, userId: $userId) {
      id
      content
      user {
        id
        username
        displayName
        avatar
      }
    }
  }
`;

const HAUNT_CREATED = gql`
  subscription {
    hauntCreated {
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

export default HomePage;
