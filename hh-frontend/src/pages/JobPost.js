import { CurrentAccount } from "../context/CurrentAccount";
import { JobInfo } from "../context/JobInfo";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import NavbarHelpHub from "../components/Navbar_HelpHub";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PayPalButton from "../components/PayPalButton";

export default function JobPost() {
    const { currentUser } = useContext(CurrentAccount);
    const { jobInfo, setJobInfo } = useContext(JobInfo);
    const [info, setInfo] = useState({
        category: "",
        postedBy: "",
        description: "",
        address: "",
        state: "",
        price: "",
        extraInfo: {},
    });

    useEffect(() => {
        const handleExtra = () => {
            switch (info.category) {
                case "landscaping":
                    setExtraInfo({
                        estimatedTime: "",
                        areaSize: "",
                        homeType: "",
                        equipment: "",
                    });
                    console.log(extraInfo);
                    break;
                case "petCare":
                    setExtraInfo({
                        pet: "",
                        petWeight: 0,
                        temper: "",
                        equipment: "",
                    });
                    console.log(extraInfo);
                    break;
                case "homeCleaning":
                    setExtraInfo({
                        estimatedTime: "",
                        numOfRooms: 0,
                        numSqFt: 0,
                        equipment: "",
                    });
                    break;
                case "movingHelp":
                    setExtraInfo({
                        estimatedTime: "",
                        maxWeight: 0,
                    });
                    break;
                default:
                    break;
            }
        };
        handleExtra();
    }, [info.category]);

    const [extraInfo, setExtraInfo] = useState({});

    const navigate = useNavigate();
    const { setCurrentUser } = useContext(CurrentAccount);
    const [paidFor, setPaidFor] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setInfo({
            ...info,
            extraInfo: extraInfo,
        });
        console.log(extraInfo);
        if (Object.values(info).indexOf("" > -1)) {
            setJobInfo(info);
            navigate("/jobPost2");
        } else {
            alert("Please enter in all values.");
        }
    };

    if (info.category == "landscaping") {
        return (
            <div>
                <div className="Spacer2"></div>
                <h1 id="postJobTitle">Post a Job</h1>
                <div className="jobPostForm">
                    <Form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        <div className="Spacer"></div>
                        <Form.Group>
                            <Form.Label>Job Category</Form.Label>
                            <Form.Select
                                value={info.category}
                                onChange={(e) => {
                                    setInfo({
                                        ...info,
                                        category: e.target.value,
                                        state: currentUser.location,
                                        postedBy: currentUser._id,
                                    });
                                }}
                            >
                                <option>Select a Category</option>
                                <option value="landscaping">Landscaping</option>
                                <option value="homeCleaning">
                                    Home Cleaning
                                </option>
                                <option value="petCare">Pet Care</option>
                                <option value="movingHelp">Moving Help</option>
                                <option value="miscellaneous">
                                    Miscellaneous
                                </option>
                            </Form.Select>
                        </Form.Group>

                        <div className="Spacer"></div>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                value={info.address}
                                type="text"
                                onChange={(e) => {
                                    setInfo({
                                        ...info,
                                        address: e.target.value,
                                    });
                                }}
                            />
                            <Form.Text>
                                The specific address of the Job with the town.
                            </Form.Text>
                        </Form.Group>
                        <div className="Spacer"></div>
                        <div id="priceInput">
                            <Form.Group>
                                <div id="priceLabel">
                                    <Form.Label>Price</Form.Label>
                                </div>
                                <p id="dolla">$</p>
                                <div id="priceControl">
                                    <Form.Control
                                        type="number"
                                        size="sm"
                                        onChange={(e) => {
                                            setInfo({
                                                ...info,
                                                price: e.target.value,
                                            });
                                        }}
                                        value={info.price}
                                    />
                                </div>
                                <Form.Text>Minimum $20.00</Form.Text>
                                <div>
                                    <Form.Text>
                                        <p id="note">
                                            NOTE: When the job displays, it will
                                            show {parseInt(info.price) * 0.9}{" "}
                                        </p>
                                    </Form.Text>
                                </div>
                            </Form.Group>
                        </div>
                        <Form.Group id="descriptionInput">
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
                        <Form.Group>
                            <Form.Label>Estimated Time</Form.Label>
                            <Form.Control
                                value={extraInfo.estimatedTime}
                                type="text"
                                placeholder="Time"
                                onChange={(e) => {
                                    setExtraInfo({
                                        ...extraInfo,
                                        estimatedTime: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                        <div className="miniSpace"></div>
                        <Form.Group>
                            <Form.Label>
                                Size of area: (approx sq ft)
                            </Form.Label>
                            <Form.Control
                                value={extraInfo.areaSize}
                                type="text"
                                placeholder="size"
                                onChange={(e) => {
                                    setExtraInfo({
                                        ...extraInfo,
                                        areaSize: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                        <div className="miniSpace"></div>
                        <Form.Group>
                            <Form.Label>Type of Home</Form.Label>
                            <Form.Select
                                value={extraInfo.homeType}
                                onChange={(e) => {
                                    setExtraInfo({
                                        ...extraInfo,
                                        homeType: e.target.value,
                                    });
                                }}
                            >
                                <option>Select</option>
                                <option value="House">House</option>
                                <option value="Town House">Town House</option>
                                <option value="Apartment">Apartment</option>
                            </Form.Select>
                        </Form.Group>
                        <div className="miniSpace"></div>
                        <Form.Group>
                            <Form.Label>Equipment Being Used</Form.Label>
                            <br />
                            <Form.Text>
                                Please list the equipment being provided.
                            </Form.Text>
                            <Form.Control
                                value={extraInfo.equipment}
                                type="text"
                                onChange={(e) => {
                                    setExtraInfo({
                                        ...extraInfo,
                                        equipment: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                        <div className="miniSpace"></div>
                        <Button variant="primary" type="submit">
                            Post
                        </Button>
                    </Form>
                </div>
            </div>
        );
    } else if (info.category == "homeCleaning") {
        return (
            <div>
                <div className="Spacer2"></div>
                <h1 id="postJobTitle">Post a Job</h1>
                <div className="jobPostForm">
                    <Form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        <div className="Spacer"></div>
                        <Form.Group>
                            <Form.Label>Job Category</Form.Label>
                            <Form.Select
                                value={info.category}
                                onChange={(e) => {
                                    setInfo({
                                        ...info,
                                        category: e.target.value,
                                        state: currentUser.location,
                                        postedBy: currentUser._id,
                                    });
                                }}
                            >
                                <option>Select a Category</option>
                                <option value="landscaping">Landscaping</option>
                                <option value="homeCleaning">
                                    Home Cleaning
                                </option>
                                <option value="petCare">Pet Care</option>
                                <option value="movingHelp">Moving Help</option>
                                <option value="miscellaneous">
                                    Miscellaneous
                                </option>
                            </Form.Select>
                        </Form.Group>

                        <div className="Spacer"></div>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                value={info.address}
                                type="text"
                                onChange={(e) => {
                                    setInfo({
                                        ...info,
                                        address: e.target.value,
                                    });
                                }}
                            />
                            <Form.Text>
                                The specific address of the Job with the town.
                            </Form.Text>
                        </Form.Group>
                        <div className="Spacer"></div>
                        <div id="priceInput">
                            <Form.Group>
                                <div id="priceLabel">
                                    <Form.Label>Price</Form.Label>
                                </div>
                                <p id="dolla">$</p>
                                <div id="priceControl">
                                    <Form.Control
                                        type="number"
                                        size="sm"
                                        onChange={(e) => {
                                            setInfo({
                                                ...info,
                                                price: e.target.value,
                                            });
                                        }}
                                        value={info.price}
                                    />
                                </div>
                                <Form.Text>Minimum $20.00</Form.Text>
                                <div>
                                    <Form.Text>
                                        <p id="note">
                                            NOTE: When the job displays, it will
                                            show {parseInt(info.price) * 0.9}{" "}
                                        </p>
                                    </Form.Text>
                                </div>
                            </Form.Group>
                        </div>
                        <Form.Group id="descriptionInput">
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
                        <Form.Group>
                            <Form.Label>Estimated time:</Form.Label>
                            <Form.Control
                                value={extraInfo.estimatedTime}
                                type="text"
                                placeholder="time"
                                onChange={(e) => {
                                    setExtraInfo({
                                        ...extraInfo,
                                        estimatedTime: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                        <div className="miniSpace"></div>
                        <Form.Group>
                            <Form.Label># of rooms:</Form.Label>
                            <Form.Control
                                value={extraInfo.numOfRooms}
                                type="number"
                                onChange={(e) => {
                                    setExtraInfo({
                                        ...extraInfo,
                                        numOfRooms: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                        <div className="miniSpace"></div>
                        <Form.Group>
                            <Form.Label>Rough # of sq Ft</Form.Label>
                            <Form.Control
                                value={extraInfo.numSqFt}
                                type="text"
                                onChange={(e) => {
                                    setExtraInfo({
                                        ...extraInfo,
                                        numSqFt: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                        <div className="miniSpace"></div>
                        <Form.Group>
                            <Form.Label>Equipment</Form.Label>
                            <br />
                            <Form.Text>
                                Please list the equipment being provided.
                            </Form.Text>
                            <Form.Control
                                value={extraInfo.equipment}
                                type="text"
                                onChange={(e) => {
                                    setExtraInfo({
                                        ...extraInfo,
                                        equipment: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                        <div className="miniSpace"></div>
                        <Button variant="primary" type="submit">
                            Post
                        </Button>
                    </Form>
                </div>
            </div>
        );
    } else if (info.category == "petCare") {
        return (
            <div>
                <div className="Spacer2"></div>
                <h1 id="postJobTitle">Post a Job</h1>
                <div className="jobPostForm">
                    <Form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        <div className="Spacer"></div>
                        <Form.Group>
                            <Form.Label>Job Category</Form.Label>
                            <Form.Select
                                value={info.category}
                                onChange={(e) => {
                                    setInfo({
                                        ...info,
                                        category: e.target.value,
                                        state: currentUser.location,
                                        postedBy: currentUser._id,
                                    });
                                }}
                            >
                                <option>Select a Category</option>
                                <option value="landscaping">Landscaping</option>
                                <option value="homeCleaning">
                                    Home Cleaning
                                </option>
                                <option value="petCare">Pet Care</option>
                                <option value="movingHelp">Moving Help</option>
                                <option value="miscellaneous">
                                    Miscellaneous
                                </option>
                            </Form.Select>
                        </Form.Group>

                        <div className="Spacer"></div>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                value={info.address}
                                type="text"
                                onChange={(e) => {
                                    setInfo({
                                        ...info,
                                        address: e.target.value,
                                    });
                                }}
                            />
                            <Form.Text>
                                The specific address of the Job with the town.
                            </Form.Text>
                        </Form.Group>
                        <div className="Spacer"></div>
                        <div id="priceInput">
                            <Form.Group>
                                <div id="priceLabel">
                                    <Form.Label>Price</Form.Label>
                                </div>
                                <p id="dolla">$</p>
                                <div id="priceControl">
                                    <Form.Control
                                        type="number"
                                        size="sm"
                                        onChange={(e) => {
                                            setInfo({
                                                ...info,
                                                price: e.target.value,
                                            });
                                        }}
                                        value={info.price}
                                    />
                                </div>
                                <Form.Text>Minimum $20.00</Form.Text>
                                <div>
                                    <Form.Text>
                                        <p id="note">
                                            NOTE: When the job displays, it will
                                            show {parseInt(info.price) * 0.9}{" "}
                                        </p>
                                    </Form.Text>
                                </div>
                            </Form.Group>
                        </div>
                        <Form.Group id="descriptionInput">
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
                        <Form.Group>
                            <Form.Label>Dog or Cat?</Form.Label>
                            <Form.Select
                                onChange={(e) => {
                                    setExtraInfo({
                                        ...extraInfo,
                                        pet: e.target.value,
                                    });
                                }}
                                value={extraInfo.pet}
                            >
                                <option>Select</option>
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                            </Form.Select>
                        </Form.Group>
                        <div className="miniSpace"></div>
                        <Form.Group>
                            <Form.Label>Pet Weight (lbs)</Form.Label>
                            <Form.Control
                                value={extraInfo.petWeight}
                                type="number"
                                onChange={(e) => {
                                    console.log(extraInfo);
                                    setExtraInfo({
                                        ...extraInfo,
                                        petWeight: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                        <div className="miniSpace"></div>
                        <Form.Group>
                            <Form.Label>Temper</Form.Label>
                            <br />
                            <Form.Text>
                                Describe your pet's temperament.
                            </Form.Text>
                            <Form.Control
                                type="text"
                                onChange={(e) => {
                                    setExtraInfo({
                                        ...extraInfo,
                                        temper: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                        <div className="miniSpace"></div>
                        <Form.Group>
                            <Form.Label>Equipment</Form.Label>
                            <Form.Control
                                value={extraInfo.equipment}
                                type="text"
                                rows={3}
                                placeholder="List accessories being provided to the helper You have for them to Use"
                                as="textarea"
                                onChange={(e) => {
                                    setExtraInfo({
                                        ...extraInfo,
                                        equipment: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                        <div className="miniSpace"></div>
                        <Button variant="primary" type="submit">
                            Post
                        </Button>
                    </Form>
                </div>
            </div>
        );
    } else if (info.category == "movingHelp") {
        return (
            <div>
                <div className="Spacer2"></div>
                <h1 id="postJobTitle">Post a Job</h1>
                <div className="jobPostForm">
                    <Form
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        <div className="Spacer"></div>
                        <Form.Group>
                            <Form.Label>Job Category</Form.Label>
                            <Form.Select
                                value={info.category}
                                onChange={(e) => {
                                    setInfo({
                                        ...info,
                                        category: e.target.value,
                                        state: currentUser.location,
                                        postedBy: currentUser._id,
                                    });
                                }}
                            >
                                <option>Select a Category</option>
                                <option value="landscaping">Landscaping</option>
                                <option value="homeCleaning">
                                    Home Cleaning
                                </option>
                                <option value="petCare">Pet Care</option>
                                <option value="movingHelp">Moving Help</option>
                                <option value="miscellaneous">
                                    Miscellaneous
                                </option>
                            </Form.Select>
                        </Form.Group>

                        <div className="Spacer"></div>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                value={info.address}
                                type="text"
                                onChange={(e) => {
                                    setInfo({
                                        ...info,
                                        address: e.target.value,
                                    });
                                }}
                            />
                            <Form.Text>
                                The specific address of the Job with the town.
                            </Form.Text>
                        </Form.Group>
                        <div className="Spacer"></div>
                        <div id="priceInput">
                            <Form.Group>
                                <div id="priceLabel">
                                    <Form.Label>Price</Form.Label>
                                </div>
                                <p id="dolla">$</p>
                                <div id="priceControl">
                                    <Form.Control
                                        type="number"
                                        size="sm"
                                        onChange={(e) => {
                                            setInfo({
                                                ...info,
                                                price: e.target.value,
                                            });
                                        }}
                                        value={info.price}
                                    />
                                </div>
                                <Form.Text>Minimum $20.00</Form.Text>
                                <div>
                                    <Form.Text>
                                        <p id="note">
                                            NOTE: When the job displays, it will
                                            show {parseInt(info.price) * 0.9}{" "}
                                        </p>
                                    </Form.Text>
                                </div>
                            </Form.Group>
                        </div>
                        <Form.Group id="descriptionInput">
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
                        <Form.Group>
                            <Form.Label>Estimated Time</Form.Label>
                            <Form.Control
                                value={extraInfo.estimatedTime}
                                type="text"
                                onChange={(e) => {
                                    setExtraInfo({
                                        ...extraInfo,
                                        estimatedTime: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                        <div className="miniSpace"></div>
                        <Form.Group>
                            <Form.Label>Max Weight</Form.Label>
                            <Form.Text>
                                The weight of the biggest box(estimate: lbs)
                            </Form.Text>
                            <Form.Control
                                value={extraInfo.maxWeight}
                                type="number"
                                onChange={(e) => {
                                    setExtraInfo({
                                        ...extraInfo,
                                        maxWeight: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                        <div className="miniSpace"></div>
                        <Button variant="primary" type="submit">
                            Post
                        </Button>
                    </Form>
                </div>
            </div>
        );
    } else {
        return (
            <div id="initialCategory">
                <h1>Select a Category</h1>
                <Form.Group>
                    <Form.Label>Job Category</Form.Label>
                    <Form.Select
                        value={info.category}
                        onChange={(e) => {
                            setInfo({
                                ...info,
                                category: e.target.value,
                                state: currentUser.location,
                                postedBy: currentUser._id,
                            });
                        }}
                    >
                        <option>Select a Category</option>
                        <option value="landscaping">Landscaping</option>
                        <option value="homeCleaning">Home Cleaning</option>
                        <option value="petCare">Pet Care</option>
                        <option value="movingHelp">Moving Help</option>
                        <option value="miscellaneous">Miscellaneous</option>
                    </Form.Select>
                </Form.Group>
            </div>
        );
    }
}
