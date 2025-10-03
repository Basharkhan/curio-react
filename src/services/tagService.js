import API from "./api";

export const tagServive = {
    getAllTags: (page=0, size=10, search="") => API.get(`/tags?page=${page}&size=${size}&search=${search}`),
    getTagById: (id) => API.get(`/tags/${id}`),
    createTag: (data) => API.post('/tags', data),
    updateTag: (id, data) => API.patch(`/tags/${id}`, data),
    deleteTag: (id) => API.delete(`/tags/${id}`),
    getPostsByTag: (tagId) => API.get(`/tags/${tagId}/posts`),
}