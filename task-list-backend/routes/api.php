<?php

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// 1. Ambil data
Route::get('/tasks', function () {
    return response()->json(Task::latest()->get());
});

// 2. Tambah Task Baru
Route::post('/tasks', function (Request $request) {
    $validated = $request->validate([
        'title' => 'required|max:255',
        'description' => 'required',
        'long_description' => 'nullable',
    ]);

    $task = Task::create([
        'title' => $validated['title'],
        'description' => $validated['description'],
        'long_description' => $validated['long_description'] ?? '',
        'completed' => false,
    ]);

    return response()->json($task, 201);
});

// 3. Toggle Complete (Hapus findOrFail)
Route::put('/tasks/{id}/toggle-complete', function ($id) {
    $task = Task::findOrFail($id);

    // Balik nilai boolean completed
    $task->completed = !$task->completed;
    $task->save(); // Simpan perubahan ke database

    return response()->json($task);
});

// 4. Edit Isi Task (Title, Description, Long Description)
Route::put('/tasks/{task}', function (Request $request, Task $task) {
    $validated = $request->validate([
        'title' => 'required|max:255',
        'description' => 'required',
        'long_description' => 'nullable',
    ]);

    $task->update([
        'title' => $validated['title'],
        'description' => $validated['description'],
        'long_description' => $validated['long_description'] ?? '',
    ]);

    return response()->json($task);
});

// 5. Hapus Task (Hapus findOrFail)
Route::delete('/tasks/{task}', function (Task $task) {
    $task->delete();
    return response()->json(['message' => 'Berhasil dihapus']);
});

Route::get('/tasks/{id}', function ($id) {
    $task = Task::findOrFail($id);
    return response()->json($task);
});

Route::get('/tasks', function () {
    return response()->json(Task::latest()->paginate(10));
});
