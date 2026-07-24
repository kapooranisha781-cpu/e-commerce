import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Login.css";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();



  const handleLogin = (e) => {

    e.preventDefault();


    if (email.trim() && password.trim()) {

      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("adminEmail", email);

      navigate("/admin/dashboard");

    } 
    else {

      alert("Please enter email and password");

    }

  };



  return (

    <div className="login-container">


      <div className="login-card">





        <h1>Admin Login</h1>

        <p>
          Welcome back! Please login to continue.
        </p>



        <form onSubmit={handleLogin}>


          <div className="input-group">

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

          </div>




          <div className="input-group">

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

          </div>




<button className="login-btn" type="submit">
  Login
</button>

<button 
  type="button"
  className="back-btn"
  onClick={() => navigate("/")}
>
  ← Back to Home
</button>

        </form>




        <div className="login-footer">

          Nexus E-Commerce Admin Panel

        </div>



      </div>


    </div>

  );

}


export default Login;