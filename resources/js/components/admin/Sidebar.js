import React from "react";

function Sidebar() {
    const aLink = {
        backgroundColor: "#9dffd2",
        fontSize: 20,
        textDecoration: "none",
        color: "#198754",
        padding: 10,
        marginBottom: 10,
    };

    return (
        <div>
            <ul className="mt-5 py-4 nav flex-column bg-success" role="tablist">
                <h4 className="text-center text-light">NAVIGATION</h4>
                <li className="nav-item">
                    <a
                        data-bs-toggle="tab"
                        style={aLink}
                        className="nav-link mx-3"
                        aria-current="page"
                        href="#dashboard"
                    >
                        DASHBOARD
                    </a>
                </li>

                <li className="nav-item">
                    <a
                        data-bs-toggle="tab"
                        style={aLink}
                        className="nav-link mx-3"
                        href="#products"
                    >
                        PRODUCTS
                    </a>
                </li>

                <li className="nav-item">
                    <a
                        data-bs-toggle="tab"
                        style={aLink}
                        className="nav-link mx-3"
                        href="#farmers"
                    >
                        FARMERS
                    </a>
                </li>

                <li className="nav-item">
                    <a
                        data-bs-toggle="tab"
                        style={aLink}
                        className="nav-link mx-3"
                        href="#transactions"
                    >
                        TRANSACTIONS
                    </a>
                </li>

                {/* <li className="nav-item">
                    <a
                        data-bs-toggle="tab"
                        style={aLink}
                        className="nav-link mx-3"
                        href="#payment"
                    >
                        PAYMENT INTEGRATION TEST
                    </a>
                </li> */}
            </ul>
        </div>
    );
}

export default Sidebar;
