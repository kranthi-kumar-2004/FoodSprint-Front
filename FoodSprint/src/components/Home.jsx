
import { useState, useEffect } from "react";
import "./Home.css";

function Home() {

  const [location, setLocation] = useState("Detecting...");
  const [search, setSearch] = useState("");
  const [veg, setVeg] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const restaurants = [
    {
      id: 1,
      name: "Mehfil",
      price: 199,
      rating: 4.3,
      time: "30-40 min",
      type: "Non-Veg",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=700"
    },
    {
      id: 2,
      name: "Paradise Biryani",
      price: 249,
      rating: 4.5,
      time: "25-35 min",
      type: "Non-Veg",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=700"
    },
    {
      id: 3,
      name: "Green Bawarchi",
      price: 149,
      rating: 4.1,
      time: "20-30 min",
      type: "Veg",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700"
    },
    {
      id: 4,
      name: "Pista House",
      price: 199,
      rating: 4.4,
      time: "30-40 min",
      type: "Non-Veg",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700"
    },
    {
      id: 5,
      name: "Udupi Grand",
      price: 99,
      rating: 4.0,
      time: "20-25 min",
      type: "Veg",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=700"
    },
    {
      id: 6,
      name: "Spicy Kitchen",
      price: 179,
      rating: 4.2,
      time: "25-35 min",
      type: "Non-Veg",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=700"
    }
  ];

  // AUTOMATIC LOCATION

  useEffect(() => {

    if (!navigator.geolocation) {
      setLocation("Location unavailable");
      return;
    }

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const { latitude, longitude } = position.coords;

        try {

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=en`
          );

          if (!response.ok) {
            throw new Error("Location lookup failed");
          }

          const data = await response.json();
          const address = data.address || {};

          const area =
            address.suburb ||
            address.neighbourhood ||
            address.residential ||
            address.city_district ||
            address.town ||
            address.city ||
            address.village ||
            "Location detected";

          const city =
            address.city ||
            address.town ||
            address.county ||
            "";

          setLocation(
            city && city.toLowerCase() !== area.toLowerCase()
              ? `${area}, ${city}`
              : area
          );

        } catch (error) {

          console.log(error);
          setLocation("Location detected");

        }

      },

      () => setLocation("Enable location permission"),

      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000
      }

    );

  }, []);


  // SEARCH AND VEG FILTER

  const filteredRestaurants = restaurants.filter((rest) => {

    const matchSearch = rest.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchVeg = !veg || rest.type === "Veg";

    return matchSearch && matchVeg;

  });


  return (

    <div className="food-app">

      <div className="main-container">

        {/* NAVBAR */}

        <header className="navbar">

          <div className="brand">

            <h2>FoodSprint <span>🍔</span></h2>

            <p>GOOD FOOD. GOOD MOOD.</p>

          </div>


          <div className="nav-location">

            <span className="location-icon">📍</span>

            <div>
              <small>DELIVER TO</small>
              <strong>{location}</strong>
            </div>

          </div>


          <div className="profile-container">

            <button
              className="profile-button"
              onClick={() => setShowProfile(!showProfile)}
              aria-label="Open profile"
            >

              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Profile"
              />

              <span>⌄</span>

            </button>


            {showProfile && (

              <div className="profile-dropdown">

                <div className="profile-details">

                  <img
                    src="https://i.pravatar.cc/100?img=12"
                    alt="User"
                  />

                  <div>
                    <h3>Prabhas</h3>
                    <p>prabhas@gmail.com</p>
                  </div>

                </div>

                <hr />

                <button onClick={() => alert("My Profile")}>
                  👤 My Profile
                </button>

                <button onClick={() => alert("Past Orders")}>
                  📦 Past Orders
                </button>

                <button onClick={() => alert("My Addresses")}>
                  📍 My Addresses
                </button>

                <button onClick={() => alert("Settings")}>
                  ⚙️ Settings
                </button>

                <button onClick={() => alert("Help & Support")}>
                  ❓ Help & Support
                </button>

                <hr />

                <button
                  className="logout"
                  onClick={() => alert("Logout clicked")}
                >
                  🚪 Logout
                </button>

              </div>

            )}

          </div>

        </header>


        {/* HERO SECTION */}

        <section className="hero">

          <div className="hero-content">

            <span className="hero-tag">
              HUNGRY? WE'RE HERE!
            </span>

            <h1>
              Cravings don't wait.
              <br />
              <span>Order happiness today.</span>
            </h1>

            <p>
              Discover delicious food from the best
              restaurants around you.
            </p>


            {/* SEARCH */}

            <div className="search-area">

              <div className="search-input">

                <span>🔍</span>

                <input
                  type="text"
                  placeholder="Search food or restaurants..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

              </div>


              {/* VEG TOGGLE */}

              <div className="veg-control">

                <span>🟢 Veg Only</span>

                <button
                  className={`toggle ${veg ? "active" : ""}`}
                  onClick={() => setVeg(!veg)}
                  aria-label="Toggle veg only"
                  aria-pressed={veg}
                >
                  <span></span>
                </button>

              </div>

            </div>


            <div className="hero-description">
              Delicious food delivered to your doorstep.
              Explore the best restaurants near you.
            </div>

          </div>

          <div className="hero-image">

            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900"
              alt="Delicious food"
            />

            <div className="floating-card">
              <span>⭐</span>
              <div>
                <strong>4.8/5</strong>
                <small>Food lovers rating</small>
              </div>
            </div>

          </div>

        </section>


        {/* FOOD CATEGORIES */}

        <section className="categories-section">

          <div className="section-heading">

            <div>
              <h2>Explore Categories</h2>
              <p>What are you craving today?</p>
            </div>

          </div>


          <div className="category-grid">

            <div className="category-card">
              <div className="category-icon">🍛</div>
              <h3>Biryani</h3>
            </div>

            <div className="category-card">
              <div className="category-icon">🍕</div>
              <h3>Pizza</h3>
            </div>

            <div className="category-card">
              <div className="category-icon">🍔</div>
              <h3>Burgers</h3>
            </div>

            <div className="category-card">
              <div className="category-icon">🥗</div>
              <h3>Healthy</h3>
            </div>

            <div className="category-card">
              <div className="category-icon">🥞</div>
              <h3>Breakfast</h3>
            </div>

            <div className="category-card">
              <div className="category-icon">🍜</div>
              <h3>Chinese</h3>
            </div>

          </div>

        </section>


        {/* RESTAURANTS */}

        <section className="restaurants-section">

          <div className="section-heading">

            <div>
              <h2>Popular Restaurants</h2>
              <p>Discover the best restaurants near you.</p>
            </div>

            <span className="restaurant-count">
              {filteredRestaurants.length} Restaurants
            </span>

          </div>


          <div className="restaurant-grid">

            {filteredRestaurants.length > 0 ? (

              filteredRestaurants.map((rest) => (

                <div className="restaurant-card" key={rest.id}>

                  <div className="restaurant-image">

                    <img
                      src={rest.image}
                      alt={rest.name}
                    />

                    <span className="rating">
                      ⭐ {rest.rating}
                    </span>

                    <span className="food-type">
                      {rest.type === "Veg" ? "🟢 Veg" : "🔴 Non-Veg"}
                    </span>

                  </div>


                  <div className="restaurant-info">

                    <h3>{rest.name}</h3>

                    <p className="delivery-time">
                      ⏱ {rest.time}
                    </p>

                    <div className="restaurant-bottom">

                      <span>Starting from</span>

                      <strong>₹{rest.price}</strong>

                    </div>

                  </div>

                </div>

              ))

            ) : (

              <div className="empty-result">
                <h3>No restaurants found 😕</h3>
                <p>Try searching with another name.</p>
              </div>

            )}

          </div>

        </section>


        {/* FOOTER */}

        <footer className="footer">

          <h2>FoodSprint 🍔</h2>

          <p>Good food. Good mood. Delivered with love.</p>

          <small>© 2026 FoodSprint. All rights reserved.</small>

        </footer>

      </div>

    </div>

  );

}

export default Home;
