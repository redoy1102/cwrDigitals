<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::resource('products', ProductController::class)->middleware('auth');

// ...existing code...
// GET      /products              -> ProductController@index
// GET      /products/create       -> ProductController@create
// POST     /products              -> ProductController@store
// GET      /products/{product}    -> ProductController@show
// GET      /products/{product}/edit -> ProductController@edit
// PUT      /products/{product}    -> ProductController@update
// PATCH    /products/{product}    -> ProductController@update
// DELETE   /products/{product}    -> ProductController@destroy
// ...existing code...

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
