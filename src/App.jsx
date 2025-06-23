import { useSelector } from "react-redux";
import Chart from "./components/Chart"
import Form from "./components/Form"
import List from "./components/List"
import './style/Main.css';
import { ToastContainer } from "react-toastify";

function App() {
    const user = useSelector((state) => state.user);

    return (
        <div className="container">
            <h1 className="">SCHOOL CHART</h1>
            <div className="form-table">
                <Form />
                <List />
            </div>
            <div className="chart">
                {user.length === 0 ? "Nothing to display!" : <Chart />}
            </div>
            <ToastContainer/>
        </div>
    )
}

export default App
