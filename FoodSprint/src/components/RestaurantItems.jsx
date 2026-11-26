
import { useState } from "react";
import "./Rest.css";

const restaurants = {
  1: {
    name: "Mehfil",
    items: [
      { id: 1, name: "Chicken 65", price: 220, category: "Starters", type: "Non-Veg" },
      { id: 2, name: "Chicken Biryani", price: 250, category: "Biryanis", type: "Non-Veg" },
      { id: 3, name: "Mutton Biryani", price: 320, category: "Biryanis", type: "Non-Veg" },
      { id: 4, name: "Double Ka Meetha", price: 100, category: "Desserts", type: "Veg" }
    ]
  },

  2: {
    name: "Paradise",
    items: [
      { id: 5, name: "Chicken Special Biryani", price: 280, category: "Biryanis", type: "Non-Veg" },
      { id: 6, name: "Mutton Biryani", price: 350, category: "Biryanis", type: "Non-Veg" },
      { id: 7, name: "Paneer Tikka", price: 190, category: "Starters", type: "Veg" },
      { id: 8, name: "Gulab Jamun", price: 90, category: "Desserts", type: "Veg" }
    ]
  },

  3: {
    name: "Green Bawarchi",
    items: [
      { id: 9, name: "Veg Biryani", price: 160, category: "Biryanis", type: "Veg" },
      { id: 10, name: "Paneer Butter Masala", price: 220, category: "Curries", type: "Veg" },
      { id: 11, name: "Veg Manchuria", price: 150, category: "Starters", type: "Veg" },
      { id: 12, name: "Gulab Jamun", price: 80, category: "Desserts", type: "Veg" }
    ]
  },

  4: {
    name: "Pista House",
    items: [
      { id: 13, name: "Chicken Mandi", price: 300, category: "Biryanis", type: "Non-Veg" },
      { id: 14, name: "Chicken Shawarma", price: 150, category: "Starters", type: "Non-Veg" },
      { id: 15, name: "Paneer Roll", price: 130, category: "Starters", type: "Veg" }
    ]
  },

  5: {
    name: "Udupi Grand",
    items: [
      { id: 16, name: "Masala Dosa", price: 90, category: "Breakfast", type: "Veg" },
      { id: 17, name: "Idli Sambar", price: 60, category: "Breakfast", type: "Veg" },
      { id: 18, name: "Paneer Fried Rice", price: 160, category: "Rice", type: "Veg" }
    ]
  },

  6: {
    name: "Spicy Kitchen",
    items: [
      { id: 19, name: "Chicken Fried Rice", price: 180, category: "Rice", type: "Non-Veg" },
      { id: 20, name: "Chicken Lollipop", price: 220, category: "Starters", type: "Non-Veg" },
      { id: 21, name: "Veg Noodles", price: 130, category: "Noodles", type: "Veg" }
    ]
  }
};

