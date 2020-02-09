import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateBookRequest } from '../../requests/CreateBookRequest'
import { createBook } from '../../DataLayer/Book'
import { createLogger } from '../../utils/logger'
import { getResponseHeaders } from '../utils'

const logger = createLogger('createBook');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newBookData: CreateBookRequest = JSON.parse(event.body);
    logger.info(newBookData);
    const newBook = await createBook(newBookData, event);

    if (!newBook) {
        const errorMessage = 'Unable to create book';

        logger.error(errorMessage);

        return {
            headers: getResponseHeaders(),
            statusCode: 422,
            body: JSON.stringify({message: errorMessage})
        }
    }

    logger.info(newBook);

    return {
        statusCode: 200,
        headers: getResponseHeaders(),
        body: JSON.stringify({item: newBook})
    }
};