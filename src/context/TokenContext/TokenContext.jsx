import React, { createContext, useState } from "react";
export const authObject = createContext();

export default function TokenContext({ children }) {
    // getting token
    const [token, setToken] = useState(function () {
        return localStorage.getItem("tkn") || sessionStorage.getItem("tkn");
    });
    // getting userdata
    const [user, setUser] = useState(function () {
        return (
            JSON.parse(localStorage.getItem("user")) ||
            JSON.parse(sessionStorage.getItem("user"))
        );
    });

    // handel data
    function addTokenSave(tkn, user) {
        setToken(tkn);
        setUser(user);
        localStorage.setItem("tkn", tkn);
        localStorage.setItem("user", JSON.stringify(user));
    }
    function addTokenNoSave(tkn, user) {
        setToken(tkn);
        setUser(user);
        localStorage.removeItem("tkn");
        localStorage.removeItem("user");
        sessionStorage.setItem("tkn", tkn);
        sessionStorage.setItem("user", JSON.stringify(user));
    }
    const clearToken = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("tkn");
        localStorage.removeItem("user");
        sessionStorage.removeItem("tkn");
        sessionStorage.removeItem("user");
    };
    const updateUser = (user) => {
        setUser(user);
        localStorage.getItem("user") && localStorage.setItem("user", JSON.stringify(user));
        sessionStorage.getItem("user") && sessionStorage.setItem("user", JSON.stringify(user));
    };
    return (
        <>
            <authObject.Provider
                value={{
                    token,
                    user,
                    addTokenSave,
                    addTokenNoSave,
                    clearToken,
                    updateUser
                }}
            >
                {children}
            </authObject.Provider>
        </>
    );
}
