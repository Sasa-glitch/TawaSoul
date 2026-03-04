import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { authObject } from "../../context/TokenContext/TokenContext";
import DarkModeToggle from "../DarkModeButton/DarkModeButton";
import PostCard from "../postCard/PostCard";

export default function SinglePost() {
    const { id } = useParams();
    const {
        token,
        user: { _id: user_id },
    } = useContext(authObject);
    const getSinglePost = () => {
        return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
            headers: {
                Authorization: ` Bearer ${token} `,
            },
        });
    };
    const { isPending, isError, data, error, refetch } = useQuery({
        queryKey: ["SinglePost", id],
        gcTime: 1000 * 60 * 3,
        queryFn: getSinglePost,
    });
    if (isPending) {
        return <p>Loading</p>;
    }
    if (isError) {
        console.log(error);
        return <p>Error</p>;
    }
    console.log(data);
    const post = data.data.data.post;
    const isLiked = post.likes.includes(user_id);

    return (
        <>
            <DarkModeToggle />
            <PostCard
                post={post}
                key={post.id}
                isLiked={isLiked}
                refetch={refetch}
                isUsers={post.user._id === user_id}
            />
        </>
    );
}
