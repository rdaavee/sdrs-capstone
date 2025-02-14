import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/registration/Registration.comp";
import LoginPage from "./pages/login/Login.page";
import EntryPage from "./pages/entry/Entry.page";
import { AuthProvider } from "./utils/authContext";
import ConfirmRequest from "./pages/request/ConfirmRequest.page";
import AdminDashboard from "./pages/admin/AdminDashboard.page";
import TrackerRequest from "./pages/tracker/TrackerRequest.page";

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
                        <Route
                            path="/tracker-request"
                            element={<TrackerRequest />}
                        />

                        <Route
                            path="/confirm-request"
                            element={<ConfirmRequest />}
                        />

                        <Route element={<DefaultLayout />}>
                            <Route
                                path="/admin-dashboard"
                                element={<AdminDashboard />}
                            />
                        </Route>
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
