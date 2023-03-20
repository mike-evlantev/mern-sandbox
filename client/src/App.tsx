import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path='/' element={<>HOME</>} />
            <Route path='/login' element={<>LOGIN</>} />
            <Route path='/orders' element={<>ORDERS</>} />
          </Routes>
        </div>        
      </Router>
    </>
  );
}

export default App;
