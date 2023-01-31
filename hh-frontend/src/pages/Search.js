import React, { useState } from "react";
import { Form, Button, Col, Container, Card } from "react-bootstrap";
import NavbarHelpHub from "../components/Navbar_HelpHub";
import Jobs from "../components/Jobs";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [searchParam, setSearchParam] = useState("");

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
            <NavbarHelpHub />
            <Form onSubmit={handleSearch}>
                <div id="searchBar">
                    <Form.Group>
                        <Form.Control
                            value={searchTerm}
                            placeHolder="Search"
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
                            <Form.Label>Search By:</Form.Label>
                            <option>Location</option>
                            <option>Name</option>
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
