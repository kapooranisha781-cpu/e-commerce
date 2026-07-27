import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import "../style/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}

        <div className="footer-box brand">

          <h2>
            <span>Nexus</span>Store
          </h2>

          <p>
            Discover premium electronics, smartphones,
            laptops, gaming accessories and smart gadgets
            at unbeatable prices.
          </p>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        {/* Quick Links */}

        <div className="footer-box">

          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>

        </div>

        {/* Categories */}

        <div className="footer-box">

          <h3>Categories</h3>
          <a href="#">Smartphones</a>
          <a href="#">Laptops</a>
          <a href="#">Headphones</a>
          <a href="#">Gaming</a>
          <a href="#">Accessories</a>
        </div>

        {/* Support */}

        <div className="footer-box">
          <h3>Support</h3>
          <a href="#">Help Center</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Shipping Policy</a>
          <a href="#">Contact Us</a>
        </div>
        </div>

      <div className="footer-bottom">
        <p>
          © 2026 NexusStore. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
export default Footer;