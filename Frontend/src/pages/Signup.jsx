// SignUp.jsx
import AuthForm from "../components/Form";

export default function Signup() {
  const handleSignUp = (data) => {
    console.log("Signup data:", data);
    // call /signup API here
  };

  return <AuthForm type="signup" onSubmit={(data) => console.log(data)} />
}
