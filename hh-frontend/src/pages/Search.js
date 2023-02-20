import React, { useState, useContext } from "react";
import { Form, Button, Col, Container, Card } from "react-bootstrap";
import NavbarHelpHub from "../components/Navbar_HelpHub";
import Jobs from "../components/Jobs";
import { CurrentAccount } from "../context/CurrentAccount";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [searchParam, setSearchParam] = useState("");
    const { currentUser } = useContext(CurrentAccount);
    const handleSearch = async () => {
        setSearchData(
            fetch(`http://localhost:5050/${searchTerm}/${searchParam}`)
        );
        const response = await searchData.json();
        console.log(response);
    };

    const Display = () => {
        if (searchData == [] || searchTerm == "") return <Jobs />;
        else {
            return searchData.map((data, i) => (
                <Col>
                    <div className="job">
                        <Container md="auto" sm={8} key={i}>
                            <Card>
                                <Card.Title>{data.name} </Card.Title>
                                <Card.Text>{data.description}</Card.Text>
                            </Card>
                        </Container>
                    </div>
                </Col>
            ));
        }
    };
    return (
        <div>
            <Form onSubmit={handleSearch}>
                <div id="searchBar">
                    <Form.Group>
                        <Form.Control
                            value={searchTerm}
                            placeholder="Search"
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <div className="widthSearchParam">
                        <Form.Select
                            value={searchParam}
                            required
                            onChange={(e) => {
                                setSearchParam(e.target.value);
                            }}
                        >
                            <option>Search By:</option>
                            <option value="location">Location</option>
                            <option value="name">Name</option>
                        </Form.Select>
                    </div>
                    <Button variant="light" value="submit">
                        Search
                    </Button>
                </div>
            </Form>
            <div className="searchDefault">
                <Display />
            </div>
        </div>
    );
}
