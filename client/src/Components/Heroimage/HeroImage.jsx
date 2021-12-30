import './heroimage.css';
import heroImg from '../../img/heroimg.jpg';
import { Link } from 'react-router-dom';

function HeroImage() {
  return (
    <div className="header">
      <div className="header-img-container">
        <img className="header-img" src={heroImg} alt="heroImage" />
      </div>

      <div className="header-overlay"></div>

      <div className="header-titles-container">
        <span className="header-text">
          <p className="header-heading-text">Reaction to your<br /> feelings today</p>
          <p className="header-body-text">Write your diary in a fun way</p>
          <Link to="/create">
            <button className="btn-header">Get Started</button>
          </Link>
        </span>
      </div>
    </div>
  );
}

export default HeroImage;
