<?php

namespace App\Helpers;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;

class Res
{
    public static function success($message = 'Ok', $data = null, $code = 200, $meta = null)
    {
        $code = $code === 201 ? 201 : 200;

        return self::send($message, $code, $data, null, $meta);
    }

    public static function error($message = 'Something went wrong', $errors = [])
    {
        return self::send($message, 500, null, $errors);
    }

    public static function validationError($message = 'Validation Error', $errors = [])
    {
        return self::send($message, 422, null, $errors);
    }

    public static function unauthenticated($message = 'Unauthenticated')
    {
        return self::send($message, 401);
    }

    public static function unauthorize($message = 'Unauthorized')
    {
        return self::send($message, 403);
    }

    public static function notFound($message = 'Record not found')
    {
        return self::send($message, 404);
    }

    public static function paymentRequired($message = 'Payment Required')
    {
        return self::send($message, 402);
    }

    public static function badRequest()
    {
        return self::send('Bad request', 400);
    }

    public static function send(
        string $message = 'Ok',
        int $statusCode = 200,
        $data = null,
        array $errors = null,
        array $meta = null
    ) {
        $response = [
            'message' => $message,
        ];

        if (!empty($meta)) {
            $response['meta'] = $meta;
        }

        if (isset($data) || $data === null) {
            if ($data instanceof LengthAwarePaginator) {
                $paginate = $data->toArray();
                $response['data'] = $paginate['data'];
                $response['meta']['pagination'] = Arr::except($paginate, 'data');
            } else {
                $response['data'] = $data;
            }
        }

        if (isset($errors)) {
            $response['errors'] = $errors;
            $response['message'] = !empty($errors[0]) ? $errors[0] : $message;
        }

        return response()->json($response, $statusCode);
    }
}
