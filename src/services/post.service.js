import http from "./http-common";

const getAll = () => {
    return http.get("/posts");
};

const addPost = (payload) => {
    return http.post("/posts", payload);
}
const updatePost = (payload) => {
    return http.put(`posts/${payload.id}`, payload);
}

const deletePost = (payload) => {
    return http.delete(`/posts/${payload.id}`);
}

const getPost = (payload) => {
    return http.get(`/posts/${payload.id}`);
}

export default {
    getAll,
    addPost,
    deletePost,
    getPost,
    updatePost
}