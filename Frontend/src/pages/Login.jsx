import { useState } from "react";
import { loginUser } from "../api/auth.api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSumbit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      console.log(response);

      login(response.data);

      navigate("/home");
    } catch (error) {
      console.log(error.response?.data);
      return(<><h1>{error.response?.data}</h1></>)
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Inventory Management</h1>

        <form onSubmit={handleSumbit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
