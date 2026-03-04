import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar.jsx'

export default function Layout() {
return <>
    <Navbar />
    <main className='p-4 dark:bg-background-dark bg-background-light min-h-screen'>
        <Outlet />
    </main>
</>

}
