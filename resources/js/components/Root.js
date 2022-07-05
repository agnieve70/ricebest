import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './About';
import AdminDashboard from './AdminDashboard';
import ClientDashboard from './client/ClientDashboard';
import ProductDetail from './client/ProductDetail';
import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';
import Success from './Success';
import Fail from './Fail';

// After
import { createRoot } from 'react-dom/client';
import ClientTransaction from './client/ClientTransaction';
import ClientOrders from './client/ClientOrders';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <div>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/aboutUs" element={<About />} />
                <Route path="/success" element={<Success />} />
                <Route path="/fail" element={<Fail />} />
                <Route path="/client-transactions" element={<ClientTransaction />} />
                <Route path="/client-orders" element={<ClientOrders />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/client-dashboard" element={<ClientDashboard />} />
                <Route path="/product-detail/:id" element={<ProductDetail />} />
                <Route
                    path="*"
                    element={
                        <div className="container mt-5">
                            <h1 className="text-center">404 Page Not Found</h1>
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    </div>
);
