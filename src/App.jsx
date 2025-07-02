import { useSelector } from "react-redux";
import Chart from "./components/Chart"
import Form from "./components/Form"
import List from "./components/List"
import './style/Main.css';
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

function App() {
    const user = useSelector((state) => state.user);
    const [isLogin, setIsLogin] = useState(false);

    const signOutNotify = () => {
        toast.success("Sign Out sucessfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true
        });
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {
            signOutNotify();
        }).catch((error) => {
            console.log("Failed to signOut: ", error);
        });
    }

    useEffect(() => {
        const unSubcribed = onAuthStateChanged(auth, (user) => {
            setIsLogin(!user);
        });

        return () => unSubcribed();
    }, [])

    return (
        <div className="container">
            {isLogin ? (
                <Login />
            ) : (
                <>
                    <button onClick={handleSignOut} style={{
                        padding: "8px 18px",
                        fontSize: "16px",
                        borderRadius: "5px",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}>Sign Out</button>
                    <h1 className="">SCHOOL CHART</h1>
                    <div className="form-table">
                        <Form />
                        <List />
                    </div>
                    <div className="chart">
                        {user.length === 0 ? "Nothing to display!" : <Chart />}
                    </div>
                </>
            )}
            <ToastContainer />
        </div>
    )
}

export default App
