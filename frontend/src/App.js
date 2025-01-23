import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import Ticket from "./pages/ticket-list/Ticket";
import Entry from "./pages/entry/Entry.page";
import AddTicket from "./pages/new-ticket/AddTicket.page";
import Dashboard from "./pages/dashboard/Dashboard.page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/private-route/PrivateRoute.comp";
import TicketListScreen from "./pages/ticket/TicketList.page";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    {/* Public Route */}
                    <Route path="/" element={<Entry />} />

                    {/* Protected Routes wrapped in DefaultLayout */}
                    <Route element={<DefaultLayout />}>
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/add-ticket"
                            element={
                                <PrivateRoute>
                                    <AddTicket />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/ticket"
                            element={
                                <PrivateRoute>
                                    <Ticket />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/tickets"
                            element={
                                <PrivateRoute>
                                    <TicketListScreen />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/ticket/:tId"
                            element={
                                <PrivateRoute>
                                    <Ticket />
                                </PrivateRoute>
                            }
                        />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
