import Login from "./pages/Login";
import Home from "./pages/Home";
import CallListPage from "./pages/CallListPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className='flex flex-col h-screen'>
        <Navbar />
        <div className='flex-grow pt-20'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/callList' element={<CallListPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
