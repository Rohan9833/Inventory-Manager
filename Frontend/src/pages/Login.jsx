import { useState } from "react";
import { loginUser } from "../api/auth.api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error while typing
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      console.log("LOGIN REQUEST:", {
        email: formData.email,
      });

      const response = await loginUser(formData);

      console.log("LOGIN RESPONSE:", response);

      login(response.data);

      setSuccessMessage("Login successful. Redirecting...");

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      setTimeout(() => {
        navigate("/home");
      }, 500);
    } catch (error) {
      console.error("LOGIN FRONTEND ERROR:", error);

      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Unable to login. Please try again.";

      setErrorMessage(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inventro-login-page">
      {/* LEFT SIDE */}
      <section className="inventro-login-visual">
        <div className="inventro-visual-overlay"></div>

        <div className="inventro-brand inventro-brand-left">
          <div className="inventro-brand-icon">
            <span></span>
            <span></span>
          </div>

          <div>
            <h2>Inventro</h2>
            <p>Inventory Management</p>
          </div>
        </div>

        <div className="inventro-visual-content">
          <span className="inventro-small-label">
            INVENTORY MANAGEMENT
          </span>

          <h1>
            Smarter Inventory
            <br />
            for a <span>Brighter</span>
            <br />
            Tomorrow
          </h1>

          <p className="inventro-visual-description">
            Manage your products, track sales, handle inventory
            and grow your business — all in one place.
          </p>

          <div className="inventro-feature-list">
            <div className="inventro-feature-item">
              <div className="inventro-feature-icon">✓</div>

              <div>
                <h3>Keep Track</h3>
                <p>Monitor your stock in real-time</p>
              </div>
            </div>

            <div className="inventro-feature-item">
              <div className="inventro-feature-icon">↗</div>

              <div>
                <h3>Boost Sales</h3>
                <p>Make better business decisions</p>
              </div>
            </div>

            <div className="inventro-feature-item">
              <div className="inventro-feature-icon">♙</div>

              <div>
                <h3>Grow Faster</h3>
                <p>Serve your customers better</p>
              </div>
            </div>
          </div>
        </div>

        <div className="inventro-bottom-quote">
          Small Business
          <br />
          <strong>Big Possibilities</strong>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="inventro-login-panel">
        <div className="inventro-top-slogan">
          <span>Organize</span>
          <span>Track</span>
          <span>Grow</span>
        </div>

        <div className="inventro-login-card">
          <div className="inventro-mobile-brand">
            <div className="inventro-brand-icon">
              <span></span>
              <span></span>
            </div>

            <div>
              <h2>Inventro</h2>
              <p>Inventory Management</p>
            </div>
          </div>

          <div className="inventro-login-heading">
            <h1>Welcome Back</h1>
            <p>Log in to your account to continue</p>
          </div>

          {/* ERROR */}
          {errorMessage && (
            <div className="inventro-login-error">
              <div className="inventro-error-icon">!</div>

              <div>
                <strong>Login failed</strong>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          {/* SUCCESS */}
          {successMessage && (
            <div className="inventro-login-success">
              <span>✓</span>
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="inventro-form-group">
              <label htmlFor="inventro-email">
                Email
              </label>

              <div className="inventro-input-wrapper">
                <span className="inventro-input-icon">
                  ✉
                </span>

                <input
                  id="inventro-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="inventro-form-group">
              <label htmlFor="inventro-password">
                Password
              </label>

              <div className="inventro-input-wrapper">
                <span className="inventro-input-icon">
                  🔒
                </span>

                <input
                  id="inventro-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="inventro-password-toggle"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "◉" : "◌"}
                </button>
              </div>
            </div>

            {/* OPTIONS */}
            <div className="inventro-login-options">
              <label className="inventro-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                />

                <span className="inventro-checkmark">
                  ✓
                </span>

                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="inventro-forgot-button"
                onClick={() => {
                  setErrorMessage(
                    "Please contact your administrator to reset your password."
                  );
                }}
              >
                Forgot password?
              </button>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="inventro-login-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="inventro-spinner"></span>
                  Logging in...
                </>
              ) : (
                <>
                  Log In
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          <div className="inventro-login-divider">
            <span></span>
            <p>or</p>
            <span></span>
          </div>

          <p className="inventro-admin-text">
            Don't have an account?
            <span>
              Contact your administrator
            </span>
          </p>
        </div>

        <div className="inventro-login-footer">
          <span>🌿</span>
          Better Tools
          <b>|</b>
          Smarter Work
          <b>|</b>
          Bigger Tomorrows
        </div>
      </section>
    </div>
  );
}

export default Login;