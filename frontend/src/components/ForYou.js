import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Haunt from "./Haunt";

const ForYou = ({ haunts, currentUserId, createLoading, disableDelete }) => {
  console.log("In ForYou.js", haunts.likes);
  return (
    <Box bg="black" p={5} width="100%">
      {haunts &&
        haunts.map((haunt) => (
          <Haunt
            key={haunt.id}
            haunt={haunt}
            hauntLikes={haunt.likes}
            currentUserId={currentUserId}
            createLoading={createLoading}
            disableDelete={disableDelete}
          />
        ))}
    </Box>
  );
};

export default ForYou;
