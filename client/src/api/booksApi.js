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

export async function getBooks(idToken) {
    const response = await axios.get(`${apiEndpoint}/books`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        },
    });

    console.log('Books:', response.data);

    return response.data.items;
}

export async function uploadCoverImg(uploadUrl, file) {
    return await axios.put(uploadUrl, file);
}