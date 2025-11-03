import type { PostCardListInterface } from "./PostCardList.interface";

import PostCard from "../PostCard/PostCard";

export default function PostCardList({ posts }: PostCardListInterface) {
    return (
        <ul>
            {posts.map((post) => {
                return <PostCard key={post.id} post={post} />
            })}
        </ul>
    )
}