import Button from "../Button/Button";
import type { PostCardInterface } from "./PostCard.interface";
import { useUser } from "../../context/UserContext";

import style from "./PostCard.module.scss";

export default function PostCard({ post }: PostCardInterface) {
    const { user } = useUser();

    const canViewPrivate = post.private ? !!user : true;

    return (
        <li className={style.card}>
            <h2>{post.title}</h2>
            <p>
                More about{" "}
                <Button type="link" variant="link" href={post.title}>
                    {post.author}
                </Button>
            </p>
            <p>
                {post.private && !canViewPrivate
                    ? "This post is private. Please login to view."
                    : post.content}
            </p>
        </li>
    );
}
