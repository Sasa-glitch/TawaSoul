import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
import * as zod from "zod";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/tawasoulIcon.png";
import PasswordInput from "../PasswordInput/PasswordInput";



// 0-00 const firstSchmea = zod.string().min(3).max(10);
const zodSchema = zod.object({
    name : zod.string().nonempty("Name Is Required").min(3,"Minmum Length Is 3 Characters").max(20,"Maximum Length Is 20 Characters"),
    username : zod.string().nonempty("User Name Is Required").min(3,"Minmum Length Is 3 Characters").max(20,"Maximum Length Is 20 Characters"),
    email : zod.string().nonempty("Zod: Email Is Required").email("Zod: Error In Email Format"),
    password : zod.string("Zod: Password Is Required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/, "Minimum Eight Characters, At Least One Upper Case English Letter, One Lower Case English Letter, One Number And One Special Character"),
    rePassword : zod.string("Zod: Password Is Required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/, "Minimum Eight Characters, At Least One Upper Case English Letter, One Lower Case English Letter, One Number And One Special Character"),
    dateOfBirth : zod.coerce.date("Zod: Birth Date Is Required").refine(date => {
        return new Date().getFullYear() - date.getFullYear() > 18;
    }, "Zod: You Should At Least Be 18 To Use Our App").transform(date => date.toISOString().split("T")[0]),
    gender : zod.enum(["male", "female"], {error: iss =>{
        if (iss.input === "" || iss.input === undefined) {
            return "Gender Is Required"
        }
        return "There Is Only Two Genders"
    }}),
}).refine(function (obj) {
    return obj.password ===  obj.rePassword;
}, {path : 'rePassword', error : "Passwords Doesn't Match."})

export default function Register() {
    // 1-00 destructing from UseForm Hooks all the objects/functions we may need
    const { register, handleSubmit, formState, } = useForm(
        {
            defaultValues : {
            name: "",
            username: "",
            email: "",
            password: "",
            rePassword: "",
            dateOfBirth: "",
            gender: "",
            },
            mode: "onChange",
            resolver : zodResolver(zodSchema),
        }
    );
    // 1-01 creating variables to hold form errors we could do formState: {errors} but this is for readiablity
    const errors = formState.errors;

    // 2-00 creating states and hooks to control the ui while submitting
    const [signedUp, setSignedUp] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorInSign, setErrorInSign] = useState(false);
    const navigate = useNavigate();
    
    
    // 3-00 creating our submit function
    const submitForm = (data) => {
        setIsSubmitting(true);
        // 3-01 making our http post request
        axios.post("https://route-posts.routemisr.com/users/signup", data)
        .then(res => {
            console.log(res.data);
            setSignedUp(true);
            setTimeout(() => {
                setSignedUp(false);
                navigate("/login")
            }, 1000);
        })
        .catch(err => {
            console.error("error here",err.response.data.errors);
            console.error(err.response.data);
            setErrorInSign(err.response.data.errors);
            setTimeout(() => {
                setErrorInSign(false);
            }, 4000);
        })
        .finally(() => {
            setIsSubmitting(false);
        })
    };
    // 4-00 returning our component
    return (
        <> 
                <div className="container grid grid-cols-1 lg:grid-cols-12 gap-0 m-auto glass-back rounded-4xl overflow-clip w-full max-w-5xl">
                    <div className="hidden isolate lg:flex lg:col-span-5 dark:bg-oud-wood bg-desert-sand/50 relative overflow-hidden p-12 border-primary/20">
                        <div className="inset-0 absolute pattern-overlay dark:bg-desert-sand bg-oud-wood opacity-15"></div>
                        <div className="z-10 flex flex-col justify-between items-center">
                            <div>
                                <h2 className="mb-2 font-bold text-4xl dark:text-shadow-desert-sand text-shadow-oud-wood text-shadow-sm">Tawa<span className="text-primary ">Soul</span></h2>
                                <h2 className="mb-2 dark:text-desert-sand text-oud-wood font-bold text-3xl">Join the<br />Caravan.</h2>
                                <p className="mb-2 font-bold">Enter the digital Majlis where faith meets the future.</p>
                            </div>
                            <img src={logo} alt="tawasoul app logo" className="h-50"/>
                        </div>
                    </div>
                    <div className="dark:bg-linear-45 dark:from-oud-wood dark:via-desert-dark-sand dark:to-oud-wood bg-white lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        <h1 className="font-bold lg:text-4xl text-gray-900/80 dark:text-white text-2xl">
                            Create Account
                        </h1>
                        <p className="text-xs mb-3 lg-mb-0 lg:text-2xl">Secure your place in the digital oasis.</p>
                        {signedUp && <div className="bg-green-700 text-white p-4 rounded-3xl">You Have Been Signed Up</div>}
                        {errorInSign && <div className="bg-red-700 text-white p-4 rounded-3xl">{errorInSign}</div>}
                        <form
                            onSubmit={handleSubmit(submitForm)}
                            className= "mt-3"
                        >
                            {/* Names area */}
                            <div className="flex gap-3">
                                {/* Name input */}
                                <div className="mb-3 w-1/2">
                                    <label htmlFor="name" className="label">
                                        Enter Your Name...
                                    </label>
                                    <input
                                        {...register("name")}
                                        type="text"
                                        id="name"
                                        className="input"
                                        placeholder="Please Enter Your Name"
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-red-600">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                                {/* User Name input */}
                                <div className="mb-3 w-1/2">
                                    <label htmlFor="username" className="label">
                                        Enter User Name...
                                    </label>
                                    <input
                                        {...register("username")}
                                        type="text"
                                        id="name"
                                        className="input"
                                        placeholder="Please Enter Your User Name"
                                    />
                                    {errors.username && (
                                        <p className="text-xs text-red-600">
                                            {errors.username.message}
                                        </p>
                                    )}
                                </div>
                            </div>
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
                                <PasswordInput id="password" registration={register("password")} />
                                {errors.password && (
                                    <p className="text-xs text-red-600">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                            {/* repassword input */}
                            <div className="mb-3">
                                <label htmlFor="rePassword" className="label">
                                    Password Confirmation...
                                </label>
                                <PasswordInput id="rePassword" registration={register("rePassword")} />
                                {errors.rePassword && (
                                    <p className="text-xs text-red-600">
                                        {errors.rePassword.message}
                                    </p>
                                )}
                            </div>
                            {/* DOB input */}
                            <div className="mb-3">
                                <label htmlFor="dateOfBirth" className="label">
                                    Enter Your Birthdate...
                                </label>
                                <input
                                    {...register("dateOfBirth")}
                                    type="date"
                                    id="dateOfBirth"
                                    className="input"
                                />
                                {errors.dateOfBirth && (
                                    <p className="text-xs text-red-600">
                                        {errors.dateOfBirth.message}
                                    </p>
                                )}
                            </div>
                            {/* Gender inputs */}
                            <p className="label mb-1">Select Your Geneder...</p>
                            <div className="flex gap-2.5 mb-3">
                                <div className="flex gap-2 items-center">
                                    <label htmlFor="male" className="label">
                                        Male:
                                    </label>
                                    <input
                                        {...register("gender")}
                                        type="radio"
                                        id="male"
                                        value="male"
                                        className="input-select"
                                    />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <label htmlFor="female" className="label">
                                        Female:
                                    </label>
                                    <input
                                        type="radio"
                                        id="female"
                                        value="female"
                                        name="gender"
                                        className="input-select"
                                    />
                                </div>
                            </div>
                            {errors.gender && (
                                <p className="text-xs text-red-600">
                                    {errors.gender.message}
                                </p>
                            )}
                            
                            {/* submit button */}
                            <button disabled={isSubmitting} className={`w-full btn ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}>
                                {isSubmitting ? "Loading": "Register User"}
                            </button>
                            {/* to login link */}
                            <Link to={"/login"} className="text-primary">Already A Memeber? Sign In</Link>
                        </form> 
                    </div>
                </div>
        </>
    );
}
