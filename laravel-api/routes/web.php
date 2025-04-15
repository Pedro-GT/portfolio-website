<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
// Route::get('posts/published', [PostController::class, 'published']);
// Route::get('posts/drafts', [PostController::class, 'drafts']);
// Route::apiResource('posts', PostController::class);