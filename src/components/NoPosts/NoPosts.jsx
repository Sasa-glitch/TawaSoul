import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

export default function NoPosts() {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-[#f6f8f8] p-10 text-center dark:border-white/10 dark:bg-[#112121]">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FontAwesomeIcon icon={faNewspaper} className="text-2xl" />
            </span>
            <h3 className="mt-4 text-base font-extrabold text-default-900">
                No posts yet
            </h3>
            <p className="mt-1 text-sm text-default-500">
                When posts are shared here, they'll show up in this feed.
            </p>
        </div>
    );
}
