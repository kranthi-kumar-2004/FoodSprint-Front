import {BrowserRouter, Routes,Route, Link} from "react-router-dom";
import Home from "./components/Home.jsx"
import Orders from "./components/Orders.jsx";
import Restaurant from "./components/Restaurant.jsx";
function App(){
    return(
      <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>{" | "}
        <Link to="/orders">Orders</Link>{" | "}
        <Link to="/Restaurant">Restaurant Menu</Link>{" | "}
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/Restaurant" element={<Restaurant/>}/>
      </Routes>
      </BrowserRouter>
    );
}
export default App;
