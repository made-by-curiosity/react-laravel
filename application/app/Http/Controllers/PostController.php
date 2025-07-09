<?php

namespace App\Http\Controllers;

use App\Http\Requests\Post\PostStoreRequest;
use App\Http\Requests\Post\PostUpdateRequest;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PostController extends Controller
{
    public function index()
    {
        $posts = Auth::user()->posts()->latest()->get();

        return response()->json([
            'posts' => $posts,
        ], Response::HTTP_OK);
    }

    public  function store (PostStoreRequest $request)
    {
        $post = Auth::user()->posts()->create($request->validated());

        return response()->json([
            'post' => $post,
        ], Response::HTTP_CREATED);
    }

    public  function show (int $id)
    {
        try {
            $post = Auth::user()->posts()->findOrFail($id);

            return response()->json([
                'post' => $post,
            ], Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Post not found.',
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public  function update (PostUpdateRequest $request, int $id)
    {
        try {
            $post = Auth::user()->posts()->findOrFail($id);
            $post->update($request->validated());

            return response()->json([
                'post' => $post,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Post not found.',
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public  function destroy ($id)
    {
        try {
            $post = Auth::user()->posts()->findOrFail($id);
            $post->delete();

            return response()->json(null, Response::HTTP_NO_CONTENT);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Post not found.',
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
