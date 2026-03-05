import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod";
import { Link, useNavigate } from "react-router-dom";
import * as zod from "zod";
import axios from "axios";
import { authObject } from "../../context/TokenContext/TokenContext";
import icon from "../../assets/favIcon.png";
import PasswordInput from "../PasswordInput/PasswordInput";

// 0-00 creating zod schmea

const zodSchema = zod.object({
    email: zod
        .string()
        .nonempty("Zod: Email Is Required")
        .email("Zod: Error In Email Format"),
    password: zod
        .string("Zod: Password Is Required")
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/,
            "Minimum Eight Characters, At Least One Upper Case English Letter, One Lower Case English Letter, One Number And One Special Character",
        ),
});

export default function Register() {
    // 1-00 useForm hook and get all objects and functions we may need
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onSubmit",
        resolver: zodResolver(zodSchema),
    });
    const errors = formState.errors;

    // 2-00 creating states to control ui passed on submitting
    const [logedIn, setLogedIn] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorInSign, setErrorInSign] = useState(false);

    const { addTokenSave, addTokenNoSave } = useContext(authObject);

    const navigate = useNavigate();

    const submitForm = (data) => {
        setIsSubmitting(true);
        axios
            .post("https://route-posts.routemisr.com/users/signin", data)
            .then((res) => {
                console.log(res.data);
                setLogedIn(true);
                const userToken = res.data.data.token;
                const userData = res.data.data.user;
                if (document.getElementById("remember").checked) {
                    addTokenSave(userToken, userData);
                } else {
                    addTokenNoSave(userToken, userData);
                }
            })
            .then(() => {
                setTimeout(() => {
                    setLogedIn(false);
                    navigate("/home");
                }, 1000);
            })
            .catch((err) => {
                console.error(err);
                console.error(err.response.data);
                setErrorInSign(err.response.data.errors);
                setTimeout(() => {
                    setErrorInSign(false);
                }, 4000);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };
    return (
        <>
            {logedIn && (
                <div className="bg-green-700 text-white p-4 rounded-3xl fixed top-0">
                    You Have Been Logged In
                </div>
            )}
            {/* {errorInSign && <div className="bg-red-700 text-white p-4 rounded-3xl fixed top-0">{errorInSign}</div>} */}
            <img
                src={icon}
                alt="tawasoul app icon"
                className="w-20 lg:w-30 m-auto"
            />
            <h1 className="m-auto font-bold text-4xl bg-linear-90 text-transparent bg-clip-text from-oud-wood dark:from-desert-sand to-primary w-fit">
                TawaSoul
            </h1>
            <p className="uppercase text-xs text-center mb-2">
                The Digital Soul of the Ummah
            </p>
            <div className="container gap-0 m-auto glass-back rounded-4xl overflow-clip w-full max-w-xl">
                <div className="dark:bg-linear-45 dark:from-oud-wood dark:via-desert-dark-sand dark:to-oud-wood bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <h1 className="font-bold lg:text-4xl text-gray-900/80 dark:text-white text-2xl">
                        Sign In
                    </h1>
                    {logedIn && (
                        <div className="bg-green-700 text-white p-4 rounded-3xl">
                            You Have Been Signed Up
                        </div>
                    )}
                    {errorInSign && (
                        <div className="bg-red-700 text-white p-4 rounded-3xl">
                            {errorInSign}
                        </div>
                    )}
                    <form onSubmit={handleSubmit(submitForm)} className="mt-3">
                        {/* email input */}
                        <div className="mb-3">
                            <label htmlFor="email" className="label">
                                Email Address...
                            </label>
                            <input
                                {...register("email")}
                                type="email"
                                id="email"
                                className="input"
                                placeholder="Please Enter Email Address"
                            />
                            {errors.email && (
                                <p className="text-xs text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        {/* Password input */}
                        <div className="mb-3">
                            <label htmlFor="password" className="label">
                                Your Password...
                            </label>
                            <PasswordInput
                                id="password"
                                registration={register("password")}
                            />
                            {errors.password && (
                                <p className="text-xs text-red-600">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        {/* remember user */}
                        <div className="flex items-center space-x-2 ml-1 mb-2">
                            <input
                                defaultChecked={true}
                                className="input-select"
                                id="remember"
                                type="checkbox"
                            />
                            <label className="text-xs" htmlFor="remember">
                                Keep me logged in on this device
                            </label>
                        </div>
                        {/* submit button */}
                        <button
                            disabled={isSubmitting}
                            className={`w-full btn ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}
                        >
                            {isSubmitting ? "Loading" : "Login User"}
                        </button>
                        {/* to login link */}
                        <Link to={"/register"} className="text-primary">
                            Aren't A Memeber Yet? Sign Up
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
}
