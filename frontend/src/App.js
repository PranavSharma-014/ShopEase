import "./App.css";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/esm/Badge";
import { useContext } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";
import { NavDropdown } from "react-bootstrap";
import ShippingScreen from "./screens/ShippingScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentmethodScreen from "./screens/PaymentmethodScreen";
import PlaceorderScreen from "./screens/PlaceorderScreen";
import PreNavbar from "./components/PreNavbar";
import OrderhistoryScreen from "./screens/OrderhistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
function App() {
  const { state , dispatch : ctxDispatch} = useContext(Store);
  const { cart, userInfo } = state;
  const signoutHandler =() => {
    ctxDispatch({type: 'USER_SIGNOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingScreen');
    localStorage.removeItem('paymentMethod');
    window.location.reload();
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="top-center" limit={1}></ToastContainer>
        <header>
          <PreNavbar/>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>ShopEase</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto  w-100  justify-content-end">
                <Link to="/cart" className="nav-link">
                  <i class="fa-solid fa-cart-shopping"></i>
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>user Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="/signin"
                      onClick={signoutHandler}
                    >SignOut</Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign in
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/payment" element={<PaymentmethodScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/placeorder" element={<PlaceorderScreen />} />
              <Route path="/orderhistory" element={<OrderhistoryScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
            </Routes>
          </Container>
        </main>
        {/* <footer>
          <div className="text-center">All Rights Reseved</div>
        </footer> */}
        <footer
          style={{
            backgroundColor: "#222",
            color: "#fff",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "14px" }}>
            &copy; 2023 ShopEase. All rights reserved.
            <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
              | Privacy Policy
            </a>{" "}
            <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
              | Terms of Service
            </a>
          </div>
          <div style={{ fontSize: "12px", marginTop: "10px" }}>
            Unlock Limitless Possibilities with ShopEase: Your Ultimate
            Destination for Custom PC Build Hardware, Tools, and Computer Parts!
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
