import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { Reset } from "styled-reset";
import { createGlobalStyle } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const client = new QueryClient();

const GlobalStyle = createGlobalStyle`
  body{
    background-color: #141414;
    color: white;
  }
  html,body{
    overflow-x:hidden;
    height: 100%;
  }
  ::-webkit-scrollbar {
    display: none ; 
}
`;

root.render(
  <BrowserRouter>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools initialIsOpen={true} />
        <Reset />
        <GlobalStyle />
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </BrowserRouter>
);
