import "./App.css";
import HomeScreen from "./features/home/screens/HomeScreen";
import Dashboard from "./layouts/partials/Dashboard";

function App() {
    return (
        <div>
            {/* <LoginScreen /> */}
            <HomeScreen>
                <Dashboard />
            </HomeScreen>
        </div>
    );
}

export default App;
