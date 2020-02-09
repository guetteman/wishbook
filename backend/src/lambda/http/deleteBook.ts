import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteBook } from '../../DataLayer/Book'
import { createLogger } from '../../utils/logger'
import { getResponseHeaders } from '../utils'

const logger = createLogger('deleteBook');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const bookId = event.pathParameters.bookId;

    const response = await deleteBook(bookId, event);

    logger.info(response);

    if (!response) {
        const errorMessage = 'Unable to delete book';

        logger.error(errorMessage);

        return {
            headers: getResponseHeaders(),
            statusCode: 422,
            body: JSON.stringify({message: errorMessage})
        }
    }

    return {
        statusCode: 200,
        headers: getResponseHeaders(),
        body: 'Book deleted'
    }
};