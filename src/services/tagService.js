import API from "./api";

export const tagServive = {
    getAllTags: () => API.get('/tags'),
    getTagById: (id) => API.get(`/tags/${id}`),
    createTag: (data) => API.post('/tags', data),
    updateTag: (id, data) => API.patch(`/tags/${id}`, data),
    deleteTag: (id) => API.delete(`/tags/${id}`),
    getPostsByTag: (tagId) => API.get(`/tags/${tagId}/posts`),
}