import React, { useState, useRef, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faThumbsUp,
    faComment,
    faShareSquare,
    faBookmark as faNotBooked,
} from "@fortawesome/fontawesome-free-regular";
import {
    faShare,
    faThumbsUp as faThumbsUpSolid,
    faEllipsis,
    faBookmark,
    faPenToSquare,
    faTrashCan,
    faTriangleExclamation,
    faArrowUpRightFromSquare 
} from "@fortawesome/free-solid-svg-icons";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Avatar,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Divider,
    Spinner,
} from "@heroui/react";
import axios from "axios";
import { authObject } from "../../context/TokenContext/TokenContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import CommentSection from "../CommentSection/CommentSection";
import timeAgo from "../../Logic/timeAgo";
import { Link } from "react-router-dom";

export default function AppCard(props) {
    // creating states we might use
    const [isFollowed, setIsFollowed] = useState(false);
    const [commentOpened, setCommentOpened] = useState(false);
    // importing our post prop
    const post = props.post;
    // calcing passed time
    const timePassed = timeAgo(post.createdAt);
    // model funcitons
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // handling text overflow
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const text = useRef(null);
    useEffect(() => {
        if (text.current) {
            setIsOverflowing(
                text.current.scrollHeight > text.current.clientHeight,
            );
        }
    }, [text]);
    // handeling likes
    const [isLiked, setIsLiked] = useState(props.isLiked);
    const [numOfLikes, setNumOfLikes] = useState(post.likesCount);
    // get token
    const { token } = useContext(authObject);
    // the like post function
    const likePostFn = () => {
        setIsLiked(!isLiked);
        return axios.put(
            `https://route-posts.routemisr.com/posts/${post.id}/like`,
            null,
            {
                headers: {
                    AUTHORIZATION: ` Bearer ${token}`,
                },
            },
        );
    };
    // handel the api call with tan stack
    const { isPending, mutate: likePost } = useMutation({
        mutationFn: likePostFn,
        onSuccess: (data) => {
            setNumOfLikes(data.data.data.likesCount);
        },
        onError: (err) => {
            console.log(err);
        },
    });
    // getting comments
    // getting comments function
    const getCommentsPromise = () => {
        setCommentOpened(true);
        return axios.get(
            `https://route-posts.routemisr.com/posts/${post.id}/comments`,
            {
                headers: {
                    Authorization: ` Bearer ${token} `,
                },
            },
        );
    };
    const { data, refetch: getComments } = useQuery({
        queryFn: getCommentsPromise,
        queryKey: ["allComments", post.id],
        enabled: false,
        gcTime: 1000 * 60 * 2,
    });

    // handel control area
    // to open the area
    const [isBoxOpen, setIsBoxOpen] = useState(false);
    // handel book marking
    const [isBooked, setIsBooked] = useState(post.bookmarked);
    const { mutate: bookPost, isPending: bookPending } = useMutation({
        mutationFn: () => {
            return axios.put(
                `https://route-posts.routemisr.com/posts/${post.id}/bookmark`,
                null,
                {
                    headers: {
                        AUTHORIZATION: ` Bearer ${token} `,
                    },
                },
            );
        },
        onSuccess: () => setIsBooked(!isBooked),
    });
    // handel delete
    const { mutate: deletePost } = useMutation({
        mutationFn: () => {
            return axios.delete(
                `https://route-posts.routemisr.com/posts/${post.id}`,
                {
                    headers: {
                        Authorization: ` Bearer ${token} `,
                    },
                },
            );
        },
        onSuccess: props.refetch,
    });
    // delete modal states
    const {
        isOpen: isDeleteOpen,
        onOpen: onDeleteOpen,
        onOpenChange: onDeleteOpenChange,
    } = useDisclosure();
    // handel update
    // create text input state so we can control the input
    const [textInput, setTextInput] = useState(post.body);
    // creat open update input state
    const [updateOpened, setUpdateOpened] = useState(false);
    const {
        isPending: updatePending,
        mutate: updatePostFn,
        isSuccess: updatedSuccess,
    } = useMutation({
        mutationFn: () => {
            const updateForm = new FormData();
            updateForm.append("body", textInput);
            console.log("token", token);
            return axios.put(
                `https://route-posts.routemisr.com/posts/${post.id}`,
                updateForm,
                {
                    headers: {
                        Authorization: ` Bearer ${token} `,
                    },
                },
            );
        },
        onSuccess: () => {
            setUpdateOpened(false);
        },
    });
    // handel share
    // create new disclosure
    const {
        isOpen: isShareOpen,
        onOpen: onShareOpen,
        onOpenChange: onShareOpenChange,
    } = useDisclosure();
    // create state to control share body input
    const [sharedText, setSharedText] = useState("");
    // create share function query
    const { isPending: sharePending, mutate: sharePostFn } = useMutation({
        mutationFn: () => {
            const shareBody = sharedText ? {body : sharedText} : null
            return axios.post(
                `https://route-posts.routemisr.com/posts/${post.id}/share`,
                shareBody,
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
            <Card className="max-w-150">
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src={post.user.photo}
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">
                                {post.user.name}
                            </h4>
                            <div>
                                <span className="text-small tracking-tight text-default-600">
                                    {timePassed} .
                                </span>
                                <span className="ms-1 text-small tracking-tight text-default-400">
                                    {post.privacy}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <Button
                            className={
                                isFollowed
                                    ? "bg-transparent text-foreground border-default-200"
                                    : ""
                            }
                            color="primary"
                            radius="full"
                            size="sm"
                            variant={isFollowed ? "bordered" : "solid"}
                            onPress={() => setIsFollowed(!isFollowed)}
                        >
                            {isFollowed ? "Unfollow" : "Follow"}
                        </Button>
                        {/* control area (delete save, and update) */}

                        <div className="relative">
                            <button
                                onClick={() => setIsBoxOpen(!isBoxOpen)}
                                className="cursor-pointer rounded-full p-1.5 text-default-500 transition hover:bg-default-100 hover:text-default-700"
                            >
                                <FontAwesomeIcon
                                    icon={faEllipsis}
                                    className="h-4.5 w-4.5"
                                />
                            </button>
                            {isBoxOpen && (
                                <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-md border border-default-200 bg-background p-1 shadow-lg">
                                    <button
                                        onClick={bookPost}
                                        className="cursor-pointer flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-default-700 transition hover:bg-default-100"
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                isBooked
                                                    ? faBookmark
                                                    : faNotBooked
                                            }
                                            className="h-3.75 w-3.75 text-default-500"
                                        />
                                        {bookPending
                                            ? "loading"
                                            : isBooked
                                              ? "Unsave Post"
                                              : "Save Post"}
                                    </button>
                                    {props.isUsers && (
                                        <>
                                            {!updateOpened && (
                                                <button
                                                    onClick={() =>
                                                        setUpdateOpened(true)
                                                    }
                                                    className="cursor-pointer flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-default-700 transition hover:bg-default-100"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPenToSquare}
                                                        className="h-3.75 w-3.75 text-default-500"
                                                    />
                                                    Edit post
                                                </button>
                                            )}

                                            <button
                                                onClick={onDeleteOpen}
                                                className="cursor-pointer flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-danger transition hover:bg-danger-50"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrashCan}
                                                    className="h-3.75 w-3.75 text-danger"
                                                />
                                                Delete post
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-600 overflow-hidden">
                    {updateOpened ? (
                        <div className="mt-3">
                            <textarea
                                maxLength={5000}
                                className="min-h-27.5 w-full rounded-md border border-default-300 bg-background px-3 py-2 text-sm text-default-800 outline-none transition placeholder:text-default-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                            />
                            <div className="mt-2 flex items-center justify-end gap-2">
                                <Button
                                    onPress={() => {
                                        setUpdateOpened(false);
                                    }}
                                    variant="bordered"
                                    radius="full"
                                    size="sm"
                                    className="border-default-300 text-xs font-bold text-default-700 hover:bg-default-100"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onPress={updatePostFn}
                                    isDisabled={updatePending}
                                    color="primary"
                                    radius="full"
                                    size="sm"
                                    className={`text-xs font-bold ${updatePending ? "cursor-not-allowed" : "cursor-pointer"}`}
                                >
                                    {updatePending ? "...loading" : <>Save</>}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div
                                className={`overflow-hidden ${isExpanded ? "max-h-none" : "max-h-30"}`}
                                ref={text}
                            >
                                {updatedSuccess ? textInput : post.body}
                            </div>
                            {isOverflowing && (
                                <div
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="text-primary drop-shadow-[0_2px_8px_rgba(168,128,255,0.8)] dark:drop-shadow-[0_2px_8px_rgba(168,128,255,0.5)]"
                                >
                                    {isExpanded ? "show less" : "....show more"}
                                </div>
                            )}
                        </>
                    )}

                    {post.image && (
                        <>
                            <div
                                className="mt-2 w-full bg-background-light dark:bg-background-dark overflow-hidden max-h-90 cursor-pointer hover:opacity-90"
                                onClick={onOpen}
                            >
                                <img
                                    src={post.image}
                                    alt={`${post.user.name} post's photo`}
                                    className="w-full h-full object-contain max-h-90 bloc m-auto rounded-md"
                                />
                            </div>
                        </>
                    )}
                </CardBody>
                {/* shared post area */}
                {post.isShare && (
                    <div className="mx-4 my-3 overflow-hidden rounded-xl border border-default-200 bg-default-50">
                        <div className="p-3">
                            {/* Header */}
                            <div className="mb-2 flex items-center gap-2">
                                <Avatar
                                    src={post.sharedPost.user.photo}
                                    alt={post.sharedPost.user.name}
                                    size="sm"
                                    radius="full"
                                />
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-default-900">
                                        {post.sharedPost.user.name}
                                    </p>
                                    <p className="truncate text-xs text-default-500">
                                        {post.sharedPost.user.username ? `@${post.sharedPost.user.username}` : post.sharedPost.user.name }
                                    </p>
                                </div>
                                <Link  to={`/posts/${post.sharedPost._id}`} onClick={() => window.scrollTo(0,0)}>
                                    <button className="ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-primary transition hover:bg-primary/10">
                                    Original Post
                                    <FontAwesomeIcon
                                        icon={faArrowUpRightFromSquare}
                                        className="h-3 w-3"
                                    />
                                    </button>
                                </Link>
                            </div>

                            {/* Body */}
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-default-800">
                                {post.sharedPost.body}
                            </p>
                        </div>

                        {/* Image */}
                        {post.sharedPost.image && (
                            <div className="border-t border-default-200">
                                <button
                                    type="button"
                                    className="group relative block w-full cursor-zoom-in"
                                >
                                    <img
                                        src={post.sharedPost.image}
                                        alt="Shared post"
                                        className="max-h-140 w-full object-cover"
                                    />
                                    <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                                </button>
                            </div>
                        )}
                    </div>
                )}
                {/* post counts */}
                <CardFooter className="gap-3 justify-between">
                    <div className="flex gap-1 items-center">
                        <p className="font-semibold text-default-400 text-small">
                            <FontAwesomeIcon icon={faThumbsUp} />
                        </p>
                        <p className=" text-default-400 text-small">
                            {numOfLikes} likes
                        </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-xs">
                                <FontAwesomeIcon icon={faShare} />
                            </p>
                            <p className="text-default-400 text-xs">
                                {post.sharesCount || 0} shares
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <p className="text-default-400 text-xs">
                                {post.commentsCount || 0} comments
                            </p>
                        </div>
                    </div>
                </CardFooter>
                <Divider />
                {/* post actions */}
                <CardFooter className="gap-3">
                    <button
                        onClick={likePost}
                        disabled={isPending}
                        className={`flex gap-1 items-center justify-center w-1/3 rounded-md dark:hover:bg-oud-wood/50 hover:bg-desert-sand/20 p-2 ${isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        <p
                            className={`font-semibold ${isLiked ? "text-primary" : "text-default-400"} `}
                        >
                            <FontAwesomeIcon
                                icon={isLiked ? faThumbsUpSolid : faThumbsUp}
                            />
                        </p>
                        <p className=" text-default-400 text-small">like</p>
                    </button>
                    <button
                        onClick={getComments}
                        className="flex gap-1 items-center justify-center w-1/3 rounded-md dark:hover:bg-oud-wood/50 hover:bg-desert-sand/20 p-2 cursor-pointer"
                    >
                        <p className="font-semibold text-default-400">
                            <FontAwesomeIcon icon={faComment} />
                        </p>
                        <p className=" text-default-400 text-small">Comment</p>
                    </button>
                    <button
                        onClick={onShareOpen}
                        className="flex gap-1 items-center justify-center w-1/3 rounded-md dark:hover:bg-oud-wood/50 hover:bg-desert-sand/20 p-2 cursor-pointer"
                    >
                        <p className="font-semibold text-default-400">
                            <FontAwesomeIcon icon={faShareSquare} />
                        </p>
                        <p className=" text-default-400 text-small">Share</p>
                    </button>
                </CardFooter>
                {/* top comment section */}
                {post.topComment && !commentOpened && (
                    <div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-slate-50 dark:bg-background-dark p-3">
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-default-400">
                            Top Comment
                        </p>
                        <div className="flex items-start gap-2">
                            <img
                                alt={post.topComment.commentCreator.name}
                                className="h-8 w-8 rounded-full object-cover"
                                src={post.topComment.commentCreator.photo}
                            />
                            <div className="min-w-0 flex-1 rounded-2xl bg-white dark:bg-oud-wood px-3 py-2">
                                <p className="truncate text-xs font-bold text-default-600">
                                    {post.topComment.commentCreator.name}
                                </p>
                                <p className="mt-0.5 whitespace-pre-wrap text-sm text-default-600">
                                    {post.topComment.content}
                                </p>
                            </div>
                        </div>
                        <button
                            className="mt-2 text-xs font-bold text-primary hover:underline cursor-pointer"
                            onClick={getComments}
                        >
                            View all comments
                        </button>
                    </div>
                )}
                {/* comments sections */}
                {commentOpened && !data && (
                    <Spinner
                        classNames={{ label: "text-foreground mt-4" }}
                        label="Loading"
                        variant="spinner"
                    />
                )}
                {commentOpened && data && (
                    <CommentSection
                        postId={post.id}
                        comments={data.data.data.comments}
                        refetchFn={getComments}
                    />
                )}
            </Card>
            {/* modal for picture */}
            <Modal
                backdrop="opaque"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
                isOpen={isOpen}
                radius="lg"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{`${post.user.name} post's photo`}</ModalHeader>
                            <ModalBody>
                                <img
                                    src={post.image}
                                    alt={`${post.user.name} post's photo`}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="foreground"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button
                                    className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                                    onPress={() =>
                                        window.open(post.image, "_blank")
                                    }
                                >
                                    Open in new tab
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {/* delete modal */}
            <Modal
                isOpen={isDeleteOpen}
                onOpenChange={onDeleteOpenChange}
                radius="lg"
                classNames={{
                    backdrop: "bg-black/60",
                    base: "border border-default-200 bg-background shadow-2xl",
                    header: "border-b border-default-200 px-4 py-3",
                    body: "p-4",
                    footer: "border-t border-default-200 px-4 py-3",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex items-center justify-between">
                                <h4 className="text-base font-extrabold text-default-900">
                                    Confirm action
                                </h4>
                            </ModalHeader>

                            <ModalBody>
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-danger-100 text-danger">
                                        <FontAwesomeIcon
                                            icon={faTriangleExclamation}
                                            className="h-4.5 w-4.5"
                                        />
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-extrabold text-default-900">
                                            Delete this post?
                                        </h5>
                                        <p className="mt-1 text-sm text-default-600">
                                            This post will be permanently
                                            removed from your profile and feed.
                                        </p>
                                    </div>
                                </div>
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    variant="bordered"
                                    radius="md"
                                    onPress={onClose}
                                    className="border-default-300 text-sm font-bold text-default-700 hover:bg-default-100"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="danger"
                                    radius="md"
                                    className="text-sm font-bold"
                                    onPress={() => {
                                        deletePost();
                                        onClose();
                                    }}
                                >
                                    Delete post
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {/* share modal */}
            <Modal
                isOpen={isShareOpen}
                onOpenChange={onShareOpenChange}
                radius="lg"
                classNames={{
                    backdrop: "bg-black/65",
                    base: "border border-default-200 bg-background shadow-2xl",
                    header: "border-b border-default-200 px-4 py-3",
                    body: "space-y-3 p-4",
                    footer: "border-t border-default-200 px-4 py-3",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex items-center justify-between">
                                <h4 className="text-base font-extrabold text-default-900">
                                    Share post
                                </h4>
                            </ModalHeader>

                            <ModalBody>
                                <textarea
                                    value={sharedText}
                                    onChange={(e) =>
                                        setSharedText(e.target.value)
                                    }
                                    placeholder="Say something about this..."
                                    rows={3}
                                    maxLength={500}
                                    className="w-full resize-none rounded-md border border-default-300 bg-background px-3 py-2 text-sm text-default-800 outline-none transition placeholder:text-default-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />

                                <div className="rounded-md border border-default-200 bg-default-50 p-3">
                                    <div className="flex items-center gap-2">
                                        <Avatar
                                            src={post.user.photo}
                                            alt={post.user.name}
                                            size="sm"
                                            radius="full"
                                        />
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-bold text-default-900">
                                                {post.user.name}
                                            </p>
                                            <p className="truncate text-xs font-semibold text-default-500">
                                                @{post.user.name}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-2 whitespace-pre-wrap text-sm text-default-800">
                                        {post.body}
                                    </p>
                                    {post.image && (
                                        <img
                                            alt="post preview"
                                            className="mt-2 max-h-55 w-full rounded-lg object-cover"
                                            src={post.image}
                                        />
                                    )}
                                </div>
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    isDisabled={sharePending}
                                    variant="bordered"
                                    radius="md"
                                    onPress={onClose}
                                    className={`${sharePending ? "cursor-not-allowed" : "cursor-pointer"} border-default-300 text-sm font-bold text-default-700 hover:bg-default-100`}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    isDisabled={sharePending}
                                    onPress={() => {
                                        sharePostFn();
                                        setTimeout(() => {
                                            onClose();
                                        }, 1000);
                                    }}
                                    color="primary"
                                    radius="md"
                                    className={`${sharePending ? "cursor-not-allowed" : "cursor-pointer"} text-sm font-bold`}
                                >
                                    Share now
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
