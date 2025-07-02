import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { toast } from "react-toastify";

export default function Login() {

    const loginNotify = () => {
        toast.success("Login successful!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true
        });
    }

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            loginNotify();
            console.log("UserInfo: ", result?.user?.accessToken);
        } catch (error) {
            console.log("Sign failed: ", error);
        }
    }

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                background: "#f5f5f5",
            }}
        >
            <h2 style={{ marginBottom: "20px", fontFamily: "Arial" }}>Login to Continue</h2>
            <button
                onClick={handleLogin}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    backgroundColor: "#4285F4",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Sign in with Google
            </button>
        </div>
    );
}
