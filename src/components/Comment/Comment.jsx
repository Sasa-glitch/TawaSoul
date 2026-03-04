import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import timeAgo from "../../Logic/timeAgo";

export default function Comment({commentData}) {
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
                    <div className="flex items-start justify-between gap-2">
                        <div>
                        <p className="text-xs font-bold text-default-900">
                            {commentData.commentCreator.name}
                        </p>
                        <p className="text-xs text-default-500">
                            {commentData.commentCreator.username ? `@${commentData.commentCreator.username}` : commentData.commentCreator.name}
                        </p>
                        </div>
                    </div>
                    <p className="mt-1 whitespace-pre-wrap text-sm text-default-800">
                        {commentData.content}
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
                    <div className="relative" data-comment-menu-root="true">
                        <button className="rounded-full p-1 text-default-500 transition hover:bg-default-100 hover:text-default-700">
                        <FontAwesomeIcon icon={faEllipsis} className="w-4 h-4" />
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}
