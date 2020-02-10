import axios from 'axios';

const apiEndpoint = 'http://openlibrary.org/search.json';

export async function search(query) {
    const response = await axios.get(`${apiEndpoint}`, {
        params: {
            q: query,
            limit: 10
        }
    });

    return response.data.docs;
}