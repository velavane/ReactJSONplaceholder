import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Breadcrumb, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import DataService from "../services/post.service";

const Add = () => {

    const [validated, setValidated] = useState(false);
    const [input, setInputs] = useState({ title: '', body: '' });
    const [loading, setLoad] = useState(false);
    const history = useHistory();

    const handleInputChange = (event) => {
        event.persist();
        setInputs(input => ({ ...input, [event.target.name]: event.target.value }));
    }
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            if (event) {
                event.preventDefault();
                const payload = {
                    'title': input.title,
                    'body': input.body,
                    userId: 1
                }
                setLoad(true);
                DataService.addPost(payload).then(res => {
                    setLoad(false);
                    toast.success('Post added successfully');
                    setTimeout(() => {
                        redirecToHome();
                    }, 2000);
                }).catch(e => {
                    setLoad(false);
                    toast.error('Failed to add post');
                })
            }
        }
    }
    const redirecToHome = () => {
        history.push("/");
    }

    return (
        <Container>
            <Breadcrumb className="pt-4">
                <Breadcrumb.Item href="/">Post</Breadcrumb.Item>
                <Breadcrumb.Item active>Add</Breadcrumb.Item>
            </Breadcrumb>
            <Row className="pb-4 ">
                <Col><h2 className="pb-0 mb-0 text-left text-light">Add Post</h2></Col>
            </Row>
            <Row>
                <Col>
                    <Form className="border-style p-4 text-left" noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label className="text-light">Title</Form.Label>
                            <Form.Control required type="text" onChange={handleInputChange} value={input.title} name="title" placeholder="Enter Title" />
                            <Form.Control.Feedback type="invalid">Title is required</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="body">
                            <Form.Label className="text-light">Body</Form.Label>
                            <Form.Control required as="textarea" rows={3} onChange={handleInputChange} value={input.body} name="body" placeholder="Enter Body" />
                            <Form.Control.Feedback type="invalid">Body is required</Form.Control.Feedback>
                        </Form.Group>

                        <Row>
                            <Col className="text-right">
                                <Button variant="secondary" type="button" onClick={redirecToHome} className="mr-2">
                                    Cancel</Button>
                                <Button variant="primary" type="submit">
                                    {loading && <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />}

                                    Add</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={true}
            />
        </Container>

    )

}
export default Add;

