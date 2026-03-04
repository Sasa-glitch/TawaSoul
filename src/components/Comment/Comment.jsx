import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsis,
    faPenToSquare,
    faTrashCan,
    faTriangleExclamation,
    faX,
} from "@fortawesome/free-solid-svg-icons";
import timeAgo from "../../Logic/timeAgo";
import { authObject } from "../../context/TokenContext/TokenContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Spinner } from "@heroui/react";

export default function Comment({ commentData, refetchFn }) {
    console.log("comment data", commentData);
    // update comment
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [modelOpen, setModelOpen] = useState(false);
    const [commentUpdateInput, setCommentUpdateInput] = useState("");
    const {
        token,
        user: { _id: user_id },
    } = useContext(authObject);
    const { isPending: updatingComment, mutate: updateComment } = useMutation({
        mutationFn: () => {
            const commetnUpdataForm = new FormData();
            commetnUpdataForm.append("content", commentUpdateInput);
            return axios.put(
                `https://route-posts.routemisr.com/posts/${commentData.post}/comments/${commentData._id}`,
                commetnUpdataForm,
                {
                    headers: {
                        Authorization: ` Bearer ${token} `,
                    },
                },
            );
        },
        onSuccess: () => {
            setModelOpen(false);
            refetchFn();
        },
    });
    // delete comment
    const [deleteModelOpen, setDeleteModelOpen] = useState(false);
    const { isPending: deleting, mutate: deleteComment } = useMutation({
        mutationFn: () => {
            return axios.delete(
                `https://route-posts.routemisr.com/posts/${commentData.post}/comments/${commentData._id}`,
                {
                    headers: {
                        Authorization: ` Bearer ${token} `,
                    },
                },
            );
        },
        onSuccess: () => {
            setDeleteModelOpen(false);
            refetchFn();
        },
    });
    return (
        <>
            <div className="relative flex items-start gap-2">
                <img
                    alt={commentData.commentCreator.name}
                    className="mt-0.5 h-8 w-8 rounded-full object-cover"
                    src={commentData.commentCreator.photo}
                />
                <div className="min-w-0 flex-1">
                    <div className="relative inline-block max-w-full rounded-2xl bg-default-100 px-3 py-2">
                        {/* comment header */}
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="text-xs font-bold text-default-900">
                                    {commentData.commentCreator.name}
                                </p>
                                <p className="text-xs text-default-500">
                                    {commentData.commentCreator.username
                                        ? `@${commentData.commentCreator.username}`
                                        : commentData.commentCreator.name}
                                </p>
                            </div>
                        </div>
                        {/* content area */}
                        <p className="mt-1 whitespace-pre-wrap text-sm text-default-800">
                            {modelOpen ? (
                                <div className="mt-2 flex items-center gap-2">
                                    <input
                                        value={commentUpdateInput}
                                        onChange={(e) =>
                                            setCommentUpdateInput(
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-default-800 outline-none transition focus:border-primary dark:border-white/10 dark:bg-white/5"
                                    />
                                    <button
                                        disabled={updatingComment}
                                        onClick={updateComment}
                                        className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-white transition hover:bg-primary/80 disabled:opacity-60"
                                    >
                                        {updatingComment ? (
                                            <Spinner
                                                classNames={{
                                                    circle1: "border-b-white",
                                                    circle2: "border-b-white",
                                                }}
                                                variant="spinner"
                                            />
                                        ) : (
                                            "Save"
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setModelOpen(false)}
                                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-default-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {commentData.content}
                                    {commentData.image && (
                                        <img
                                            src={commentData.image}
                                            className="mt-2 max-h-52 w-full rounded-lg object-cover"
                                            alt={`${commentData.commentCreator.name}'s comment image`}
                                        />
                                    )}
                                </>
                            )}
                        </p>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between px-1">
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-semibold text-default-400">
                                {timeAgo(commentData.createdAt)}
                            </span>
                            <button className="text-xs font-semibold hover:underline disabled:opacity-60 text-default-600">
                                Like ({commentData.likes.length})
                            </button>
                            <button className="text-xs font-semibold transition hover:underline disabled:opacity-60 text-default-600 hover:text-primary">
                                Reply ({commentData.repliesCount})
                            </button>
                        </div>
                        {user_id === commentData.commentCreator._id && (
                            <div
                                className="relative"
                                data-comment-menu-root="true"
                            >
                                <button
                                    onClick={() => setOptionsOpen(!optionsOpen)}
                                    className="cursor-pointer rounded-full p-1 text-default-500 transition hover:bg-default-100 hover:text-default-700"
                                >
                                    <FontAwesomeIcon
                                        icon={faEllipsis}
                                        className="w-4 h-4"
                                    />
                                </button>
                                {optionsOpen && (
                                    <div className="absolute right-10 bottom-0 z-20 mt-1 w-32 overflow-hidden rounded-lg border border-slate-200 bg-background-light py-1 shadow-lg dark:border-white/10 dark:bg-background-dark">
                                        <button
                                            onClick={() => {
                                                setModelOpen(true);
                                                setOptionsOpen(false);
                                            }}
                                            className="cursor-pointer flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs font-semibold text-default-700 transition hover:bg-slate-100 dark:hover:bg-white/5"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPenToSquare}
                                                className="text-default-500"
                                            />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                setDeleteModelOpen(true)
                                            }
                                            className="cursor-pointer flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs font-semibold text-danger transition hover:bg-danger-50 dark:hover:bg-danger/10"
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrashCan}
                                                className="text-danger"
                                            />
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {deleteModelOpen && (
                <DeleteModal
                    cancelFn={() => setDeleteModelOpen(false)}
                    deleteFn={deleteComment}
                    loading={deleting}
                />
            )}
        </>
    );
}

function DeleteModal({ cancelFn, deleteFn, loading }) {
    return (
        <div
            onClick={(e) =>
                !e.target.closest('[data-info="model-body"]') && cancelFn
            }
            className="fixed inset-0 z-90 flex items-center justify-center bg-slate-900/60 p-4"
        >
            <div
                data-info="model-body"
                className="w-full max-w-130 overflow-hidden rounded-2xl border border-slate-200 bg-background-light shadow-2xl dark:border-white/10 dark:bg-background-dark"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-white/10">
                    <h4 className="text-base font-extrabold text-default-900">
                        Confirm action
                    </h4>
                    <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-default-500 transition hover:bg-slate-100 hover:text-default-700 dark:hover:bg-white/5"
                    >
                        <FontAwesomeIcon icon={faX} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex items-start gap-3 p-4">
                    <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-danger-100 text-danger dark:bg-danger/10">
                        <FontAwesomeIcon icon={faTriangleExclamation} />
                    </div>
                    <div>
                        <h5 className="text-sm font-extrabold text-default-900">
                            Delete this comment?
                        </h5>
                        <p className="mt-1 text-sm text-default-600">
                            This comment will be permanently removed.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3 dark:border-white/10">
                    <button
                        onClick={cancelFn}
                        type="button"
                        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-default-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:hover:bg-white/5"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={loading}
                        onClick={deleteFn}
                        type="button"
                        className="rounded-lg bg-danger px-4 py-2 text-sm font-bold text-white transition hover:bg-danger/80 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? (
                            <Spinner
                                classNames={{
                                    circle1: "border-b-white",
                                    circle2: "border-b-white",
                                }}
                                variant="spinner"
                            />
                        ) : (
                            "Delete comment"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
