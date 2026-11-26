import { useState } from "react";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import "../App.css";
function LandingPage(){
    const [activeForm, setActiveForm] = useState("");
    return (
        
    <div className="App">
      <Header />

      {activeForm === "" && (
        <section className="hero">
          <div className="hero-content">
            <h1>
              Delicious Food,
              <span> Delivered Fast!</span>
            </h1>

            <p>
              Order your favourite food from the best
              restaurants near you. Fresh, tasty and
              delivered right to your doorstep.
            </p>

            <div className="hero-buttons">
              <button
                onClick={() => setActiveForm("login")}
                className="login-btn"
              >
                Login
              </button>

              <button
                onClick={() => setActiveForm("register")}
                className="register-btn"
              >
                Register
              </button>
            </div>
          </div>

          <div className="hero-image">
            <div className="food-circle">
              🍔
            </div>
            <div className="food-small">🍕</div>
            <div className="food-small two">🍟</div>
          </div>
        </section>
      )}

      {activeForm !== "" && (
        <div className="form-section">
          <div className="form-container">
            <button
              className="close-btn"
              onClick={() => setActiveForm("")}
            >
              ✕
            </button>

            {activeForm === "login" ? (
              <>
                <Login />
                <p className="switch-text">
                  Don't have an account?
                  <button onClick={() => setActiveForm("register")}>
                    Register
                  </button>
                </p>
              </>
            ) : (
              <>
                <Register />
                <p className="switch-text">
                  Already have an account?
                  <button onClick={() => setActiveForm("login")}>
                    Login
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );

}
export default LandingPage;