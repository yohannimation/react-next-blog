import type { PostCardInterface } from "./PostCard.interface"

export default function PostCard({ post }: PostCardInterface) {
    return (
        <li>
            <h2>{post.id} - {post.title}</h2>
            <p>author : {post.author}</p>
            <p>{post.content}</p>
        </li>
    )
}