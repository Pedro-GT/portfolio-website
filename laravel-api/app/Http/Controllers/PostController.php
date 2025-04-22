<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        // Apply sanctum auth middleware to write actions
        $this->middleware('auth:sanctum')->only(['store', 'update', 'destroy', 'drafts']);
    }

    /**
     * Display a listing of posts.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::latest()->get();
        
        return response()->json([
            'status' => 'success',
            'data' => $posts
        ], 200);
    }

    /**
     * Store a newly created post in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'slug' => 'nullable|string|max:255|unique:posts',
            'published_at' => 'nullable|date'
        ]);

        // Generate slug from title if not provided
        $slug = $request->slug ?? Str::slug($request->title);
        
        $post = Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'slug' => $slug,
            'published_at' => $request->published_at,
            'user_id' => $request->user()->id, // Associate with authenticated user
        ]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Post created successfully',
            'data' => $post
        ], 201);
    }

    /**
     * Display the specified post.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return response()->json([
            'status' => 'success',
            'data' => $post
        ], 200);
    }

    /**
     * Update the specified post in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        // Check if the user is the owner of the post
        if ($request->user()->id !== $post->user_id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 403);
        }
        
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'slug' => 'nullable|string|max:255|unique:posts,slug,' . $post->id,
            'published_at' => 'nullable|date'
        ]);
        
        $post->update($request->all());
        
        return response()->json([
            'status' => 'success',
            'message' => 'Post updated successfully',
            'data' => $post
        ], 200);
    }

    /**
     * Remove the specified post from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Post $post)
    {
        // Check if the user is the owner of the post
        if ($request->user()->id !== $post->user_id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 403);
        }
        
        $post->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Post deleted successfully'
        ], 200);
    }

    /**
     * Display a listing of published posts.
     *
     * @return \Illuminate\Http\Response
     */
    public function published()
    {
        $posts = Post::whereNotNull('published_at')
                    ->where('published_at', '<=', now())
                    ->latest('published_at')
                    ->get();
                    
        return response()->json([
            'status' => 'success',
            'data' => $posts
        ], 200);
    }

    /**
     * Display a listing of draft posts.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function drafts(Request $request)
    {
        $posts = Post::where('user_id', $request->user()->id)
                    ->whereNull('published_at')
                    ->latest()
                    ->get();
                    
        return response()->json([
            'status' => 'success',
            'data' => $posts
        ], 200);
    }
}