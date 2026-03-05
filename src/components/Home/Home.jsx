import React, { useContext, useState } from "react";
import Community from "../PostsArea/PostsArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faNewspaper,
    faUser,
    faEarth,
    faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import PostInput from "../PostInput/PostInput";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { authObject } from "../../context/TokenContext/TokenContext";

export default function Home() {
    // state to change the showing feed
    const [show, setShow] = useState("posts/feed?only=following&limit=50");
    // prepare posts
    const {
        token,
        user: { _id: user_id },
    } = useContext(authObject);
    function getAllPosts() {
        return axios.get(`https://route-posts.routemisr.com/${show}`, {
            headers: {
                AUTHORIZATION: ` Bearer ${token}`,
            },
        });
    }
    const { data, isError, error, isLoading, refetch, isSuccess } = useQuery({
        queryKey: ["get Posts", show],
        queryFn: getAllPosts,
        gcTime: 1000 * 60 * 5,
        staleTime: 1000 * 60 * 2,
    });
    // make empty posts variable for now
    let posts = ""
    // names short cuts
    const feedEP = "posts/feed?only=following&limit=50";
    const myPostsEP = `users/${user_id}/posts`;
    const communityEP = "posts";
    const savedEp = "users/bookmarks"
    return (
        <>
            <div className="grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px]">
                <aside className="hidden h-fit space-y-3 xl:sticky xl:top-21 xl:block">
                    <div className="rounded-2xl border border-slate-200 bg-background-light p-3 shadow-sm dark:border-white/10 dark:bg-background-dark">
                        <button
                            onClick={() => {setShow(feedEP); window.scrollTo({top:0, behavior: "smooth"})}}
                            className={`cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${show === feedEP ? "bg-primary/10 text-primary" : "text-default-700  hover:bg-slate-100 dark:hover:bg-white/5"} `}
                        >
                            <FontAwesomeIcon icon={faNewspaper} />
                            Feed
                        </button>

                        <button
                            onClick={() => {setShow(myPostsEP); window.scrollTo({top:0, behavior: "smooth"})}}
                            className={`cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${show === myPostsEP ? "bg-primary/10 text-primary" : "text-default-700  hover:bg-slate-100 dark:hover:bg-white/5"} `}
                        >
                            <FontAwesomeIcon icon={faUser} />
                            My Posts
                        </button>

                        <button
                            onClick={() => {setShow(communityEP); window.scrollTo({top:0, behavior: "smooth"})}}
                            className={`cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${show === communityEP ? "bg-primary/10 text-primary" : "text-default-700  hover:bg-slate-100 dark:hover:bg-white/5"} `}
                        >
                            <FontAwesomeIcon icon={faEarth} />
                            Community
                        </button>

                        <button
                            onClick={() => {setShow(savedEp); window.scrollTo({top:0, behavior: "smooth"})}}
                            className={`cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${show === savedEp ? "bg-primary/10 text-primary" : "text-default-700  hover:bg-slate-100 dark:hover:bg-white/5"} `}
                            >
                            <FontAwesomeIcon icon={faBookmark} />
                            Saved
                        </button>
                    </div>
                </aside>
                <div className="space-y-5">
                    <>
                        <PostInput refetch={refetch} />
                        {isLoading && <div> Loading </div>}
                        {isError && console.error("error happened", error)}
                        {isError && <div>error</div>}
                        {isSuccess &&
                            ((posts = data.data.data.posts || data.data.data.bookmarks),
                            console.log(
                                "NO error happened data is here",
                                data,
                            ),
                            (
                                <Community
                                    posts={posts}
                                    user_id={user_id}
                                    refetch={refetch}
                                />
                            ))}
                    </>
                </div>
            </div>
        </>
    );
}
