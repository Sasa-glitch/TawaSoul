import "./App.css";
import { useEffect } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Notfound from "./components/Notfound/Notfound.jsx";
import SinglePost from "./components/SinglePost/SinglePost"
import ProfilePage from "./components/ProfilePage/ProfilePage.jsx"
import TokenContext from "./context/TokenContext/TokenContext.jsx";
import {HeroUIProvider} from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import AuthRoute from "./components/AuthRoute/AuthRoute.jsx";
import Settings from "./components/Settings/Settings.jsx";



const router = createBrowserRouter([
    { path: '', element: <Layout />, children: [
            {index: true, element:<ProtectedRoute><Home /></ProtectedRoute> },
            {path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute>},
            {path: 'posts', element: <ProtectedRoute><Navigate to={"/"} /></ProtectedRoute>},
            {path: 'posts/:id', element: <ProtectedRoute><SinglePost /></ProtectedRoute>},
            {path: 'profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
            {path: 'settings', element: <ProtectedRoute><Settings /></ProtectedRoute> },
        ]
    },
    {path: '*', element: <Notfound />},
    {path: 'register', element: <AuthRoute> <Register /> </AuthRoute>},
    {path: 'login', element: <AuthRoute><Login /></AuthRoute>},
]);

const queryClinet = new QueryClient();

export default function App() {
    useEffect(() => {
    // Check initial theme
    const theme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = theme === 'dark' || (!theme && prefersDark);
    
    document.documentElement.classList.toggle('dark', initialDark);
    }, []);

    return <>
    <QueryClientProvider client={queryClinet}>
        <HeroUIProvider>
            <TokenContext>
                <RouterProvider router={router} />
            </TokenContext>
        </HeroUIProvider>
    </QueryClientProvider>
    
    </>

}


