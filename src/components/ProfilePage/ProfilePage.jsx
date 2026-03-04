import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { authObject } from "../../context/TokenContext/TokenContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCamera,
    faExpand,
    faUsers,
    faEnvelope,
    faX,
    faFileLines,
    faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import PostCard from "../postCard/PostCard";
import tawaSoulLogo from "../../assets/tawasoulIcon.png";

export default function ProfilePage() {
    // states
    const {
        token,
        user: { _id: userid },
    } = useContext(authObject);
    const getUserProfile = () => {
        return axios.get(
            "https://route-posts.routemisr.com/users/profile-data",
            {
                headers: {
                    Authorization: ` Bearer ${token} `,
                },
            },
        );
    };
    const { data, isPending, isSuccess, isError, error } = useQuery({
        queryKey: ["Users Profile"],
        queryFn: getUserProfile,
    });
    if (isPending) {
        return <p>Loading</p>;
    }
    if (isError) {
        console.error(error);

        return <p>Error</p>;
    }
    if (isSuccess) {
        console.log(data);
        const user = data.data.data.user;
        console.log("user from api", user);
        return (
            <>
                <div className="space-y-5 sm:space-y-6">
                    <ProfileHeader user={user} token={token} />
                    <ProfilePosts userid={userid} token={token} />
                </div>
            </>
        );
    }
}

