<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostViewController extends Controller
{
    /**
     * Display a listing of the posts.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $posts = Post::latest()->get();
        return view('posts.index', compact('posts'));
    }
    /**
     * Display a listing of posts filtered by source.
     *
     * @param  string  $source
     * @return \Illuminate\View\View
     */
    public function getBySource($source)
    {
        $posts = Post::where('source', $source)->latest()->get();
        return view('posts.index', compact('posts'));
    }
    /**
     * Show the form for creating a new post.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('posts.create');
    }

    /**
     * Store a newly created post in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'slug' => 'nullable|string|max:255|unique:posts',
            'source' => 'required|string|max:50', 
            'excerpt' => 'required|string|max:300',
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
            'source' => $request->source,
            'excerpt' => $request->excerpt,
            'published_at' => $request->published_at
        ]);

        return redirect()->route('posts.index')
            ->with('success', 'Post created successfully');
    }

    /**
     * Display the specified post.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function show($id)
    {
        $post = Post::findOrFail($id);
        return view('posts.show', compact('post'));
    }

    /**
     * Show the form for editing the specified post.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function edit($id)
    {
        $post = Post::findOrFail($id);
        return view('posts.edit', compact('post'));
    }

    /**
     * Update the specified post in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'required|string|max:300',
            'source' => 'required|string|max:50',
            'slug' => 'nullable|string|max:255|unique:posts,slug,' . $id,
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

        $post->update($request->only(['title', 'content', 'excerpt', 'slug', 'published_at']));

        return redirect()->route('posts.index')
            ->with('success', 'Post updated successfully');
    }

    /**
     * Remove the specified post from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return redirect()->route('posts.index')
            ->with('success', 'Post deleted successfully');
    }
}