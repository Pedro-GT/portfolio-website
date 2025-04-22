<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostViewController extends BaseController
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        // Apply auth middleware to write actions
        $this->middleware('auth:sanctum')->except(['index', 'show', 'getBySource']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::whereNotNull('published_at')
                    ->where('published_at', '<=', now())
                    ->latest('published_at')
                    ->paginate(10);
                    
        return view('posts.index', compact('posts'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('posts.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'required|string|max:300',
            'source' => 'required|string|max:255',
            'published_at' => 'nullable|date'

        ]);

        $post = Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'slug' => Str::slug($request->title),
            'source' => $request->source,
            'excerpt' => $request->excerpt,
            'published_at' => $request->published_at,
            'user_id' => $request->user()->id,
        ]);

        return redirect()->route('posts.show', $post)
            ->with('success', 'Post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {

        
        return view('posts.show', compact('post'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        
        return view('posts.edit', compact('post'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'source' => 'nullable|string|max:255',
            'excerpt' => 'required|string|max:300',
            'published_at' => 'nullable|date'
        ]);
        
        $post->update([
            'title' => $request->title,
            'content' => $request->content,
            'source' => $request->source,
            'excerpt' => $request->excerpt,
            'published_at' => $request->published_at,
        ]);
        
        return redirect()->route('posts.show', $post)
            ->with('success', 'Post updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {

        
        $post->delete();
        
        return redirect()->route('posts.index');
    }

    /**
     * Display posts from a specific source.
     */
    public function getBySource(string $source)
    {
        $posts = Post::where('source', $source)
                   ->whereNotNull('published_at')
                   ->where('published_at', '<=', now())
                   ->latest('published_at')
                   ->paginate(10);
                   
        return view('posts.source', compact('posts', 'source'));
    }
}