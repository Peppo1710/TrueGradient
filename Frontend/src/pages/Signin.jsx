// SignIn.jsx
import { useState, useEffect } from "react";
import AuthForm from "../components/Form";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_PROD ;

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(BACKEND_URL);
      const response = await fetch(`${BACKEND_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Store JWT in localStorage
        localStorage.setItem('jwt_token', result.token);
        console.log("Signin successful:", result);
        navigate('/chat')
        // Redirect or show success message
      } else {
        setError(result.error || 'Signin failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error("Signin error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
      <AuthForm 
        type="signin" 
        onSubmit={handleSignIn}
        loading={loading}
      />
    </div>
  );
}
