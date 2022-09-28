import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function TasksDisplay(props) {
    return (
        <Container fluid="md">
            <Row>
                <Col>
                    <Card className="m-4">
                        <Card.Img
                            variant="top"
                            src="components/placeHolder.png"
                        />
                        <Card.Title>Job Title</Card.Title>
                        <Card.Subtitle>Person Name</Card.Subtitle>
                        <Card.Text>
                            This is the job description. It will contain ... im
                            not writing the rest of this
                        </Card.Text>
                    </Card>
                </Col>
                <Col>
                    <Card className="m-4">
                        <Card.Img
                            variant="top"
                            src="components/placeHolder.png"
                        />
                        <Card.Title>Job Title</Card.Title>
                        <Card.Subtitle>Person Name</Card.Subtitle>
                        <Card.Text>
                            This is the job description. It will contain ... im
                            not writing the rest of this
                        </Card.Text>
                    </Card>
                </Col>
                <Col>
                    <Card className="m-4">
                        <Card.Img
                            variant="top"
                            src="components/placeHolder.png"
                        />
                        <Card.Title>Job Title</Card.Title>
                        <Card.Subtitle>Person Name</Card.Subtitle>
                        <Card.Text>
                            This is the job description. It will contain ... im
                            not writing the rest of this
                        </Card.Text>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="m-4">
                        <Card.Img
                            variant="top"
                            src="components/placeHolder.png"
                        />
                        <Card.Title>Job Title</Card.Title>
                        <Card.Subtitle>Person Name</Card.Subtitle>
                        <Card.Text>
                            This is the job description. It will contain ... im
                            not writing the rest of this
                        </Card.Text>
                    </Card>
                </Col>
                <Col>
                    <Card className="m-4">
                        <Card.Img
                            variant="top"
                            src="components/placeHolder.png"
                        />
                        <Card.Title>Job Title</Card.Title>
                        <Card.Subtitle>Person Name</Card.Subtitle>
                        <Card.Text>
                            This is the job description. It will contain ... im
                            not writing the rest of this
                        </Card.Text>
                    </Card>
                </Col>
                <Col>
                    <Card className="m-4">
                        <Card.Img
                            variant="top"
                            src="components/placeHolder.png"
                        />
                        <Card.Title>Job Title</Card.Title>
                        <Card.Subtitle>Person Name</Card.Subtitle>
                        <Card.Text>
                            This is the job description. It will contain ... im
                            not writing the rest of this
                        </Card.Text>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

/*
    once the backend has been created make one card and map through the data given 
    through the properties 

*/
