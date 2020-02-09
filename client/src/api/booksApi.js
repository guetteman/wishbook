import axios from 'axios';

import {apiEndpoint} from "../../config";

export async function createBook(idToken, newBook) {
    const response = await axios.post(`${apiEndpoint}/books`,  JSON.stringify(newBook), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    });
    return response.data.item;
}