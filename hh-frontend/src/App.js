import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/Sign_In";
import SignUp from "./pages/Sign_Up";
import JobPost from "./pages/JobPost";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Profile from "./pages/Profile";
import CurrentAccountProvider from "./context/CurrentAccount";
import { ThemeProvider } from "react-bootstrap";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavbarHelpHub from "./components/Navbar_HelpHub";
import EditProfile from "./pages/EditProfile";
import NewProviderRequests from "./pages/NewProviderRequests";
import InProgress from "./pages/InProgress";
import { useEffect } from "react";
import JobInfoProvider from "./context/JobInfo";
import JobPost2 from "./pages/JobPost2";
import Footer from "./components/Footer";

function App() {
    return (
        <PayPalScriptProvider
            options={{
                "client-id":
                    "AQBmG-WN7ug-AWmWUCbuNj7qq3lZ0lU3g9yExl_NRnNTYQORzeea_aCPDvVZdpobAyCX_TDnj1-todli",
                currency: "USD",
                intent: "capture",
            }}
        >
            <JobInfoProvider>
                <CurrentAccountProvider>
                    <ThemeProvider
                        breakpoints={[
                            "xxxl",
                            "xxl",
                            "xl",
                            "lg",
                            "md",
                            "sm",
                            "xs",
                            "xxs",
                        ]}
                        minBreakpoint="xxs"
                    >
                        <div className="App">
                            <NavbarHelpHub />
                            {/* <Footer /> */}
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route
                                        path="/signIn"
                                        element={<SignIn />}
                                    />
                                    <Route
                                        path="/signUp"
                                        element={<SignUp />}
                                    />
                                    <Route
                                        path="/postJob"
                                        element={<JobPost />}
                                    />
                                    <Route
                                        path="/profile"
                                        element={<Profile />}
                                    />
                                    <Route
                                        path="/editProfile"
                                        element={<EditProfile />}
                                    />
                                    <Route
                                        path="/providerRequests"
                                        element={<NewProviderRequests />}
                                    />
                                    <Route
                                        path="/inProgress"
                                        element={<InProgress />}
                                    />
                                    <Route
                                        path="/jobPost2"
                                        element={<JobPost2 />}
                                    />
                                </Routes>
                            </BrowserRouter>
                        </div>
                    </ThemeProvider>
                </CurrentAccountProvider>
            </JobInfoProvider>
        </PayPalScriptProvider>
    );
}

export default App;
