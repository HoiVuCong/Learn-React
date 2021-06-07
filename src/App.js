import './App.css';
import React, { useState, useEffect } from 'react';
import PostList from './PostLists';
import Pagination from './Pagination';
function App() {

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRow: 1,
  });
  const [filter, setFilter] = useState({
    _limit:10,
    _page:1,
  });
  function handlePageChange(newPage){
    console.log('new page', newPage);
  }
  useEffect(() => {
    async function fetchPostList() {
      try {
        const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1'
        const response = await fetch(requestUrl);
        const responseJson = await response.json();
        console.log({ responseJson });

        const { data } = responseJson;
        setPostList(data);
      } catch (error) {
        console.log('Faild ', error.message);
      }
    }
    fetchPostList();
  }, [filter]);

  return (
    <div className="App">
      <PostList posts={postList} />
      <Pagination
      pagination={pagination}
      onPageChange={handlePageChange}
      />

    </div>
  );
}



export default App;
