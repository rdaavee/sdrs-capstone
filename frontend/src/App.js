import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import TicketScreen from "./pages/ticket-list/Ticket.page";

function App() {
    return (
        <div>
            {/* <LoginScreen /> */}
            <DefaultLayout>
                {/* <Dashboard /> */}
                {/* <TicketScreen /> */}
                <TicketScreen />
            </DefaultLayout>
        </div>
    );
}

export default App;
