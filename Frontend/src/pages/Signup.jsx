// Signup.jsx
import { useState } from "react";
import AuthForm from "../components/Form";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_PROD 

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // <-- call hooks only at top level

  const handleSignUp = async (data) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Using BACKEND_URL:", BACKEND_URL);
      const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({})); // safe parse

      if (response.ok) {
        // If backend returns a token on signup:
        if (result.token) {
          localStorage.setItem("jwt_token", result.token);
        }
        // Redirect to signin (or wherever you want)
        navigate("/");
        return;
      }

      // Non-OK response
      setError(result.error || result.message || "Signup failed");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      <AuthForm type="signup" onSubmit={handleSignUp} loading={loading} />
    </div>
  );
}
