import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home/Home";
import Header from "./components/header/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CardModal from "./components/modal/cardModal";

function App() {
  return (
    <div className="min-h-[100vh] pb-[100px] bg-gray-100">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <CardModal/>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
