<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\PostViewController;
use Illuminate\Http\Request;

// Default Laravel route
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Auth Routes
Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
    Route::post('/register', [RegisterController::class, 'register']);
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [LoginController::class, 'login']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
    
    // Token management
    Route::get('/tokens', [TokenController::class, 'listTokens'])->name('tokens.index');
    Route::get('/tokens/create', [TokenController::class, 'showTokenForm'])->name('tokens.create');
    Route::post('/tokens', [TokenController::class, 'generateToken'])->name('tokens.store');
    Route::delete('/tokens/{id}', [TokenController::class, 'deleteToken'])->name('tokens.destroy');
});

// Post routes with auth protection for create/update/delete
Route::middleware('auth:sanctum')->group(function () {
    Route::resource('posts', PostViewController::class)->except(['index', 'show']);
});

// Public post routes
Route::get('posts', [PostViewController::class, 'index'])->name('posts.index');
Route::get('posts/{post}', [PostViewController::class, 'show'])->name('posts.show');
Route::get('posts/source/{source}', [PostViewController::class, 'getBySource'])->name('posts.by-source');