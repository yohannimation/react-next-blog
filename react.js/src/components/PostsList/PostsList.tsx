import type { PostCardListInterface } from "./PostsList.interface";

import PostCard from "../PostCard/PostCard";

import style from "./PostsList.module.scss";

export default function PostsList({ posts }: PostCardListInterface) {
    return (
        <ul className={style.grid}>
            {posts.map((post) => {
                return <PostCard key={post.id} post={post} />
            })}
        </ul>
    )
}