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
            // Handle the error as needed, or rethrow it if further handling is required.
            throw error;
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

            console.log(`"${id}"`,'id')
            console.log(response,'response')

            return response;
        } catch (error) {
            console.error(error);
            // Handle the error as needed, or rethrow it if further handling is required.
            throw error;
        }
    }
}

export default DataApi;
