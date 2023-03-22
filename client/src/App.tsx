import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    </>
  );
}

export default App;
