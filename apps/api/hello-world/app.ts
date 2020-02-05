import { Context } from 'aws-lambda';

export const handler = (event: any, context: Context) => {
    try {
        const response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                // location: ret.data.trim()
            })
        };

        return response;

    } catch (err) {
        console.log(err);
        return err;
    }
}