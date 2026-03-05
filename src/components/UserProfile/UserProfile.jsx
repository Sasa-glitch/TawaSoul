// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faUserPlus } from "@fortawesome/free-solid-svg-icons";
// import { Navigate, useNavigate, useParams } from "react-router-dom";

// export default function UserProfile({ name, username, photo, posts = [] }) {
//     const navigate = useNavigate();
//     const {userId} = useParams();
//     const {
//         token,
//     } = useContext(authObject);
//     const getUserProfile = () => {
//         return axios.get(
//             "https://route-posts.routemisr.com/users/profile-data",
//             {
//                 headers: {
//                     Authorization: ` Bearer ${token} `,
//                 },
//             },
//         );
//     };
//     const { data, isPending, isSuccess, isError, error } = useQuery({
//         queryKey: ["Users Profile"],
//         queryFn: getUserProfile,
//     });
//     if (isPending) {
//         return <p>Loading</p>;
//     }
//     if (isError) {
//         console.error(error);

//         return <Navigate to="/NotFound" />
//     }
//     if (isSuccess) {
//         console.log(data);
//         const user = data.data.data.user;
//         console.log("user from api", user);
//         return (
//             <div className="space-y-4">
//                 {/* Back button */}
//                 <button
//                     onClick={() => navigate(-1)}
//                     className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-background-light px-3 py-2 text-sm font-bold text-default-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-background-dark dark:hover:bg-white/5"
//                 >
//                     <FontAwesomeIcon icon={faArrowLeft} />
//                     Back
//                 </button>

//                 {/* Profile card */}
//                 <section className="overflow-hidden rounded-2xl border border-slate-200 bg-background-light shadow-sm dark:border-white/10 dark:bg-background-dark">
//                     {/* Cover */}
//                     <div className="h-48 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)]" />

//                     {/* Profile info */}
//                     <div className="relative -mt-14 px-3 pb-5 sm:px-5">
//                         <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-white/70 bg-white/95 p-4 dark:border-white/10 dark:bg-background-dark/95">
//                             <div className="flex items-end gap-3">
//                                 <img
//                                     alt={name}
//                                     className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-sm dark:border-white/20 sm:h-24 sm:w-24"
//                                     src={photo}
//                                 />
//                                 <div>
//                                     <p className="text-xl font-black text-default-900 sm:text-2xl">
//                                         {name}
//                                     </p>
//                                     <p className="text-sm font-semibold text-default-500 sm:text-base">
//                                         @{username}
//                                     </p>
//                                 </div>
//                             </div>
//                             <button
//                                 type="button"
//                                 className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-extrabold text-white transition hover:bg-primary/80 sm:w-auto"
//                             >
//                                 <FontAwesomeIcon icon={faUserPlus} />
//                                 Follow
//                             </button>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Posts */}
//                 <section className="space-y-3">
//                     {posts.length === 0 ? (
//                         <div className="rounded-2xl border border-slate-200 bg-[#f6f8f8] p-5 text-center text-sm text-default-500 dark:border-white/10 dark:bg-[#112121]">
//                             No posts yet.
//                         </div>
//                     ) : (
//                         posts.map((post) => (
//                             <div key={post._id}>
//                                 {/* render your AppCard here */}
//                             </div>
//                         ))
//                     )}
//                 </section>
//             </div>
//         );
//     }
// }
