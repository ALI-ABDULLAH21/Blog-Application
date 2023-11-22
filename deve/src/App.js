import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function App() {
  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem('postList') || '[]'));


  
  
  const setandsavepost=(postss)=>{
    
    setPosts(postss)

  }
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  useEffect(() => {
/*    const filteredResults= JSON.parse(localStorage.getItem('postsList'));
   
  },[]) */
  localStorage.setItem('postList',JSON.stringify(posts))
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));
      setSearchResults(filteredResults.reverse());

    
  }, [posts, search])

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setandsavepost(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/'); // Use navigate to replace history.push
  }

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setandsavepost(postsList);
    navigate('/'); // Use navigate to replace history.push
  }

  return (
    <div className="App">
      <Header title="Blog Application"/>
      <Nav setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route path="/post" element={
          <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />
        } />
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>

      
    </div>
  );
}

export default App;
