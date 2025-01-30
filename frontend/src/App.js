import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import Ticket from "./pages/ticket-list/Ticket";
import Entry from "./pages/login/Login.page";
import AddTicket from "./pages/new-ticket/AddTicket.page";
import Dashboard from "./pages/dashboard/Dashboard.page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/private-route/PrivateRoute.comp";
import TicketListScreen from "./pages/ticket/TicketList.page";
import RegistrationForm from "./components/registration/Registration.comp";
import LoginForm from "./components/login/Login.comp";
import LoginPage from "./pages/login/Login.page";
import EntryPage from "./pages/entry/Entry.page";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    {/* Public Route */}
                    <Route path="/" element={<EntryPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationForm />} />

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
