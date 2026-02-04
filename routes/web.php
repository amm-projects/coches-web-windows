<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MainController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\UserController;


/*
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
*/
/*
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});*/

/*Route::middleware(['auth'])->group(function () {*/
    Route::get('/', [MainController::class, 'index'])->name('main.index');
    Route::get('/about', [MainController::class, 'about'])->name('main.about');
    Route::get('/contact', [MainController::class, 'contact'])->name('main.contact');
    Route::get('/cars', [CarController::class, 'index'])->name('main.cars.index');
    Route::get('/cars/create', [CarController::class, 'create'])->name('main.cars.create');
    Route::post('/cars', [CarController::class, 'store'])->name('main.cars.store');
    Route::delete('/cars/{car}', [CarController::class, 'destroy'])->name('main.cars.destroy');
    Route::get('/cars/{car}', [CarController::class, 'show'])->name('main.cars.show');
    Route::get('/cars/{car}/edit', [CarController::class, 'edit'])->name('main.cars.edit');
    Route::put('/cars/{car}', [CarController::class, 'update'])->name('main.cars.update');
    Route::put('/cars/buy/{car}/{user}', [CarController::class, 'buy'])->name('main.cars.buy');
    Route::get('/users/{user}', [UserController::class, 'show'])->name('main.users.show');
    Route::put('/users/{user}', [UserController::class, 'updateFunds'])->name('main.users.updateFunds');
/*});*/

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
