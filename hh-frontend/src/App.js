import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/Sign_In";
import SignUp from "./pages/Sign_Up";
import JobPost from "./pages/JobPost";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import CurrentAccountProvider from "./context/CurrentAccount";
import { ThemeProvider } from "react-bootstrap";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavbarHelpHub from "./components/Navbar_HelpHub";
import EditProfile from "./pages/EditProfile";
import ProviderRequests from "./pages/ProviderRequests";
import NewProviderRequests from "./pages/NewProviderRequests";

function App() {
    return (
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
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/signIn" element={<SignIn />} />
                            <Route path="/signUp" element={<SignUp />} />
                            <Route path="/postJob" element={<JobPost />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route
                                path="/editProfile"
                                element={<EditProfile />}
                            />
                            <Route
                                path="/providerRequests"
                                element={<NewProviderRequests />}
                            />
                        </Routes>
                    </BrowserRouter>
                </div>
            </ThemeProvider>
        </CurrentAccountProvider>
    );
}

export default App;