function RestaurantItems() {

  const [restaurantId, setRestaurantId] = useState("1");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  const restaurant = restaurants[restaurantId];
  const items = restaurant.items;

  const categories = [
    "All",
    ...new Set(items.map(item => item.category))
  ];

  const filteredItems = items.filter(item =>
    category === "All" || item.category === category
  );

  // CART ITEMS
  const cartItems = items.filter(item => cart[item.id] > 0);

  // TOTAL QUANTITY
  const cartCount = cartItems.reduce(
    (sum, item) => sum + cart[item.id], 0
  );

  // ITEM TOTAL
  const itemTotal = cartItems.reduce(
    (sum, item) => sum + item.price * cart[item.id], 0
  );

  // DELIVERY FEE
  const deliveryFee = cartCount > 0 ? 30 : 0;

  // GRAND TOTAL
  const grandTotal = itemTotal + deliveryFee;

  // ADD OR REMOVE ITEM
  function updateCart(id, change) {
    setCart(previous => ({
      ...previous,
      [id]: Math.max(0, (previous[id] || 0) + change)
    }));
  }

  // PLACE ORDER
  function placeOrder() {
    if (cartCount === 0) {
      alert("Please add items to your cart.");
      return;
    }

    alert("Your order has been placed successfully!");

    setCart({});
    setShowSummary(false);
  }

  // ORDER SUMMARY PAGE
  if (showSummary) {
    return (
      <div className="menu-page">
        <div className="menu-container">

          <header className="menu-navbar">
            <h2>Food<span>Sprint</span> 🍔</h2>

            <button
              className="back-button"
              onClick={() => setShowSummary(false)}
            >
              ← Back to Menu
            </button>
          </header>

          <section className="summary-heading">
            <h1>Order Summary</h1>
            <p>Review your items before placing your order.</p>
          </section>

          <div className="restaurant-name">
            <h3>Restaurant: {restaurant.name}</h3>
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <h2>Your cart is empty!</h2>
              <button onClick={() => setShowSummary(false)}>
                Explore Menu
              </button>
            </div>
          ) : (
            <>
              <div className="summary-list">

                {cartItems.map(item => (
                  <div className="summary-item" key={item.id}>

                    <div className="summary-info">
                      <h3>{item.name}</h3>
                      <p>₹{item.price} × {cart[item.id]}</p>
                    </div>

                    <div className="quantity-control">
                      <button onClick={() => updateCart(item.id, -1)}>
                        −
                      </button>

                      <span>{cart[item.id]}</span>

                      <button onClick={() => updateCart(item.id, 1)}>
                        +
                      </button>
                    </div>

                    <strong>
                      ₹{item.price * cart[item.id]}
                    </strong>

                  </div>
                ))}

              </div>

              <div className="bill-details">
                <h2>Bill Details</h2>

                <div className="bill-row">
                  <span>Item Total</span>
                  <span>₹{itemTotal}</span>
                </div>

                <div className="bill-row">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>

                <div className="bill-row">
                  <span>Total Items</span>
                  <span>{cartCount}</span>
                </div>

                <hr />

                <div className="bill-row grand-total">
                  <strong>Grand Total</strong>
                  <strong>₹{grandTotal}</strong>
                </div>

              </div>

              <button
                className="place-order"
                onClick={placeOrder}
              >
                Place Order • ₹{grandTotal}
              </button>
            </>
          )}

        </div>
      </div>
    );
  }

  // RESTAURANT MENU PAGE
  return (
    <div className="menu-page">
      <div className="menu-container">

        <header className="menu-navbar">
          <h2>Food<span>Sprint</span> 🍔</h2>
        </header>

        <section className="restaurant-selection">
          <h1>Choose Your Restaurant</h1>

          <select
            value={restaurantId}
            onChange={e => {
              setRestaurantId(e.target.value);
              setCategory("All");
              setCart({});
            }}
          >
            {Object.entries(restaurants).map(([id, r]) => (
              <option value={id} key={id}>
                {r.name}
              </option>
            ))}
          </select>
        </section>

        <section className="menu-heading">
          <div>
            <h2>{restaurant.name} Menu</h2>
            <p>Choose your favourite dishes.</p>
          </div>

          <span>{items.length} Items</span>
        </section>

        <div className="menu-categories">
          {categories.map(c => (
            <button
              key={c}
              className={category === c ? "selected" : ""}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="menu-items-grid">

          {filteredItems.map(item => (
            <div className="menu-item-card" key={item.id}>

              <h3>{item.name}</h3>

              <p>
                {item.type === "Veg" ? "🟢 Veg" : "🔴 Non-Veg"}
              </p>

              <div className="item-bottom">
                <strong>₹{item.price}</strong>

                <div className="quantity-control">
                  <button onClick={() => updateCart(item.id, -1)}>
                    −
                  </button>

                  <span>{cart[item.id] || 0}</span>

                  <button onClick={() => updateCart(item.id, 1)}>
                    +
                  </button>
                </div>
              </div>

            </div>
          ))}

        </div>

        {filteredItems.length === 0 && (
          <p className="empty-menu">No items available.</p>
        )}

        {cartCount > 0 && (
          <div className="cart-summary">

            <div>
              <strong>{cartCount} Items Added</strong>
              <p>Total: ₹{itemTotal}</p>
            </div>

            <button onClick={() => setShowSummary(true)}>
              View Cart →
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default RestaurantItems;
