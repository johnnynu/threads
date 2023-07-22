import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Haunt from "./Haunt";

const ForYou = ({ haunts, currentUserId, createLoading, disableDelete }) => {
  return (
    <Box bg="gray.100" p={5} width="100%">
      {haunts &&
        haunts.map((haunt) => (
          <Haunt
            key={haunt.id}
            haunt={haunt}
            currentUserId={currentUserId}
            createLoading={createLoading}
            disableDelete={disableDelete}
          />
        ))}
    </Box>
  );
};

export default ForYou;
