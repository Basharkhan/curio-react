import API from "./api";

export const categoryService = {
    getAllCategories: (page=0, size=10, search="") => API.get(`/categories?page=${page}&size=${size}&search=${search}`),
    // getTagById: (id) => API.get(`/tags/${id}`),
    createCategory: (data) => API.post('/categories', data),
    updateCategory: (id, data) => API.patch(`/categories/${id}`, data),
    deleteCategory: (id) => API.delete(`/categories/${id}`),
    // getPostsByTag: (tagId) => API.get(`/tags/${tagId}/posts`),
}