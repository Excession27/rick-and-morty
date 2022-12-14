import React from "react";
import ReactQueryProvider from "components/providers/ReactQueryProvider";
import Home from "containers/Home";

function App() {
  return (
    <ReactQueryProvider>
      <Home />
    </ReactQueryProvider>
  );
}

export default App;
