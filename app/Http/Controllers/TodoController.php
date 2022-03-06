<?php

namespace App\Http\Controllers;

use App\Helpers\Res;
use App\Http\Requests\TodoRequest;
use App\Http\Resources\AirportResource;
use App\Models\Airport;
use App\Models\Todo;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TodoController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return Res::success("Todos fetched successfully", Todo::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * @param TodoRequest $request
     * @return JsonResponse
     */
    public function store(TodoRequest $request): JsonResponse
    {
        try {
            $todo = new Todo();
            $todo->fill($request->all());
            $todo->save();

            return Res::success('Todo created successfully', Todo::all());
        } catch (Exception $exception) {
            return Res::validationError('Unable to create todo', [$exception->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param TodoRequest $request
     * @param int $id
     * @return Response
     */
    public function update(TodoRequest $request, $id)
    {
        //
        dd('update');
    }

    /**
     * @param Todo $todo
     * @return JsonResponse
     */
    public function destroy(Todo $todo): JsonResponse
    {
        try {
            $todo->delete();

            return Res::success('Todo Deleted Successfully', $todo);
        } catch (Exception $exception) {
            return Res::validationError('Unable to delete todo', [$exception->getMessage()]);
        }
    }
}
