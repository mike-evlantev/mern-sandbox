import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_DOMAIN}/api/payments`;

const config = async () => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": JSON.parse(localStorage.getItem('user') as string)?.token
        },
    };

    const { data } = await axios.get(`${API_URL}/config`, config);

    return data;
}

const createPaymentIntent = async (amount: number) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": JSON.parse(localStorage.getItem('user') as string)?.token
        },
    };

    const { data } = await axios.post(`${API_URL}/createPaymentIntent`, {amount}, config);
    return data;
} 

export const stripeService = { config, createPaymentIntent };