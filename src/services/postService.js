import API from "./api";

export const postService = {
    getAllposts: (page=0, size=10, search="") => API.get(`/posts?page=${page}&size=${size}&search=${search}`),
    getPostById: (id) => API.get(`/posts/${id}`),
    createPost: (data) => API.post('/posts', data),
    updatePost: (id, data) => API.put(`/posts/${id}`, data),
    deletePost: (id) => API.delete(`/posts/${id}`),
    getPostsByTag: (tagId) => API.get(`/posts/${tagId}/posts`),
}