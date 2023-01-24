import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "react-bootstrap";

function App() {
    return (
        <ThemeProvider
            breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
            minBreakpoint="xxs"
        >
            <div className="App">
                <HomePage />
            </div>
        </ThemeProvider>
    );
}

export default App;
