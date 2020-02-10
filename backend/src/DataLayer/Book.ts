import { APIGatewayProxyEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import * as AWSXRAY from 'aws-xray-sdk';
import { getUserId } from "../lambda/utils";
import { CreateBookRequest } from "../requests/CreateBookRequest";
import * as uuid from 'uuid';
import {UpdateBookRequest} from "../requests/UpdateBookRequest";

const XAWS = AWSXRAY.captureAWS(AWS);
const TABLE_NAME = process.env.BOOKS_TABLE;
const BUCKET = process.env.S3_BUCKET;

const docClient = new XAWS.DynamoDB.DocumentClient;

export async function getBooks(event:APIGatewayProxyEvent) {
    const response = await docClient.query({
        TableName: TABLE_NAME,
        IndexName: process.env.USER_ID_INDEX,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': getUserId(event)
        }
    }).promise();

    return response.Items
}

export async function createBook(data: CreateBookRequest, event:APIGatewayProxyEvent) {
    const bookId = uuid.v4();

    const book = {
        userId: getUserId(event),
        bookId: bookId,
        createdAt: (new Date()).toISOString(),
        title: data.title,
        subTitle: data.subTitle,
        author: data.author,
        description: data.description,
        coverImgUrl: data.coverImgUrl || getUploadUrl(bookId).split('?')[0]
    };

    const signedUrl = getUploadUrl(book.bookId);

    await docClient.put({
        TableName: TABLE_NAME,
        Item: book
    }).promise();

    return { book, signedUrl }
}

export async function updateBook(data:UpdateBookRequest, bookId:string, event:APIGatewayProxyEvent) {
    const response = await docClient.update({
        TableName: TABLE_NAME,
        Key: {
            userId: getUserId(event),
            bookId: bookId
        },
        UpdateExpression: 'set title = :title, subTitle = :subTitle, author = :author, description = :description',
        ExpressionAttributeValues: {
            ':title': data.title,
            ':subTitle': data.subTitle,
            ':author': data.author,
            ':description': data.description
        },
        ReturnValues: 'UPDATED_NEW'
    }).promise();

    return response
}


export async function deleteBook(bookId:string, event:APIGatewayProxyEvent) {
    const response = await docClient.delete({
        TableName: TABLE_NAME,
        Key: {
            userId: getUserId(event),
            bookId: bookId
        }
    }).promise();

    return response
}

export function getUploadUrl(bookId: string) {
    const s3 = new XAWS.S3({ signatureVersion: 'v4'});
    const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION);

    return s3.getSignedUrl('putObject', {
        Bucket: BUCKET,
        Key: bookId,
        Expires: urlExpiration
    })
}

export async function updateUrl(bookId: string, event:APIGatewayProxyEvent, url: string){
    return await docClient.update({
        TableName: TABLE_NAME,
        Key: {
            bookId: bookId,
            userId: getUserId(event)
        },
        UpdateExpression: 'set coverImgUrl = :uploadUrl',
        ExpressionAttributeValues: {
            ':uploadUrl': url
        },
        ReturnValues: "UPDATED_NEW"
    }).promise()
}

export async function bookExists(bookId: string, event:APIGatewayProxyEvent) {
    const response = await docClient.get({
        TableName: TABLE_NAME,
        Key: {
            bookId: bookId,
            userId: getUserId(event)
        }
    }).promise();

    return !!response.Item
}
