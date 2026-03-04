import React, { useContext } from "react";
import { authObject } from "./../../context/TokenContext/TokenContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../postCard/PostCard";
import DarkModeToggle from "../DarkModeButton/DarkModeButton";
import PostInput from "../PostInput/PostInput";

export default function Community() {
    const {
        token,
        user: { _id: user_id },
    } = useContext(authObject);
    function getAllPosts() {
        return axios.get("https://route-posts.routemisr.com/posts", {
            headers: {
                AUTHORIZATION: ` Bearer ${token}`,
            },
            params: { limit: 50, sort: "-createdAt" },
        });
    }
    const { data, isError, error, isLoading, refetch } = useQuery({
        queryKey: ["getAllPosts"],
        queryFn: getAllPosts,
        gcTime: 1000 * 60 * 5,
        staleTime: 1000 * 60 * 2,
    });
    if (isLoading) {
        return <div> Loading </div>;
    }
    if (isError) {
        console.error("error happened", error);
        return <div>error</div>;
    }
    if (!isLoading) {
        console.log("NO error happened data is here", data.data.data.posts);
        const posts = data.data.data.posts;
        return (
            <>
                <div className="space-y-2">
                    <PostInput refetch={refetch}/>

                    <DarkModeToggle />

                    {posts.map((post) => {
                        const isLiked = post.likes.includes(user_id);
                        // console.log("compare, likes, id", post.likes.includes(user_id), post.likes, user_id)
                        return (
                            <PostCard
                                post={post}
                                key={post.id}
                                isLiked={isLiked}
                                refetch={refetch}
                                isUsers={post.user._id === user_id}
                            />
                        );
                    })}
                </div>
            </>
        );
    }
}
