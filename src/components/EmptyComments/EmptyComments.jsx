import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
export default function EmptyComments() {
  return (
    <div className="space-y-2">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark px-4 py-8 text-center">
        <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FontAwesomeIcon icon={faCommentDots} className="text-xl" />
        </div>
        <p className="text-lg font-extrabold text-slate-800 dark:text-slate-100">No comments yet</p>
        <p className="mt-1 text-sm font-medium text-default-600">Be the first to comment.</p>
        </div>
    </div>
  )
}
