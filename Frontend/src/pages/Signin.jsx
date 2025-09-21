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

      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        setError("Server returned invalid response. Please try again.");
        return;
      }

      if (response.ok) {
        localStorage.setItem('jwt_token', result.token);
        console.log("Signin successful:", result);
        navigate('/chat');
      } else {
        if (response.status >= 500) {
          setError("Server error. Please try again later.");
        } else if (response.status === 400) {
          setError(result.error || "Invalid credentials provided.");
        } else if (response.status === 401) {
          setError(result.error || "Invalid username or password.");
        } else {
          setError(result.error || result.message || "Signin failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Signin error:", err);
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError("Cannot connect to server. Please check your internet connection.");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
      <AuthForm 
        type="signin" 
        onSubmit={handleSignIn}
        loading={loading}
      />
    </div>
  );
}
