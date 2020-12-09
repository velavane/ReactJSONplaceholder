import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Breadcrumb, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';

import DataService from "../services/post.service";

const Edit = () => {

    const [validated, setValidated] = useState(false);
    const [input, setInputs] = useState({ title: '', body: '', id: '', userId: '' });
    const [loading, setLoad] = useState(false);
    const history = useHistory();
    const params = useParams();


    useEffect(() => {
        getSinglePost(params);
    }, [])

    const getSinglePost = (params) => {
        DataService.getPost(params).then(res => {
            setInputs(prevInput => ({
                title: res.data.title,
                body: res.data.body,
                id: res.data.id,
                userId: res.data.userId,
            }));

        }).catch(e => {
            toast.error('Failed to get post');
        })
    }

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
                    'userId': input.userId,
                    'id': input.id
                }
                setLoad(true);
                DataService.updatePost(payload).then(res => {
                    setLoad(false);
                    toast.success('Post updated successfully');
                    setTimeout(() => {
                        redirecToHome();
                    }, 2000)
                }).catch(e => {
                    setLoad(false);
                    toast.error('Failed to update post');
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
                <Breadcrumb.Item active>Edit</Breadcrumb.Item>
            </Breadcrumb>
            <Row className="pb-4">
                <Col><h2 className="pb-0 mb-0 text-left text-light">Edit Post</h2></Col>
            </Row>
            <Row >
                <Col>
                    <Form className="border-style p-4 text-left" noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label className="text-light">Title</Form.Label>
                            <Form.Control required type="text" onChange={handleInputChange} value={input.title} name="title" placeholder="Enter Title" />
                            <Form.Control.Feedback type="invalid">Title is required</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="body">
                            <Form.Label className="text-light">Body</Form.Label>
                            <Form.Control required as="textarea" rows={6} onChange={handleInputChange} value={input.body} name="body" placeholder="Enter Body" />
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
                                    Update</Button>
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
export default Edit;

