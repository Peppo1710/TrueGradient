// SignIn.jsx
import AuthForm from "../components/Form";

export default function Signin() {
  const handleSignIn = (data) => {
    console.log("Signin data:", data);
    // call /signin API here
  };

  return <AuthForm type="signin" onSubmit={(data) => console.log(data)} />
}
