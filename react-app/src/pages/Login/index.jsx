import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";


const clientId = import.meta.env.VITE_CLIENT_ID_GOOGLE;


const googleAuth = () => {
  window.location.href = "http://localhost:3900/api/login/google";
};

export default function Login() {
  return (
    <div className="w-full ">
      <div className="flex items-center flex-col rounded-lg border-">
        <h1 className="text-xl font-semibold font-poppins text-center mb-4 mt-10">
          Inicia sesión con tu cuenta de la Universidad Panamericana
        </h1>
        <button onClick={googleAuth}>Inicia sesión con google</button>
      </div>
    </div>
  );
}
