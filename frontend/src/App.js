import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import Ticket from "./pages/ticket-list/Ticket";
import AddTicket from "./pages/new-ticket/AddTicket.page";
import Dashboard from "./pages/dashboard/Dashboard.page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/private-route/PrivateRoute.comp";
import TicketListScreen from "./pages/ticket-list/TicketList.page";
import RegistrationForm from "./components/registration/Registration.comp";
import LoginPage from "./pages/login/Login.page";
import EntryPage from "./pages/entry/Entry.page";
import { AuthProvider } from "./utils/authContext";

function App() {
    return (
        <div>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<EntryPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/register"
                            element={<RegistrationForm />}
                        />

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
            </AuthProvider>
        </div>
    );
}

export default App;
