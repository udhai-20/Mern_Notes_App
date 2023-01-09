import "./App.css";
import Footer from "./Component/Footer/Footer";
import Header from "./Component/Navbar/Header";
import AllRouters from "./Router/AllRouters";
import Landing from "./Screens/Landing/Landing";

function App() {
  return (
    <div>
      <Header />
      <AllRouters />
      <Footer />
    </div>
  );
}

export default App;
