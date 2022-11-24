import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNavbar from '../dashboardPages/SideNavbar';
import Navbar from '../pages/Shared/Navbar';

const DashboardRoot = () => {
    return (
        <>
        <Navbar />
        <main className="container mx-auto flex px-4">
            <SideNavbar />
            <Outlet />
        </main>
        </>
    );
};

export default DashboardRoot;