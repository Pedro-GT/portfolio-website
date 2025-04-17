@extends('layouts.app')

@section('title', $post->title)

@section('content')
    <div class="mb-4">
        <div class="d-flex justify-content-between align-items-center">
            <h1>{{ $post->title }}</h1>
            <div>
                <a href="{{ route('posts.edit', $post->id) }}" class="btn btn-warning">Edit Post</a>
                <a href="{{ route('posts.index') }}" class="btn btn-secondary">Back to List</a>
            </div>
        </div>
        
        <div class="text-muted mb-3">
            <strong>Slug:</strong> {{ $post->slug }}
            @if($post->published_at)
                <span class="ms-3">
                    <strong>Published:</strong> {{ \Carbon\Carbon::parse($post->published_at)->format('Y-m-d') }}
                </span>
            @else
                <span class="ms-3 badge bg-secondary">Draft</span>
            @endif
        </div>
    </div>
    
    <div class="card mb-4">
        <div class="card-header bg-light">
            <h3>Excerpt</h3>
        </div>
        <div class="card-body">
            {{ $post->excerpt }}
        </div>
    </div>
    
    <div class="card">
        <div class="card-header bg-light">
            <h3>Content</h3>
        </div>
        <div class="card-body">
            {!! nl2br(e($post->content)) !!}
        </div>
    </div>
    
    <div class="mt-4">
        <form action="{{ route('posts.destroy', $post->id) }}" method="POST" class="d-inline">
            @csrf
            @method('DELETE')
            <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this post?')">Delete Post</button>
        </form>
    </div>
@endsection