import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import PostsList from "../../components/PostsList/PostsList";
import Input from "../../components/Input/Input";

import type { PostInterface } from "../../interface/post.interface";

import style from "./Home.module.scss"
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";

export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("searchValue") || "")
    const [loading, setLoading] = useState<boolean>(false)
    const [posts, setPosts] = useState<PostInterface[]>([]);

    useEffect(() => {
        setLoading(true)
        
        setPosts([
            { id: 1, title: "titre 1", content: "content1", private: true, author: 1 },
            { id: 2, title: "titre 2", content: "content2", private: false, author: 1 },
            { id: 3, title: "titre 3", content: "content3", private: true, author: 2 },
            { id: 4, title: "titre 3", content: "content3", private: false, author: 2 },
        ])

        setLoading(false)
    }, [searchParams])

    const handleSearch = () => {
        setSearchParams({ searchValue: search });
    }

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
                    <Button type="button" variant="button" action={handleSearch} size="m">Search</Button>
                </div>
            </div>
            {
                loading ? (
                    <Loader />
                ) : (
                    <PostsList posts={posts} />
                )
            }
        </>
    )
}