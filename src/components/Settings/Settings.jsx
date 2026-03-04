import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "@heroui/react";
import PasswordInput from "../PasswordInput/PasswordInput";

import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod";
import * as zod from "zod";
import axios from "axios";
import { authObject } from "./../../context/TokenContext/TokenContext";

const zodSchema = zod
    .object({
        password: zod
            .string("Password Is Required")
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/,
                "At least 8 characters with uppercase, lowercase, number, and special character.",
            ),
        newPassword: zod
            .string("New Password Is Required")
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/,
                "At least 8 characters with uppercase, lowercase, number, and special character.",
            ),
        rePassword: zod
            .string("Please Confirm Password")
    })
    .refine(
        function (obj) {
            return obj.newPassword === obj.rePassword;
        },
        { path: "rePassword", error: "Passwords Doesn't Match." },
    );

export default function Settings() {
    // create states we may need
    const [isLoading, setIsLoading] = useState(false);
    const [passwordUpdated, setPasswordUpdated] = useState(false);
    const [updateFailed, setUpdateFailed] = useState(false);
    // get what we need from rhf
    const { register, handleSubmit, formState:{errors} } = useForm({
        defaultValues: {
            password: "",
            rePassword: "",
            newPassword: "",
        },
        mode: "onChange",
        resolver: zodResolver(zodSchema),
    });
    // import token from authobject
    const { token } = useContext(authObject);
    // create submit function
    const submitForm = ({ rePassword, ...data }) => {
        setIsLoading(true);
        axios
            .patch(
                "https://route-posts.routemisr.com/users/change-password",
                data,
                {
                    headers: {
                        Authorization: ` Bearer ${token} `,
                    },
                },
            )
            .then((res) => {
                console.log(res);
                setPasswordUpdated(true);
                setTimeout(() => {
                    setPasswordUpdated(false);
                }, 3000);
            })
            .catch((err) => {
                console.error(err);
                console.error(err);
                setUpdateFailed(true);
                setTimeout(() => {
                    setUpdateFailed(false);
                }, 3000);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <div className="mx-auto max-w-7xl px-3 py-3.5">
            <main className="min-w-0">
                <div className="mx-auto max-w-2xl">
                    <section className="rounded-2xl border border-slate-200 bg-background-light p-5 shadow-sm dark:border-white/10 dark:bg-background-dark sm:p-6">
                        {/* Header */}
                        <div className="mb-5 flex items-center gap-3">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <FontAwesomeIcon icon={faKey} />
                            </span>
                            <div>
                                <h1 className="text-xl font-extrabold text-default-900 sm:text-2xl">
                                    Change Password
                                </h1>
                                <p className="text-sm text-default-500">
                                    Keep your account secure by using a strong
                                    password.
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit(submitForm)}
                            className="space-y-4"
                        >
                            <div className="mb-3">
                                <label htmlFor="password" className="label">
                                    Current Password...
                                </label>
                                <PasswordInput
                                    placeholder="Enter current password"
                                    registration={register("password")}
                                    id="password"
                                />
                                {errors.rePassword && (
                                    <p className="text-xs text-red-600">
                                        {errors.password?.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="newPassword" className="label">
                                    New Password...
                                </label>
                                <PasswordInput
                                    placeholder="Enter new password"
                                    registration={register("newPassword")}
                                    id="newPassword"
                                />
                                {errors.rePassword && (
                                    <p className="text-xs text-red-600">
                                        {errors.newPassword?.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rePassword" className="label">
                                    Password Confirmation...
                                </label>
                                <PasswordInput
                                    placeholder="Re-enter new password"
                                    registration={register("rePassword")}
                                    id="rePassword"
                                />
                                {errors.rePassword && (
                                    <p className="text-xs text-red-600">
                                        {errors.rePassword?.message}
                                    </p>
                                )}
                            </div>
                            {passwordUpdated && (
                                <Alert
                                    color="success"
                                    title="Password Was Successfully Updated"
                                />
                            )}
                            {updateFailed && (
                                <Alert
                                    color="danger"
                                    title="Password Update Failed Recheck The Password"
                                />
                            )}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Update password
                            </button>
                        </form>
                    </section>
                </div>
            </main>
        </div>
    );
}
