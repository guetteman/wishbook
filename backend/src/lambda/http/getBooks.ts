import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getBooks } from '../../DataLayer/Book'
import { createLogger } from '../../utils/logger'
import { getResponseHeaders } from '../utils'

const logger = createLogger('getBooks');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const books = await getBooks(event);

    if (!books) {
        const errorMessage = 'Unable to get to do\'s';

        logger.error(errorMessage);

        return {
            headers: getResponseHeaders(),
            statusCode: 404,
            body: JSON.stringify({message: errorMessage})
        }
    }

    logger.info('Books:', books);

    return {
        statusCode: 200,
        headers: getResponseHeaders(),
        body: JSON.stringify({items: books})
    }
};