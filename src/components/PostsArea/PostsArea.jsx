import React, { useContext } from "react";
import { authObject } from "../../context/TokenContext/TokenContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../postCard/PostCard";
import DarkModeToggle from "../DarkModeButton/DarkModeButton";
import PostInput from "../PostInput/PostInput";

export default function Community({ posts, user_id, refetch }) {
    return (
        <>
            {posts.map((post) => {
                const isLiked = post.likes.includes(user_id);
                // console.log("compare, likes, id", post.likes.includes(user_id), post.likes, user_id)
                return (
                    <PostCard
                        post={post}
                        key={post.id}
                        isLiked={isLiked}
                        refetch={refetch}
                        isUsers={post.user?._id === user_id}
                    />
                );
            })}
        </>
    );
}
