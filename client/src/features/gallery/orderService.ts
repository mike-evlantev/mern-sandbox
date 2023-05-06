import axios from "axios";
import { GalleryOrder } from "../../types/GalleryOrder";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";
import { narrowError } from "../../utils/errorUtils";

const API_URL = `${process.env.REACT_APP_API_DOMAIN}/api/gallery`;

const getOrders = async (dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Promise<GalleryOrder[] | undefined> => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": JSON.parse(localStorage.getItem('user') as string)?.token
            },
        };
    
        const data = await axios
            .get(`${API_URL}/orders`, config)
            .then(response => response.data)
            .catch((error) => {
                console.error(error);
                if (error.response.status === 401 || error.response.status === 403) {
                    dispatch(logout());
                }
            });
        return data;
    } catch (error) {
        const message = narrowError(error);
        //dispatch(alert({text: message, type: "danger"}));
        console.error('Could not get orders', message);
    }   
}

const add = async (order: Partial<GalleryOrder>) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": JSON.parse(localStorage.getItem('user') as string)?.token
        },
    };
    
    const { data } = await axios.post(`${API_URL}/orders`, order, config);
    console.log('service result', data);
    return data;
}

const update = async (order: Partial<GalleryOrder>) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": JSON.parse(localStorage.getItem('user') as string)?.token
        },
    };
    
    const { data } = await axios.post(`${API_URL}/orders/update`, order, config);

    return data;
}

export const orderService = { getOrders, add, update };