import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import SearchList from "./components/SearchList";
import DetailView from "./components/DetailView";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <SearchBar />
        <Routes>
          <Route exact path="/" element={<h1> </h1>} />
          <Route exact path="/items" element={<SearchList />} />
          <Route exact path="/items/:id" element={<DetailView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
