import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateBookRequest } from '../../requests/UpdateBookRequest'
import { updateBook } from '../../DataLayer/Book'
import { createLogger } from '../../utils/logger'
import { getResponseHeaders } from '../utils'

const logger = createLogger('updateBook');


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId;
    const todoData: UpdateBookRequest = JSON.parse(event.body);

    const updatedBook = await updateBook(todoData, todoId, event);

    if (!updatedBook) {
        const errorMessage = 'Unable to update book';

        logger.error(errorMessage);

        return {
            headers: getResponseHeaders(),
            statusCode: 422,
            body: JSON.stringify({message: errorMessage})
        }
    }

    logger.info('Updated book:', updatedBook);

    return {
        statusCode: 200,
        headers: getResponseHeaders(),
        body: JSON.stringify({item: updatedBook})
    }
};