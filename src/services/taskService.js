import api from './api'

const taskService = {
  getAll: () => api.get('/tasks'),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  remove: (id) => api.delete(`/tasks/${id}`),
}

export default taskService