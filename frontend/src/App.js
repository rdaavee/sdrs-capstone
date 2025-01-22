import "./App.css";
import HomeScreen from "./features/home/screens/HomeScreen";
import TicketScreen from "./features/ticket/screens/TicketScreen";
import Dashboard from "./layouts/partials/Dashboard";

function App() {
    return (
        <div>
            {/* <LoginScreen /> */}
            <HomeScreen>
                {/* <Dashboard /> */}
                <TicketScreen />
            </HomeScreen>
        </div>
    );
}

export default App;
