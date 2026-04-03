import React from "react";
import Routes from "./Routes";
import { Web3Provider } from "./contexts/Web3Context";

function App() {
  return (
    <Web3Provider>
      <Routes />
    </Web3Provider>
  );
}

export default App;
