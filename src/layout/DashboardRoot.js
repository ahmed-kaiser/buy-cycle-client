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
            <section className="grow px-4 md:px-6 py-6">
                <Outlet />
            </section>
        </main>
        </>
    );
};

export default DashboardRoot;