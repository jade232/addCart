import React from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import BookData from "./Data.json";

function App() {
  return (
    <div className="App">
      <SearchBar placeholder="Enter a name to be searched..." data={BookData} />
      {/* <Api /> */}
    </div>
  );
}

export default App;