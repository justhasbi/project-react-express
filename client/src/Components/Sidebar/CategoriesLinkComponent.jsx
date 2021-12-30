import { Link } from "react-router-dom"

const CategoriesLinkComponent = ({ cat }) => {
  return (
    <div className="blog-categories">
      <h3 className="category-title heading">Categories</h3>
      <ul className="categories-link">
        <Link to='/'>
          <li>All</li>
        </Link>
        {cat.map(c => (
          <div key={c._id}>
            <hr />
            <Link to={`/?cat=${c.name}`}>
              <li>{c.name}</li>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default CategoriesLinkComponent