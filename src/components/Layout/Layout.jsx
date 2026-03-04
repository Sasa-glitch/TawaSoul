import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";

export default function Layout() {
    return (
        <>
            <div className="dark:bg-background-dark bg-background-light min-h-screen">
                <Navbar />
                <div className="mx-auto max-w-7xl px-3 py-3.5">
                    <main className="min-w-0">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}
