import React from "react";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import "./default.scss";
import { Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

function App() {
  return (
    <div className="App">
        {/* <Homepage /> */}
        <Routes>
          <Route exact path="/" element={<HomepageLayout>
            <Homepage/>
          </HomepageLayout>} />
          <Route exact path="/registration" element={<MainLayout>
            <Registration/>
          </MainLayout>}/>
        </Routes>
    </div>
  );
}

export default App;
