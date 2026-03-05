import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background-light p-6 dark:bg-background-dark">
            <div className="text-center">
                <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <FontAwesomeIcon
                        icon={faCircleExclamation}
                        className="text-4xl"
                    />
                </span>

                <h1 className="mt-6 text-8xl font-extrabold text-primary">
                    404
                </h1>
                <h2 className="mt-2 text-2xl font-extrabold text-default-900">
                    Page not found
                </h2>
                <p className="mt-2 text-default-500">
                    Oops! The page you're looking for doesn't exist or has been
                    moved.
                </p>

                <Link
                    to="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary/80"
                >
                    <FontAwesomeIcon icon={faHouse} />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
