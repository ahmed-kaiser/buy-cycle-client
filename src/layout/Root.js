import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';

const Root = () => {
    return (
        <>
        <Navbar />
        <Outlet />
        <Footer />
        </>
    );
};

export default Root;