import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGears,
    faHouse,
    faArrowLeft,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function UnderProcess() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center p-6">
            <div className="w-full max-w-md text-center">
                {/* Icon */}
                <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                    <div className="absolute inset-0 animate-ping rounded-full bg-secondary/20" />
                    <span className="relative inline-flex h-24 w-24 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                        <FontAwesomeIcon
                            icon={faGears}
                            className="text-4xl animate-spin"
                            style={{ animationDuration: "3s" }}
                        />
                    </span>
                </div>

                {/* Badge */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1 text-xs font-bold text-warning">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                    Work in progress
                </span>

                {/* Text */}
                <h2 className="mt-4 text-3xl font-extrabold text-default-900">
                    Under Construction
                </h2>
                <p className="mt-3 text-default-500 leading-relaxed">
                    We're working hard to bring this page to life. It's not
                    ready just yet — but it will be worth the wait!
                </p>

                {/* Divider */}
                <div className="my-6 border-t border-slate-200 dark:border-white/10" />

                {/* Links */}
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary/80"
                    >
                        <FontAwesomeIcon icon={faHouse} />
                        Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-default-700 transition hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/5"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
