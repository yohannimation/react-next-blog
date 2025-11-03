import { useMemo } from 'react';

import './App.css'

import PostCardList from './components/PostCardList/PostCardList'
import PostForm from './components/PostForm/PostForm';

function App() {
  const cardList = useMemo(() => [
    { title: "titre 1", content: "content1" },
    { title: "titre 2", content: "content2" },
    { title: "titre 3", content: "content3" },
  ], []);

  return (
    <>
      <PostCardList cardList={cardList} />
      <PostForm title='title test' content='content test' />
    </>
  )
}

export default App
