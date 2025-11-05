import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useUser } from "../../context/UserContext";

import PostsList from "../../components/PostsList/PostsList";
import Input from "../../components/Input/Input";

import type { PostInterface } from "../../interface/post.interface";

import style from "./Home.module.scss";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";

export default function Home() {
    const { user } = useUser();

    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [loading, setLoading] = useState<boolean>(false);
    const [posts, setPosts] = useState<PostInterface[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);

            let url = "https://blog-app.yohannimation.fr/api/posts";

            try {
                const searchValue = searchParams.get("search");
                url = searchValue ? `${url}?search=${encodeURIComponent(searchValue)}` : url;

                const res = await fetch(url, {
                    headers: user
                        ? { Authorization: `Bearer ${user.token}` }
                        : undefined,
                });

                if (!res.ok) throw new Error("Erreur lors du chargement des posts");

                const data: PostInterface[] = await res.json();

                setPosts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [searchParams, user]);

    const handleSearch = () => {
        setSearchParams({ search });
    };

    return (
        <>
            <div className={style.header}>
                <h1>Posts</h1>
                <div className={style.headerSearch}>
                    <Input
                        id="search"
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button type="button" variant="button" action={handleSearch} size="m">
                        Search
                    </Button>
                </div>
            </div>

            {loading ? <Loader /> : <PostsList posts={posts} user={user} />}
        </>
    );
}
