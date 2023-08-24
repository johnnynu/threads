import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Haunt from "./Haunt";

const ForYou = ({
  haunts,
  currentUserId,
  createLoading,
  disableDelete,
  refetchHaunts
}) => {
  return (
    <Box p={5} width="100%">
      {haunts &&
        haunts.map((haunt) => (
          <Haunt
            key={haunt.id}
            haunt={haunt}
            hauntLikes={haunt.likes}
            hauntReposts={haunt.reposts}
            currentUserId={currentUserId}
            createLoading={createLoading}
            disableDelete={disableDelete}
            refetchHaunts={refetchHaunts}
          />
        ))}
    </Box>
  );
};

export default ForYou;
