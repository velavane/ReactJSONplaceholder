import React, { useState, useEffect, Fragment } from "react";
import { Link } from 'react-router-dom'
import { Button, Modal, Row, Col, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Pagination from "react-js-pagination";

import DataService from "../services/post.service";

const List = () => {

    const history = useHistory();
    const [lists, setList] = useState({ fullList: [], list: [], activePage: 1 });
    const [deleteData, setShow] = useState({ showModal: false, selectedObject: {} });
    const [loading, setLoad] = useState(false);
    const [postData, setPost] = useState({ showPost: false, selectedPost: {} });

    useEffect(() => {
        getAllPost();
    }, [])

    // to get posts list
    const getAllPost = () => {
        setLoad(true);
        DataService.getAll().then(response => {
            setLoad(false);
            setList(prevState => ({
                fullList: response.data,
                count: response.data.length,
                list: response.data.slice(0, 10),
                activePage: 1
            }));
            console.log(response.data);
        }).catch(e => {
            setLoad(false);
            toast.error("Failed to get posts");
            console.log(e);
        })
    }
    // for delete confirmation modal
    const handleClose = () => {
        setShow(prevState => ({
            ...prevState,
            showModal: false
        }));
    };
    const handleShow = (item) => {
        setShow(prevState => ({
            selectedObject: item,
            showModal: true
        }));
    };
    // for deleting post
    const deletePost = () => {
        setLoad(true);
        const payload = {
            id: deleteData.selectedObject.id
        }
        DataService.deletePost(payload).then(response => {
            setLoad(false);
            handleClose();
            toast.success("Post deleted successfully");
            getAllPost();
        }).catch(e => {
            setLoad(false);
            toast.error("Failed to delete post");
            console.log(e);
        })
    }
    // for view post show and hide
    const hidePost = () => {
        setPost(prevState => ({
            ...prevState,
            showPost: false
        }));
    }
    const openModal = (item) => {
        setPost(prevState => ({
            selectedPost: item,
            showPost: true
        }));
    }
    // for pagination change
    const handlePageChange = (item) => {
        var number = item - 1;
        setList(prevState => ({
            ...prevState,
            list: lists.fullList.slice(number * 10, ((number * 10) + 10)),
            activePage: item
        }));
    }
    // for edit post
    const editPost = (item) => {
        history.push("/edit/" + item.id);
    }

    return (
        <Fragment>
            <div className="container p-3 p-md-4">
                <div className="col-12 ">
                    <div className="d-flex pb-4 justify-content-between">
                        <h2 className="pb-0 mb-0 text-light">Post List</h2>
                        <Link to="/add">
                            <button className="btn btn-success">Add Post</button>
                        </Link>
                    </div>

                    <ul className="list-group text-left">
                        {lists.list &&
                            lists.list.map((item, index) => (
                                <li
                                    className=
                                    "list-group-item"
                                    key={index}
                                >
                                    <div className="row align-items-start p-3">
                                        <div className="col-12 col-md-10">
                                            <h4>
                                                {item.title}
                                            </h4>
                                            <span> {item.body}</span>

                                        </div>
                                        <div className="col-12 col-md-2 text-right">
                                            {/* d-flex */}
                                            <i className="fas fa-eye pr-2 pr-md-2 cursor" onClick={() => openModal(item)}></i>
                                            <i className="fas text-primary fa-edit pr-2 pr-md-2 cursor" onClick={() => editPost(item)}></i>
                                            <i className="fas text-danger fa-trash-alt cursor" onClick={() => handleShow(item)}></i>
                                        </div>
                                    </div>
                                </li>

                            ))}
                    </ul>
                </div>
                {lists.count &&
                    <Col className="d-flex justify-content-center">
                        <Pagination
                            activePage={lists.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={lists.count}
                            itemClass="page-item pt-4 text-right"
                            linkClass="page-link"
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}
                        />
                    </Col>

                }

                <Modal show={deleteData.showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel</Button>
                        <Button variant="danger" onClick={deletePost}>
                            {loading && <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />}
                            Delete </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={postData.showPost} onHide={hidePost}>
                    <Modal.Header closeButton>
                        <Modal.Title>View Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col> <h4>{postData.selectedPost.title} </h4>
                            </Col>

                        </Row>
                        <Row>
                            <Col> <span>  {postData.selectedPost.body}
                            </span>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={hidePost}>
                            Close </Button>
                    </Modal.Footer>
                </Modal>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={true}
                />
            </div>
        </Fragment>


    )

}
export default List;
