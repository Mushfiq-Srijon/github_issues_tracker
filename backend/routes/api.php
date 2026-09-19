<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\IssueController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::get('/issues', [IssueController::class, 'index']);
    Route::post('/issues', [IssueController::class, 'store']);
    Route::get('/issues/{issue}', [IssueController::class, 'show']);
    Route::put('/issues/{issue}', [IssueController::class, 'update']);
    Route::delete('/issues/{issue}', [IssueController::class, 'destroy']);
});