function ProfileHeader({ user, token }) {
    //1-0 model states
    const [isOpen, setIsOpen] = useState(false);
    //2-0 upload photo
    // states
    const [photoInput, setPhotoInput] = useState(null);
    const [photoInputPreview, setPhotoInputPreview] = useState(null);
    // photo form data
    const photoFormData = new FormData();
    // handel upload photo function
    const handlePhotoFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPhotoInputPreview(url);
        setPhotoInput(file);
    };
    // clear photo function
    const clearPhoto = () => {
        setPhotoInputPreview(null);
        setPhotoInput(null);
        URL.revokeObjectURL(photoInputPreview);
    };
    // mutation function
    const { mutate: updatePhoto } = useMutation({
        mutationFn: () => {
            photoFormData.append("photo", photoInput);
            return axios.put(
                "https://route-posts.routemisr.com/users/upload-photo",
                photoFormData,
                {
                    headers: {
                        Authorization: ` Bearer ${token} `,
                    },
                },
            );
        },
    });
    return (
        <>
            <section className="overflow-hidden rounded-2xl border border-default-200 bg-background shadow-sm sm:rounded-[28px]">
                {/* Cover */}
                <div className="group/cover relative h-44 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)] sm:h-52 lg:h-60">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(255,255,255,.14)_0%,rgba(255,255,255,0)_36%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(186,230,253,.22)_0%,rgba(186,230,253,0)_44%)]" />
                    <div className="absolute -left-16 top-10 h-36 w-36 rounded-full bg-white/8 blur-3xl" />
                    <div className="absolute right-8 top-6 h-48 w-48 rounded-full bg-[#c7e6ff]/10 blur-3xl" />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/25 to-transparent" />
                    <div className="pointer-events-none absolute right-2 top-2 z-10 flex flex-wrap items-center justify-end gap-1.5 opacity-100 transition duration-200 sm:right-3 sm:top-3 sm:opacity-0 sm:group-hover/cover:opacity-100">
                        <label className="pointer-events-auto inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-black/45 px-3 py-1.5 text-xs font-bold text-white backdrop-blur transition hover:bg-black/60">
                            <FontAwesomeIcon
                                icon={faCamera}
                                className="h-3 w-3"
                            />
                            Add cover
                            <input
                                accept="image/*"
                                className="hidden"
                                type="file"
                            />
                        </label>
                    </div>
                </div>

                {/* Info card */}
                <div className="relative -mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 sm:pb-6">
                    <div className="rounded-3xl border border-default-200/60 bg-background/92 p-5 backdrop-blur-xl sm:p-7">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            {/* Avatar + name */}
                            <div className="min-w-0">
                                <div className="flex items-end gap-4">
                                    <div className="group/avatar relative shrink-0">
                                        <button
                                            onClick={() => setIsOpen(true)}
                                            type="button"
                                            className="cursor-zoom-in rounded-full"
                                        >
                                            <img
                                                alt={user.name}
                                                src={user.photo}
                                                className="h-28 w-28 rounded-full border-4 border-background object-cover shadow-md ring-2 ring-primary/30"
                                            />
                                        </button>
                                        <button
                                            onClick={() => setIsOpen(true)}
                                            type="button"
                                            title="View profile photo"
                                            className="absolute bottom-1 left-1 flex h-9 w-9 items-center justify-center rounded-full bg-background text-primary opacity-100 shadow-sm ring-1 ring-default-200 transition hover:bg-default-100 sm:opacity-0 sm:group-hover/avatar:opacity-100"
                                        >
                                            <FontAwesomeIcon
                                                icon={faExpand}
                                                className="h-4 w-4"
                                            />
                                        </button>
                                        <label className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-white opacity-100 shadow-sm transition hover:bg-primary/80 sm:opacity-0 sm:group-hover/avatar:opacity-100">
                                            <FontAwesomeIcon
                                                icon={faCamera}
                                                className="h-4 w-4"
                                            />
                                            <input
                                                onChange={handlePhotoFile}
                                                accept="image/*"
                                                className="hidden"
                                                type="file"
                                            />
                                        </label>
                                    </div>

                                    <div className="min-w-0 pb-1">
                                        <h2 className="truncate text-2xl font-black tracking-tight text-default-900 sm:text-4xl">
                                            {user.name}
                                        </h2>
                                        <p className="mt-1 text-lg font-semibold text-default-500 sm:text-xl">
                                            @{user.username}
                                        </p>
                                        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                                            <FontAwesomeIcon
                                                icon={faUsers}
                                                className="h-3 w-3"
                                            />
                                            TawaSoul member
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Followers / Following / Bookmarks */}
                            <div className="grid w-full grid-cols-3 gap-2 lg:w-130">
                                {[
                                    {
                                        label: "Followers",
                                        value: user.followersCount,
                                    },
                                    {
                                        label: "Following",
                                        value: user.followingCount,
                                    },
                                    {
                                        label: "Bookmarks",
                                        value: user.bookmarksCount,
                                    },
                                ].map(({ label, value }) => (
                                    <div
                                        key={label}
                                        className="rounded-2xl border border-default-200 bg-background px-3 py-3 text-center sm:px-4 sm:py-4"
                                    >
                                        <p className="text-[8px] font-bold uppercase tracking-wide text-default-600 sm:text-xs">
                                            {label}
                                        </p>
                                        <p className="mt-1 text-2xl font-black text-default-900 sm:text-3xl">
                                            {value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* About + logo */}
                        <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
                            <div className="rounded-2xl border border-default-200 bg-default-50 p-4">
                                <h3 className="text-sm font-extrabold text-default-800 lg:text-lg">
                                    About
                                </h3>
                                <div className="mt-3 space-y-2 text-sm text-default-600">
                                    <p className="flex items-center gap-2 lg:text-lg">
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                            className="h-3.75 w-3.75 text-default-500"
                                        />
                                        {user.email}
                                    </p>
                                    <p className="flex items-center gap-2 lg:text-lg">
                                        <FontAwesomeIcon
                                            icon={faUsers}
                                            className="h-3.75 w-3.75 text-default-500"
                                        />
                                        Active on TawaSoul
                                    </p>
                                </div>
                            </div>
                            <img
                                src={tawaSoulLogo}
                                alt="tawaSoul logo"
                                className="max-h-50 m-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <PhotoModel
                src={user.photo}
                alt={user.name}
                isOpen={isOpen}
                closeOpen={setIsOpen}
            />
            {photoInputPreview && (
                <UploadPhotoModel
                    photoPreview={photoInputPreview}
                    closeFn={clearPhoto}
                    updatePhoto={updatePhoto}
                />
            )}
        </>
    );
}

function PhotoModel({ src = null, alt = null, isOpen = false, closeOpen }) {
    return (
        <>
            {isOpen && (
                <div
                    onClick={(e) =>
                        e.target.tagName !== "IMG" && closeOpen(false)
                    }
                    className={`fixed inset-0 z-80 flex items-center justify-center bg-black/90 p-4 sm:p-8`}
                >
                    <button
                        onClick={() => closeOpen(false)}
                        type="button"
                        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    >
                        <FontAwesomeIcon icon={faX} className="w-full h-full" />
                    </button>
                    <img
                        alt={alt}
                        className="max-h-full max-w-full object-contain"
                        src={src}
                    />
                </div>
            )}
        </>
    );
}

function UploadPhotoModel({ photoPreview, closeFn, updatePhoto }) {
    return (
        <>
            <div
                onClick={(e) =>
                    !e.target.closest('[data-info="upload-area"]') && closeFn()
                }
                className="fixed inset-0 z-90 flex items-center justify-center bg-black/70 p-4"
            >
                <div
                    data-info="upload-area"
                    className="w-full max-w-140 rounded-2xl border border-slate-200 bg-background-light p-4 shadow-xl dark:border-white/10 dark:bg-[#112121] sm:p-5"
                >
                    {/* Header */}
                    <div className="mb-3">
                        <h3 className="text-lg font-extrabold text-default-900">
                            Adjust profile photo
                        </h3>
                        <p className="text-sm text-default-500">
                            Drag to reposition and use zoom for perfect framing.
                        </p>
                    </div>

                    {/* Crop area */}
                    <div className="mx-auto w-full max-w-85 overflow-x-auto pb-1">
                        <div className="relative h-80 w-[320px] touch-none overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200 dark:bg-white/5 dark:ring-white/10">
                            <img
                                alt="Crop preview"
                                draggable="false"
                                className="pointer-events-none absolute left-1/2 top-1/2 select-none"
                                src={photoPreview}
                                style={{
                                    width: 630,
                                    height: 604,
                                    maxWidth: "none",
                                    maxHeight: "none",
                                    transform:
                                        "translate(calc(-50% + 0px), calc(-50% + 0px)) scale(0.529801)",
                                    transformOrigin: "center center",
                                }}
                            />
                        </div>
                    </div>

                    {/* Zoom slider */}
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-default-500">
                            <span>Zoom</span>
                            <span>1.00x</span>
                        </div>
                        <input
                            min={1}
                            max={3}
                            step="0.01"
                            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-primary dark:bg-white/10"
                            type="range"
                            defaultValue={1}
                        />
                    </div>

                    {/* Privacy select */}
                    <div className="mt-4">
                        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-default-500">
                            Post privacy
                        </p>
                        <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-default-700 outline-none focus:border-primary dark:border-white/10 dark:bg-white/5">
                            <option value="public">Public</option>
                            <option value="following">Followers</option>
                            <option value="only_me">Only me</option>
                        </select>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex items-center justify-end gap-2">
                        <button
                            onClick={closeFn}
                            type="button"
                            className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-default-600 transition hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/5"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={updatePhoto}
                            type="button"
                            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Save photo
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

function ProfilePosts({ userid, token }) {
    // state to toggle posts
    const [display, setDisplay] = useState("posts");
    // handle myPosts posts
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["My posts"],
        queryFn: () => {
            return axios.get(
                `https://route-posts.routemisr.com/users/${userid}/posts`,
                {
                    headers: {
                        Authorization: ` Bearer ${token} `,
                    },
                },
            );
        },
        gcTime: 1000 * 60 * 3,
    });
    function handlePosts() {
        if (isLoading) {
            return <p>Loading...</p>;
        }
        if (isError) {
            console.error(error);
            return <p>Error</p>;
        }
        console.log(data);
        const posts = data.data.data.posts;
        return (
            <>
                <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 max-w-80 m-auto text-center mb-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-primary/80">
                        My Posts
                    </p>
                    <p className="mt-1 text-2xl font-black text-default-900">
                        {posts.length}
                    </p>
                </div>
                {posts.map((post) => {
                    const isLiked = post.likes.includes(userid);
                    // console.log("compare, likes, id", post.likes.includes(user_id), post.likes, user_id)
                    return (
                        <PostCard
                            post={post}
                            key={post.id}
                            isLiked={isLiked}
                            refetch={refetch}
                            isUsers={post.user._id === userid}
                        />
                    );
                })}
            </>
        );
    }
    // handle booked posts
    const {
        data: bookedData,
        isLoading: bookedIsLoading,
        isSuccess: bookedIsSuccess,
        isError: bookedIsError,
        error: bookedError,
        refetch: bookedRefetc,
    } = useQuery({
        queryKey: ["Booked Posts"],
        queryFn: () => {
            return axios.get(
                "https://route-posts.routemisr.com/users/bookmarks",
                {
                    headers: {
                        Authorization: ` Bearer ${token} `,
                    },
                },
            );
        },
        gcTime: 1000 * 60 * 3,
    });
    function handleBooked() {
        if (bookedIsLoading) {
            return <p>Loading...</p>;
        }
        if (bookedIsError) {
            console.error(bookedError);
            return <p>Error</p>;
        }
        const bookedPosts = bookedData.data.data.bookmarks;
        return (
            <>
                <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 max-w-80 m-auto text-center mb-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-primary/80">
                        Booked Posts
                    </p>
                    <p className="mt-1 text-2xl font-black text-default-900">
                        {bookedPosts.length}
                    </p>
                </div>
                {bookedPosts.map((post) => {
                    const isLiked = post.likes.includes(userid);
                    // console.log("compare, likes, id", post.likes.includes(user_id), post.likes, user_id)
                    return (
                        <PostCard
                            post={post}
                            key={post.id}
                            isLiked={isLiked}
                            refetch={refetch}
                            isUsers={post.user._id === userid}
                        />
                    );
                })}
            </>
        );
    }
    return (
        <>
            {/* wrapper my posts/ booked toggle */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-background-light p-3 shadow-sm dark:border-white/10 dark:bg-[#112121]">
                <div className="grid w-full grid-cols-2 gap-2 rounded-xl bg-white p-1.5 dark:bg-white/5 sm:inline-flex sm:w-auto sm:gap-0">
                    <button
                        onClick={() => setDisplay("posts")}
                        className={`cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold ${display === "posts" ? "bg-white text-primary shadow-sm transition dark:bg-white/10" : "text-default-500 transition hover:text-default-900"}`}
                    >
                        <FontAwesomeIcon icon={faFileLines} />
                        My Posts
                    </button>
                    <button
                        onClick={() => {
                            setDisplay("booked");
                        }}
                        className={`cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold ${display === "booked" ? "bg-white text-primary shadow-sm transition dark:bg-white/10" : "text-default-500 transition hover:text-default-900"}`}
                    >
                        <FontAwesomeIcon icon={faBookmark} />
                        Saved
                    </button>
                </div>
            </div>
            {display === "posts" && handlePosts()}
            {display === "booked" && handleBooked()}
        </>
    );
}
