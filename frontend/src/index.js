import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./apolloClient";

// Extend the theme to include the custom background color
const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "blackAlpha.900",
        color: "white" // You may want to set a suitable text color as well
      }
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={apolloClient}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </ApolloProvider>
);
