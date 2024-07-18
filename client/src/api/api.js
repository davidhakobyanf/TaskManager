import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000', // Assuming your server runs on localhost:8000
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

class DataApi {
    static async fetchTasks() {
        try {
            const response = await instance.get('/', {
                headers: {
                    'Authorization': `Bearer `,
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    static async addTask(task) {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await instance.post('/', task, { headers });
            return response; // Return the full response
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    static async updateTask(task) {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await instance.put('/', task, { headers });
            return response; // Return the full response
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    static async deleteTask(id) {
        try {
            const headers = {
                Authorization: `Bearer`,
                'Content-Type': 'application/json',
            };
            const response = await instance.request({
                url: '/',
                method: 'delete',
                headers,
                data: {
                    id: id,
                },
            });
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default DataApi;
