import { useState } from "react";

function Register() {

    const [restaurantName, setRestaurantName] = useState("");
    const [description, setDescription] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");

    const [message, setMessage] = useState("");

    function register() {

        const restaurant = {
            restaurantName: restaurantName,
            description: description,
            ownerName: ownerName,
            email: email,
            phone: phone,
            password: password,
            address: address,
            city: city,
            state: state,
            pincode: pincode
        };

        fetch("https://foodsprint.kranthidev.space/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(restaurant)
        })
        .then(response => response.text())
        .then(data => {
            setMessage(data);
        })
        .catch(error => {
            setMessage(error.message);
        });
    }

    return (
        <div className="auth-card register-card">

            <h1>Restaurant Register Page</h1>

            <input
                type="text"
                placeholder="Restaurant Name"
                onChange={(e) => setRestaurantName(e.target.value)}
                required
            />
            <br /><br />

            <input
                type="text"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <br /><br />

            <input
                type="text"
                placeholder="Owner Name"
                onChange={(e) => setOwnerName(e.target.value)}
                required
            />
            <br /><br />

            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <br /><br />

            <input
                type="tel"
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                required
            />
            <br /><br />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <br /><br />

            <input
                type="text"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                required
            />
            <br /><br />

            <input
                type="text"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                required
            />
            <br /><br />

            <input
                type="text"
                placeholder="State"
                onChange={(e) => setState(e.target.value)}
                required
            />
            <br /><br />

            <input
                type="text"
                placeholder="Pincode"
                onChange={(e) => setPincode(e.target.value)}
                required
            />
            <br /><br />

            <button onClick={register}>
                Register
            </button>

            <p>{message}</p>

        </div>
    );
}

export default Register;