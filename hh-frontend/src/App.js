import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/Sign_In";
import SignUp from "./pages/Sign_Up";
import JobPost from "./pages/JobPost";
import Search from "./pages/Search";
import CurrentAccountProvider from "./context/CurrentAccount";
import { ThemeProvider } from "react-bootstrap";
import { Routes, Route, BrowserRouter } from "react-router-dom";

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
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/signIn" element={<SignIn />} />
                            <Route path="/signUp" element={<SignUp />} />
                            <Route path="/postJob" element={<JobPost />} />
                            <Route path="/search" element={<Search />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </ThemeProvider>
        </CurrentAccountProvider>
    );
}

export default App;
/**
 * @TODO
 * I need to work on the sign in and conditional Rendering along with
 * connecting the app to the backend
 */
