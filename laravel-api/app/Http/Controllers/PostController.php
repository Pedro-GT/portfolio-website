<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
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
     * Get posts by source.
     *
     * @param  string  $source
     * @return \Illuminate\Http\Response
     */
    public function getBySource($source)
    {
        $posts = Post::where('source', $source)->latest()->get();
        
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
            'excerpt' => 'required|string|max:300',
            'source' => 'required|string|max:50',
            'published_at' => 'nullable|date'
        ]);

        // Generate slug from title if not provided
        $slug = $request->slug ?? Str::slug($request->title);
        
        // Make sure slug is unique
        $originalSlug = $slug;
        $count = 1;
        
        while (Post::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }

        $post = Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'slug' => $slug,
            'excerpt' => $request->excerpt,
            'source' => $request->source,
            'published_at' => $request->published_at
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
     * @param  string  $identifier
     * @return \Illuminate\Http\Response
     */
    public function show($identifier)
    {
        // Find post by ID or slug
        $post = is_numeric($identifier) ? 
                Post::find($identifier) : 
                Post::where('slug', $identifier)->first();
        
        if (!$post) {
            return response()->json([
                'status' => 'error',
                'message' => 'Post not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $post
        ], 200);
    }

    /**
     * Update the specified post in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $post = Post::find($id);
        
        if (!$post) {
            return response()->json([
                'status' => 'error',
                'message' => 'Post not found'
            ], 404);
        }

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'excerpt' => 'sometimes|string|max:300',
            'source' => 'sometimes|string|max:50',
            'slug' => 'sometimes|string|max:255|unique:posts,slug,' . $post->id,
            'published_at' => 'nullable|date'
        ]);

        // Generate new slug if title is updated but slug isn't provided
        if ($request->has('title') && !$request->has('slug')) {
            $slug = Str::slug($request->title);
            
            // Make sure slug is unique
            $originalSlug = $slug;
            $count = 1;
            
            while (Post::where('slug', $slug)->where('id', '!=', $post->id)->exists()) {
                $slug = $originalSlug . '-' . $count++;
            }
            
            $request->merge(['slug' => $slug]);
        }

        $post->update($request->only(['title', 'content','excerpt', 'slug', 'published_at']));

        return response()->json([
            'status' => 'success',
            'message' => 'Post updated successfully',
            'data' => $post
        ], 200);
    }

    /**
     * Remove the specified post from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        
        if (!$post) {
            return response()->json([
                'status' => 'error',
                'message' => 'Post not found'
            ], 404);
        }

        $post->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Post deleted successfully'
        ], 200);
    }

    /**
     * Get only published posts.
     *
     * @return \Illuminate\Http\Response
     */
    public function published()
    {
        $posts = Post::published()->latest('published_at')->get();
        
        return response()->json([
            'status' => 'success',
            'data' => $posts
        ], 200);
    }

    /**
     * Get only draft posts.
     *
     * @return \Illuminate\Http\Response
     */
    public function drafts()
    {
        $posts = Post::draft()->latest()->get();
        
        return response()->json([
            'status' => 'success',
            'data' => $posts
        ], 200);
    }
}