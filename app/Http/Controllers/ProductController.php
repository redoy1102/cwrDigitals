<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductController extends Controller
{
    // Products view page
    public function index()
    {
        return Inertia::render('Products/Index', [
            'products' => Product::with('user')->get(),
        ]);
    }

    // Product add form page
    public function create()
    {
        return Inertia::render('Products/Create', [
            'products' => Product::with('user')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'productCategory' => ['required', 'max:255'],
            'productName' => ['required', 'max:255'],
            'stock' => ['required', 'numeric'],
        ]);

        Product::create([
            'user_id' => Auth::id(),
            ...$validated,
            'stock' => (int)$validated['stock'],
        ]);

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    // Product edit form page
    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'productCategory' => ['required', 'max:255'],
            'productName' => ['required', 'max:255'],
            'stock' => ['required', 'numeric'],
        ]);

        $product->update($request->all());
        return redirect()->route('products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index');
    }
}
