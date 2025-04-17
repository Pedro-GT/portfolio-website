<?php

use Illuminate\Support\Facades\Route;

Route::resource('posts', \App\Http\Controllers\PostViewController::class);
Route::get('posts/source/{source}', [App\Http\Controllers\PostViewController::class, 'getBySource'])->name('posts.by-source');