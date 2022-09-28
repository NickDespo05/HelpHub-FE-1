import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

export default function Navbar(props) {
    if (props.signiInStatus == true && props.accountType == "consumer") {
        return (
            <Container>
                <Nav>
                    <Nav.Item>
                        <Nav.Link href="/homepage">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href={`/account/${props.accountId}`}>
                            {props.accountName}
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href={`/chats/${props.accountId}`}>
                            Chats
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>Sign Out</Nav.Link>
                        {/*gonna need some sort of function to sign the user out*/}
                    </Nav.Item>
                </Nav>
            </Container>
        );
    } else if (props.signiInStatus == false) {
        return (
            <Container>
                <Nav>
                    <Nav.Item>
                        <Nav.Link href="/home">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/consumerLogin">
                            Login: Consumer
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/providerLogin">
                            Login: Provider
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/providerSignup">
                            Signup: Provider
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/consumerSignup">
                            Signup: Consumer
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        );
    } else if (props.signiInStatus == true && props.accountType == "provider") {
        <Container>
            <Nav>
                <Nav.Item>
                    <Nav.Link href="/homepage">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={`/account/${props.accountId}`}>
                        {props.accountName}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={`/chats/${props.accountId}`}>
                        Chats
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link>Sign Out</Nav.Link>
                    {/*gonna need some sort of function to sign the user out*/}
                </Nav.Item>
            </Nav>
        </Container>;
    } else {
        return (
            <Container>
                <h1>Error</h1>
            </Container>
        );
    }
}
