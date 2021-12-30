
import './home.css';
import Header from '../../Components/Heroimage/HeroImage';
import Content from '../../Components/Content/home_content/Content';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';

function Home() {
  const [posts, setPosts] = useState([])
  const {search} = useLocation()

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/posts${search}`)
      setPosts(res.data)
    }

    fetchPosts()
  }, [search])

  return (
    <div className="home">
      <Header />
      <div className="container">
        {/* CONTENT HERE */}
        <Content posts={posts}/>
      </div>
    </div>
  );
}

export default Home;