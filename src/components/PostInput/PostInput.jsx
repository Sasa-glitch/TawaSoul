import React, { useContext, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Avatar,
    Button,
} from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEarthAmericas,
    faImage,
    faX,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { authObject } from "../../context/TokenContext/TokenContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function PostInput({refetch}) {
    // get user input
    const { user, token } = useContext(authObject);

    // create states so we can append data to form data object
    const [textInput, setTextInput] = useState("");
    const [photoInput, setPhotoInput] = useState(null);
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
    };

    // create submit for button
    const submitPostPromise = () => {
        // create form input object
        const postData = new FormData();
        // append data to form data object
        textInput && postData.append("body", textInput);
        photoInput && postData.append("image", photoInput);
        console.log(Object.fromEntries(postData));
        return axios.post(
            `https://route-posts.routemisr.com/posts`,
            postData,
            {
                headers: {
                    Authorization: ` Bearer ${token}`,
                },
            },
        );
    };
    const { isPending, mutate: submitComment } = useMutation({
        mutationFn: submitPostPromise,
        onSuccess: (res) => {
            console.log(res);
            setTextInput("");
            setPhotoInput(null);
            setPhotoPreivew(null);
            refetch();
        },
        onError: (e) => {
            console.error(e);
            console.log("token", token);
        },
    });
    return (
        <Card className="w-full shadow-sm">
            <CardHeader className="pb-0">
                <div className="flex w-full items-start gap-3">
                    <Avatar
                        src={user.photo}
                        alt={user.name}
                        size="lg"
                        radius="full"
                        isBordered
                        color="primary"
                    />
                    <div className="flex-1">
                        <p className="text-base font-extrabold text-default-900">
                            {user.name}
                        </p>
                        <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-default-100 px-2 py-0.5">
                            <FontAwesomeIcon
                                icon={faEarthAmericas}
                                className="h-3 w-3 text-default-500"
                            />
                            <select className="bg-transparent text-xs font-semibold text-default-600 outline-none cursor-pointer">
                                <option value="public">Public</option>
                                <option value="following">Followers</option>
                                <option value="only_me">Only me</option>
                            </select>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardBody className="py-3">
                <textarea
                    rows={4}
                    placeholder="What's on your mind, jipyrikycy?"
                    className="w-full rounded-2xl border border-default-200 bg-default-100 px-4 py-3 text-[17px] leading-relaxed text-default-800 outline-none transition placeholder:text-default-400 focus:border-primary focus:bg-background"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                />
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
            </CardBody>

            <CardFooter className="flex flex-wrap items-center justify-between gap-2 border-t border-default-200 pt-3">
                <div className="flex items-center gap-1">
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-default-600 transition hover:bg-default-100">
                        <FontAwesomeIcon
                            icon={faImage}
                            className="h-[18px] w-[18px] text-emerald-500"
                        />
                        <span className="hidden sm:inline">Photo</span>
                        <input
                            accept="image/*"
                            className="hidden"
                            type="file"
                            onChange={handelUploadImage}
                        />
                    </label>
                </div>

                <Button
                    isDisabled={(!textInput && !photoInput) || isPending}
                    color="primary"
                    radius="lg"
                    size="sm"
                    className="px-5 text-sm font-extrabold"
                    onPress={submitComment}
                    endContent={
                        <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="h-3.5 w-3.5"
                        />
                    }
                >
                    Post
                </Button>
            </CardFooter>
        </Card>
    );
}
