import SidebarPostLinkComponent from "./SidebarPostLinkComponent"

const SidebarPostComponent = ({ post }) => {
  return (
    <div className="top-posts">
      <h3 className="top-post-title heading">Top Post</h3>
      {post.slice(0, 5).map((p,i) => (
        <SidebarPostLinkComponent key={p._id} post={p} num={i}/>
      ))}
    </div>
  )
}
export default SidebarPostComponent