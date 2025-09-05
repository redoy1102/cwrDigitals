import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { List } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Product',
        href: '/products/create',
    },
];

interface Product {
    id: number;
    productCategory: string;
    productName: string;
    stock: number;
    sold: number;
    created_at: string;
}

export default function CreateProduct({ products }: { products: Product[] }) {
    console.log(products);

    const { data, setData, post, reset, errors, processing } = useForm<{
        productCategory: string;
        productName: string;
        stock: string;
    }>({
        productCategory: '', // Default to first option
        productName: '',
        stock: '',
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Log form data for debugging
        console.log('Submitting form data:', data);

        if (confirm('Are you sure you want to add this product?')) {
            post('/products', {
                onSuccess: () => {
                    reset();
                },
                onError: (errors) => {
                    console.error('Form submission errors:', errors);
                },
            });
        }
    };

    const handleCategoryChange = (value: string) => {
        setData('productCategory', value);
        if (value === 'GPT') {
            setData('stock', '60');
        } else if (value === 'YouTube' || value === 'Spotify') {
            setData('stock', '5');
        } else if (value === 'Cursor') {
            setData('stock', '5');
        } else {
            setData('stock', '');
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Add Product</h1>
                        <p className="text-muted-foreground">Add your product details below.</p>
                    </div>
                    <Button className="flex cursor-pointer items-center gap-2" onClick={() => router.visit('/products')}>
                        <List className="h-4 w-4" />
                        All Products
                    </Button>
                </div>

                {/* Using basic form as I am using custom logic in submission logic */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Hidden input to ensure productCategory is included in form submission */}
                    <input type="hidden" name="productCategory" value={data.productCategory} />

                    <div className="flex items-center justify-between gap-4">
                        <div className="w-full">
                            <Label htmlFor="productCategory">Product Category</Label>
                            <Select value={data.productCategory} onValueChange={handleCategoryChange} required>
                                <SelectTrigger className="mt-2 w-full" id="productCategory" name="productCategory">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="GPT">GPT</SelectItem>
                                    <SelectItem value="YouTube">YouTube</SelectItem>
                                    <SelectItem value="Spotify">Spotify</SelectItem>
                                    <SelectItem value="Netflix">Netflix</SelectItem>
                                    <SelectItem value="Cursor">Cursor</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError className="mt-2" message={errors.productCategory} />
                        </div>

                        <div className="w-full">
                            <Label htmlFor="productName">Product name</Label>

                            <Input
                                id="productName"
                                className="mt-1 block w-full"
                                name="productName"
                                required
                                autoComplete="name"
                                placeholder="Product name"
                                value={data.productName}
                                onChange={(e) => setData('productName', e.target.value)}
                            />

                            <InputError className="mt-2" message={errors.productName} />
                        </div>
                    </div>

                    <div className="">
                        <Label htmlFor="stock">Stock</Label>

                        <Input
                            id="stock"
                            type="number"
                            className="mt-1 block w-full"
                            name="stock"
                            required
                            autoComplete="stock"
                            placeholder="Stock"
                            value={data.stock}
                            onChange={(e) => setData('stock', e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.stock} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing} className="cursor-pointer">
                            {processing ? 'Saving...' : 'Save'}
                        </Button>

                        {/* As I am redirecting to the index page it's not needed */}
                        {/* <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Saved</p>
                        </Transition> */}
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
