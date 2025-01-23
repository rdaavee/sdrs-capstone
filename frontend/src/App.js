import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import Ticket from "./pages/ticket-list/Ticket";
import TicketListScreen from "./pages/ticket/TicketList.page";
import TicketScreen from "./components/add-ticket-form/AddTicketForm";

function App() {
    return (
        <div>
            {/* <LoginScreen /> */}
            <DefaultLayout>
                {/* <Dashboard /> */}
                {/* <TicketScreen /> */}
                {/* <TicketListScreen /> */}
                <Ticket />
            </DefaultLayout>
        </div>
    );
}

export default App;
