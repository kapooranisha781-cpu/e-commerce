import { Link } from "react-router-dom";
import "../../style/Home.css";

function Home() {
  const latestProducts = [
    {
      id: 1,
      name: "MacBook Pro",
      price: "$1499",
      image:
        "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=600",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: "$199",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    },
    {
      id: 3,
      name: "Smart Watch",
      price: "$299",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    },
    {
      id: 4,
      name: "iPhone",
      price: "$999",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    },
  ];

  const categories = [
    "Laptops",
    "Phones",
    "Watches",
    "Headphones",
    "Gaming",
    "Accessories",
  ];

  return (
    <div className="home">

      {/* ================= HERO SECTION ================= */}

      <section className="hero">

        {/* Left Side */}

        <div className="hero-left">

          <span className="tag">
            🔥 New Collection 2026
          </span>

          <h1>
            Discover Premium <br />
            Electronics For <br />
            Modern Living
          </h1>

          <p>
            Shop the newest smartphones, laptops, headphones,
            smartwatches and gaming accessories from the world's
            leading brands at the best prices.
          </p>

          {/* Buttons */}

          <div className="hero-buttons">

            <Link to="/products" className="shop-btn">
              Shop Now
            </Link>

            <Link to="/products" className="explore-btn">
              Explore Collection
            </Link>

          </div>

          {/* Statistics */}

          <div className="hero-stats">

            <div className="stat-box">
              <h2>20K+</h2>
              <p>Happy Customers</p>
            </div>

            <div className="stat-box">
              <h2>500+</h2>
              <p>Premium Products</p>
            </div>

            <div className="stat-box">
              <h2>4.9★</h2>
              <p>Customer Rating</p>
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="hero-right">

          {/* Main Image */}

          <div className="main-image">
            <img
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=900"
              alt="Laptop"
            />

          </div>

          {/* Card 1 */}

          <div className="floating-product top-card">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300"
              alt="iPhone" />
            <div>
              <h4>iPhone 16 Pro</h4>
              <p>₹79,999</p>
            </div>
          </div>

          {/* Card 2 */}

          <div className="floating-product bottom-card">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300"
              alt="Headphones" />
            <div>
              <h4>AirPods Max</h4>
              <p>30% OFF</p>
            </div>
          </div>

          {/* Card 3 */}

          <div className="floating-product middle-card">

            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300"
              alt="Watch"/>
            <div>
              <h4>Apple Watch</h4>
              <p>₹34,999</p>
            </div>
          </div>

          {/* Discount Circle */}

          <div className="discount-circle">
            <h2>50%</h2>
            <span>OFF</span>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}

      <section className="categories">

        <div className="section-title">
          <h2>Shop By Category</h2>
        </div>

        <div className="category-grid">

          {categories.map((cat, index) => (

            <div
              className="category-card"
              key={index}
            >
              {cat}
            </div>

          ))}

        </div>

      </section>


      {/* ================= OFFER BANNER ================= */}

      <section className="offer-banner">
        <div className="offer-content">
          <span>LIMITED TIME OFFER</span>
          <h2>
            Summer Tech Sale
          </h2>

          <p>
            Save up to 50% on premium gadgets and accessories.
            Hurry, offer ends soon!
          </p>

          <Link to="/products" className="offer-btn">
            Shop Now
          </Link>
        </div>
      </section>


      {/* ================= FEATURED COLLECTION ================= */}

      <section className="home-featured">

        <div className="home-section-header">
          <div>
            <span className="home-small-title">
              FEATURED COLLECTION
            </span>
            <h2>Fashion & Technology</h2>
          </div>
          <Link to="/products">View All →</Link>
        </div>
        <div className="home-featured-grid">

          {/* Large Card */}

          <div className="home-featured-card home-large">
            <img
              src="https://m.media-amazon.com/images/I/61Nsqbn8i7L._AC_SL3840_.jpg"
              alt="Phones" />

            <div className="home-overlay">
              <h3>Premium Smartphones</h3>
              <p>Starting from ₹24,999</p>
              <Link to="/products">Shop Now</Link>
            </div>

          </div>

          {/* Card 2 */}

          <div className="home-featured-card">
            <img
              src="https://i.pinimg.com/1200x/fe/f7/b3/fef7b3cbaeb59afc974ab04dd20741e6.jpg"
              alt="Laptop" />

            <div className="home-overlay">
              <h3>Latest Laptops</h3>
              <Link to="/products">Explore</Link>
            </div>
          </div>

          {/* Card 3 */}

          <div className="home-featured-card">

            <img
              src="https://i.pinimg.com/736x/fd/00/73/fd0073a1daf78c67ced1c6d0108c3d23.jpg"
              alt="Headphones"
            />

            <div className="home-overlay">
              <h3>Women Collection</h3>
              <Link to="/products">Shop</Link>
            </div>

          </div>

        </div>

      </section>
      {/* ================= WHY CHOOSE US ================= */}

      <section className="why">

        <div className="section-title">
          <h2>Why Choose Nexus?</h2>
        </div>

        <div className="why-grid">

          <div className="why-card">
            🚚
            <h3>Fast Delivery</h3>
            <p>Quick shipping across India.</p>
          </div>

          <div className="why-card">
            🔒
            <h3>Secure Payment</h3>
            <p>100% safe online transactions.</p>
          </div>

          <div className="why-card">
            💯
            <h3>Original Products</h3>
            <p>Only authentic branded gadgets.</p>
          </div>

          <div className="why-card">
            📞
            <h3>24/7 Support</h3>
            <p>Friendly customer service anytime.</p>
          </div>

        </div>

      </section>

      {/* ================= NEWSLETTER ================= */}

      <section className="newsletter">
        <h2>Stay Updated</h2>

        <p>
          Subscribe to receive exclusive offers, new arrivals, and fashion trends
          directly in your inbox.
        </p>

        <div className="newsletter-box">
          <input
            type="email"
            placeholder="Enter your email address"
          />

          <button>Subscribe</button>
        </div>
      </section>

    </div>
  );
}

export default Home;