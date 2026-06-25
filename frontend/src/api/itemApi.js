import axiosInstance from "./axios";

export const addDish = async (enterddata) => {
    try {
        const response = await axiosInstance.post('/api/add-item', enterddata);

        return response.data
    } catch (error) {
        return error
    }
};

export const getDish = async () => {
    try {
        const response = await axiosInstance.get('/api/get-item')
        return response.data;
    } catch (error) {
        return error
    }
}