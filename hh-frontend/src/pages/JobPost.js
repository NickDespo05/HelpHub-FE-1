import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import NavbarHelpHub from "../components/Navbar_HelpHub";

export default function JobPost() {
    const [info, setInfo] = useState({
        category: "",
        postedBy: "Account",
        description: "",
        location: ["PA", ""],
        image: "",
    });

    return (
        <div>
            <NavbarHelpHub />
            <div className="Spacer2"></div>
            <h1>Post a Job</h1>

            <div className="jobPostForm">
                <Form>
                    <div className="Spacer"></div>
                    <Form.Group>
                        <Form.Label>Job Category</Form.Label>
                        <Form.Select
                            value={info.category}
                            onChange={(e) => {
                                setInfo({
                                    ...info,
                                    category: e.target.value,
                                });
                            }}
                        >
                            <option>Landscaping</option>
                            <option>Home Cleaning</option>
                            <option>Pet Care</option>
                            <option>Moving Help</option>
                            <option>Miscellaneous</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="Spacer"></div>
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            value={info.image}
                            onChange={(e) => {
                                setInfo({
                                    ...info,
                                    image: e.target.value,
                                });
                            }}
                        />
                    </Form.Group>
                    <div className="Spacer"></div>
                    <Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            value={info.location[1]}
                            type="text"
                            onChange={(e) => {
                                setInfo({
                                    ...info,
                                    location: e.target.value,
                                });
                            }}
                        />
                        <Form.Text>The specific address of the Job.</Form.Text>
                    </Form.Group>
                    <div className="Spacer"></div>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={info.description}
                            type="text"
                            placeholder="Description of Job"
                            as="textarea"
                            rows={4}
                            onChange={(e) => {
                                setInfo({
                                    ...info,
                                    description: e.target.value,
                                });
                            }}
                        />
                    </Form.Group>
                    <div className="Spacer"></div>
                    <Button value="submit" type="submit">
                        Post
                    </Button>
                </Form>
            </div>
        </div>
    );
}
