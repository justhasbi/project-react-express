import Sidebar from '../../Sidebar/Sidebar';
import BlogPostContent from './BlogPostContent';
import './content.css';

function Content({ posts }) {
  return (
    <div className="content">
      <div className="content-container">
        <Sidebar />
        <BlogPostContent posts={posts} />
      </div>
    </div>
  );
}

export default Content;
