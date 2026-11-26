import LandingPage from "./components/LandingPage"
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import Home from "./components/Home"
import RestaurantItems from "./components/RestaurantItems"
function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home></Home>}/>
        <Route path="/restarunet" element={<RestaurantItems/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
