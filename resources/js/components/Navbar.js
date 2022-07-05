import React from "react";
import { LinkContainer } from "react-router-bootstrap";

const role = localStorage.getItem("role");

function Navbar() {
    const auth_token = localStorage.getItem("auth_token");

    function logoutHandler() {
        localStorage.removeItem("auth_token");
        window.location.href = "/";
    }

    return (
        <>
            <nav className="navbar navbar-dark bg-success">
                <div className="container-fluid">
                    <LinkContainer to={auth_token && role === 'admin' ? '/admin-dashboard' :
                    auth_token && role === 'client' ? '/client-dashboard'
                    :'/' }>
                        <a className="navbar-brand">Rice'Best</a>
                    </LinkContainer>
                    <button className="btn btn-light"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasWithBackdrop"
                        aria-controls="offcanvasWithBackdrop">
                        <i className="fa fa-edit"></i>
                    </button>
                </div>
            </nav>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">Rice'Best</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav">
                        {auth_token ? <li className="bg-success text-light p-3 mb-3">
                            <a href="#" onClick={logoutHandler} className="nav-link text-light"><b>Logout</b></a>
                        </li> : <li className="bg-success text-light p-3 mb-3">
                            <LinkContainer to="/">
                                <a className="nav-link text-light"><b>Login</b></a>
                            </LinkContainer>
                        </li>}

                        <li className="bg-success text-light p-3 mb-3">
                            <LinkContainer to="/aboutUs">
                                <a className="nav-link text-light"><b>About Us</b></a>
                            </LinkContainer>
                        </li>

                        {
                            role === 'client' &&
                            <>
                                <li className="bg-success text-light p-3 mb-3">
                                    <LinkContainer to="/client-orders">
                                        <a className="nav-link text-light"><b>Orders</b></a>
                                    </LinkContainer>
                                </li>
                                <li className="bg-success text-light p-3 mb-3">
                                    <LinkContainer to="/client-transactions">
                                        <a className="nav-link text-light"><b>Transactions</b></a>
                                    </LinkContainer>
                                </li>
                            </>
                        }

                    </ul>
                </div>
            </div>
        </>
    );
}

export default Navbar;
