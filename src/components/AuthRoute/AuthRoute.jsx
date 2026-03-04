import React, { useContext } from 'react'
import { authObject } from '../../context/TokenContext/TokenContext'
import { Navigate } from 'react-router-dom'
import DarkModeButton from "../DarkModeButton/DarkModeButton"


export default function AuthRoute({children}) {
    const {token} = useContext(authObject)
    if (token !== null) {
        return <Navigate to={'/home'} />
    }
    else {
        return <>
                    <main className="p-4 dark:bg-background-dark bg-background-light min-h-screen">
        
            {children}
            <div className="flex justify-center">
                                <DarkModeButton />
                            </div>
                                        </main>

        </>
    }
}
