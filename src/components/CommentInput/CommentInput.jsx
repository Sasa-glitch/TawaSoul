import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faImage,
    // faFaceSmile,
    faPaperPlane,
    faX
} from "@fortawesome/free-solid-svg-icons";
import { authObject } from "../../context/TokenContext/TokenContext";
import axios from "axios";
import { url } from "zod";
import { useMutation } from '@tanstack/react-query';
import { Spinner } from "@heroui/react";

function CommentInput({ postId, refetchFn }) {
    const { user, token } = useContext(authObject);

    // create states so we can append data to form data object
    const [ textInput, setTextInput] = useState("");
    const [ photoInput, setPhotoInput] = useState(null);
    // image preview state
    const [photoPreivew, setPhotoPreivew] = useState(null);

    // create image upload functions
    const handelUploadImage = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPhotoInput(file);
        const url = URL.createObjectURL(file);
        setPhotoPreivew(url);
    };

    // clear photo function
    const clearPhoto = () => {
        setPhotoPreivew(null);
        setPhotoInput(null);
        URL.revokeObjectURL(photoPreivew);
    }

    // create submit for button
    const submitCommentPromise = () => {
        // create form input object
        const commentData = new FormData();
        // append data to form data object
        textInput && commentData.append("content", textInput);
        photoInput && commentData.append("image", photoInput);
        console.log(Object.fromEntries(commentData));
        return axios
            .post(
                `https://route-posts.routemisr.com/posts/${postId}/comments`,
                commentData,
                {
                    headers: {
                        Authorization: ` Bearer ${token}`,
                    },
                },
            )
    };
    const {isPending, mutate:submitComment} = useMutation({
        mutationFn: submitCommentPromise,
        onSuccess: (res) => {
            console.log(res);
            setTextInput("");
            setPhotoInput(null);
            setPhotoPreivew(null);
            refetchFn();

        },
        onError: (e) => {
                console.error(e);
                console.log("id", postId);
                console.log("token", token);
            }
    })
    return (
        <div className="mt-3">
            <div className="flex items-start gap-2">
                <img
                    alt={user?.name}
                    className="h-9 w-9 rounded-full object-cover"
                    src={user?.photo}
                />
                <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 focus-within:border-primary/50 focus-within:bg-white dark:focus-within:bg-slate-900 transition">
                    <textarea
                        placeholder={`Comment as ${user.name}...`}
                        rows={1}
                        className="max-h-[240px] min-h-[40px] w-full resize-none bg-transparent px-2 py-1.5 text-sm leading-5 outline-none placeholder:text-default-600 text-slate-800 dark:text-slate-100"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                    />
                    {/* image preview */}
                    {photoPreivew && (
                        <div className="relative mt-2">
                            <img
                                alt="Comment preview"
                                className="max-h-52 w-full rounded-lg object-cover"
                                src={photoPreivew}
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white cursor-pointer"
                                onClick={clearPhoto}
                            >
                                <FontAwesomeIcon icon={faX} />
                            </button>
                        </div>
                    )}

                    <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            {/* Image upload */}
                            <label className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-default-600 transition hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-primary">
                                <FontAwesomeIcon
                                    icon={faImage}
                                    className="text-base"
                                />
                                <input
                                    accept="image/*"
                                    className="hidden"
                                    type="file"
                                    onChange={handelUploadImage}
                                />
                            </label>

                            {/* Emoji */}
                            {/* <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full p-2 text-default-600 transition hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-primary"
                            >
                                <FontAwesomeIcon
                                    icon={faFaceSmile}
                                    className="text-base"
                                />
                            </button> */}
                        </div>

                        {/* Send */}
                        <button
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-sm transition hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-50"
                            onClick={submitComment}
                            disabled={(!textInput && !photoInput) || isPending}
                        >   
                        {
                            isPending ? 
                            <Spinner classNames={{label: "text-white mt-4"}} variant="spinner" /> : 
                            <FontAwesomeIcon
                                icon={faPaperPlane}
                                className="text-sm"
                            />
                        }
                            
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(CommentInput);
