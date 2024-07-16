import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000', // Assuming your server runs on localhost:8000
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

class DataApi {
    static async getAllTasks() {
        try {
            const response = await instance.get('/');
            return response.data;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw new Error('Failed to fetch tasks');
        }
    }

    static async addTask(task) {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await instance.post('/', task, { headers });
            return response.data;
        } catch (error) {
            console.error('Error adding task:', error);
            throw new Error('Failed to add task');
        }
    }

    static async updateTask(task) {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await instance.put('/', task, { headers });
            return response.data;
        } catch (error) {
            console.error('Error updating task:', error);
            throw new Error('Failed to update task');
        }
    }

    static async deleteTask(id) {
        try {
            const response = await instance.delete(`/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting task:', error);
            throw new Error('Failed to delete task');
        }
    }
}

export default DataApi;
