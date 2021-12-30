import './sidebar.css';
import CategoriesLinkComponent from './CategoriesLinkComponent';
import SidebarPostComponent from './SidebarPostComponent';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Sidebar() {
  const [cat, setCats] = useState([]);
  const [post, setPosts] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const resCats = await axios.get('/categories')
      const resPosts = await axios.get('/posts')
      setCats(resCats.data)
      setPosts(resPosts.data)
    }
    getCats()
  }, [])

  return (
    <div className="side-bar">
      <input type="text" name="search" id="search" placeholder="Search" />

      <CategoriesLinkComponent cat={cat} />
      <SidebarPostComponent post={post} />
    </div>
  )
}

export default Sidebar
