import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Home from "./pages/home/home";
import SignUp from "./pages/sign/sign-up";
import ElectricityPlan from "./pages/categories/ElectricityPlan";
import Car from "./pages/categories/Car";
import { Provider } from "react-redux";
import store from "./redux/store";

/**
 * All pages need to be added here
 */
let sto = { ...store }
function App() {
  return (
    // <div>
    // <AuctionForm/>
    // </div>
    <Provider store={sto}>
      <MainView></MainView>
    </Provider>
  );
}
function MainView() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignUp />} />
        <Route path="/auctions/car" element={<Car />} />
        <Route path="/auctions/list" element={<ElectricityPlan />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;