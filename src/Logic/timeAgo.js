// time passed function to calc time
    export default function timeAgo(isoString) {
        const now = new Date();
        const past = new Date(isoString);
        const diffMs = now - past;
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        if (diffSecs < 60) {
            return "just now";
        } else if (diffMins < 60) {
            return `${diffMins}m ago`;
        } else if (diffHours < 12) {
            return `${diffHours}h ago`;
        } else if (diffHours < 24) {
            const time = past.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
            return `Today at ${time}`;
        } else if (diffDays < 7) {
            const day = past.toLocaleDateString([], { weekday: "long" });
            const time = past.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
            return `${day} at ${time}`;
        } else {
            return past.toLocaleString([], {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        }
    }