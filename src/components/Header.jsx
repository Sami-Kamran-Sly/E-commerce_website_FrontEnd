import React, { memo, useCallback } from 'react';
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from '../context/AuthContextInfo';
import toast from 'react-hot-toast';
import SearchInput from './Form/SearchInput';
import { Badge } from "antd";
import { useCartContext } from '../context/CartContext';
import useCategory from '../hook/useCategory';
const Header = memo(() => {
  const categories = useCategory()

  const {auth,setAuth} = useAuthContext()
  const {cart,setCart} = useCartContext()


  const handleLogOut = useCallback(()=>{

  
    setAuth({
      ...auth,
      user:null,
      token :""

    })
    localStorage.removeItem("auth")
    toast.success("Logout Successfully");
  })
  return (




    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top ">
    <div className="container-fluid">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link to="/" className="navbar-brand">
          🛒 Ecommerce App
        </Link>

        <ul className="navbar-nav ms-auto mr-5 mb-2 mb-lg-0">
        <SearchInput />
  
        <li className="nav-item">
            <NavLink to="/" className="nav-link ">
              Home
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to={"/categories"}
              data-bs-toggle="dropdown"
            >
              Categories
            </Link>

            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={"/categories"}>
                  All Categories
                </Link>
              </li>
               {categories?.map((c) => (
                <li key={c._id}>
                  <Link
                    className="dropdown-item"
                    to={`/category/${c.slug}`}
                  >
                    {c.name}
                  </Link> 
                </li> 
              ))} 
            </ul>
          </li>

       
          {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
 
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    style={{ border: "none" }}
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink

                        to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        onClick={handleLogOut}
                        to="/login"
                        className="dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}

          <li className="nav-item">
            <NavLink to="/cart" className="nav-link">
              <Badge count={cart?.length} showZero>
                Cart
              </Badge>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  );
});

export default Header;
