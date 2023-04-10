import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector } from "./app/hooks";
import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Orders } from "./pages/Orders";
import { Carousel } from "./components/Carousel";
import { Composition } from "./pages/Composition";

// Based on https://github.com/remix-run/react-router/tree/dev/examples

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <Nav />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function GalleryLayout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <div className="d-flex justify-content-center m-2">
          <h1 className="lead">
              Alyssa Breid
          </h1>
      </div>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <>
      <Router>
        <div className="container h-100">
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
              <Route index element={<RequireAuth><Home /></RequireAuth> } />
              <Route path="orders" element={<RequireAuth><Orders /></RequireAuth>} />              
              <Route path="gallery" element={<RequireAuth><GalleryLayout /></RequireAuth>}>
                <Route index path="" element={<RequireAuth><Carousel /></RequireAuth>} />
                <Route path='checkout' element={<RequireAuth><>Checkout</></RequireAuth>} />
                <Route path=":id" element={<RequireAuth><Composition /></RequireAuth>} />
                
              </Route>              
              <Route path='*' element={<>Page Not Found</>} />
            </Route>
          </Routes>
        </div>        
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
