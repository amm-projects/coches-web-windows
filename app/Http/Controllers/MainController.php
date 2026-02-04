<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Car;
use App\Models\User;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Type\Integer;

class MainController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $iconFiles = Storage::disk('public')->files('images/icons');
       // $filesExists = Storage::exists('public/images/icons');
        $iconUrls = array_map(function ($file) {
            return '/storage/' . str_replace('public/', '', $file);
        }, $iconFiles);
        return Inertia::render('main/index', [
            'carBrandIcons' => $iconUrls,
            // ...otros datos
        ]);
    }

    public function about()
    {
        return Inertia::render('main/about');
    }

    public function contact()
    {
        return Inertia::render('main/contact');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
