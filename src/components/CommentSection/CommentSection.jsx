import React from 'react'
import CommentInput from '../CommentInput/CommentInput'
import EmptyComments from '../EmptyComments/EmptyComments'
import Comment from '../Comment/Comment';

function CommentSection({postId, comments, refetchFn}) {
    console.log(comments);
    
  return (
    <div className="border-t border-slate-200 dark:border-slate-700 bg-background-light dark:bg-background-dark px-4 py-4">
  
        {/* Header */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark px-3 py-2">
            <div className="flex items-center gap-2">
            <p className="text-sm font-extrabold tracking-wide text-slate-700 dark:text-slate-200">Comments</p>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">0</span>
            </div>
            <select className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-slate-900 focus:ring-2">
            <option value="relevant">Most relevant</option>
            <option value="newest">Newest</option>
            </select>
        </div>

        {/* Comment Input */}
        <div className="mb-3">

        <CommentInput postId={postId} refetchFn={refetchFn}/>
        </div>

        {/* Empty State */}
        {comments.length ? comments.map((comment) => <Comment commentData={comment} key={comment._id} />) : <EmptyComments />}
        

        
    </div>   
  )
}

export default React.memo(CommentSection)