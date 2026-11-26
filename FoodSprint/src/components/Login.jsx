import {useState} from "react";

function Login()
{
 const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

    function login() {
    fetch("https://foodsprint.kranthidev.space/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: name,
        password: password
      })
    })
    .then(response => response.text()
    )
    .then(data =>
      setMessage(data)
    )
    .catch(error =>
      setMessage(error)
    );
  }
    return (
        <div className="auth-card login-card">
            <h1> Login Page </h1>
            <input
        type="text"
        placeholder="Username"
        onChange={(a) => setName(a.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(a) => setPassword(a.target.value)}
      />

      <br /><br />

      <button onClick={login}>
        Login
      </button>

      <p>{message}</p>
        </div>
    );
}
export default Login;