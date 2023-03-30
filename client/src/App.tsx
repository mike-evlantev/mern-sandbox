import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Login } from "./pages/Login";
import { Orders } from "./pages/Orders";

function App() {
  return (
    <>
      <Router>
        <div className="container h-100">
          <Routes>
            <Route path='/' element={<>HOME</>} />
            <Route path='/login' element={<Login />} />
            <Route path='/orders' element={<Orders />} />
          </Routes>
        </div>        
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
