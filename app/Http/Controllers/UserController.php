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

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show(User $user)
    {
        $cars = DB::select('SELECT * FROM cars WHERE propietario =' . $user->id . ';');
        $myUser = request()->user();
        return Inertia::render('main/users/show', [
            'user' => $user,
            'cars' => $cars,
            'myUser' => $myUser
        ]);
    }

    public function updateFunds(Request $request, User $user)
    {
        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'min:0.01'],
            'type' => ['required', 'in:add,subtract'],
        ]);


        if ($validated['type'] === 'subtract' && $user->saldo < $validated['amount']) {
            return back()->withErrors([
                'amount' => 'Saldo insuficiente.',
            ]);
        }

        $user->saldo = $validated['type'] === 'add'
            ? bcadd($user->saldo, $validated['amount'], 2)
            : bcsub($user->saldo, $validated['amount'], 2);
            
        $user->save();
        return redirect()
            ->route('main.users.show', $user)
            ->with('success', 'Fondos añadidos correctamente.');
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
