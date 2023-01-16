import { useState } from "react";
import "./App.css";
import Footer from "./Component/Footer/Footer";
import Header from "./Component/Navbar/Header";
import AllRouters from "./Router/AllRouters";
import PrivateRouter from "./Router/PrivateRouter";
import Landing from "./Screens/Landing/Landing";

function App() {
  const [search, setSearch] = useState("");
  console.log("  search:", search);
  return (
    <div>
      <Header setSearch={setSearch} />
      <AllRouters search={search} />
      <Footer />
    </div>
  );
}

export default App;
