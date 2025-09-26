import Header from '@/components/Header';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
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
        if (value === 'GPT(Shared)') {
            setData('stock', '60');
        } else if (value === 'GPT(Team)') {
            setData('stock', '4');
        } else if (value === 'youTube' || value === 'spotify' || value === 'driveYt' || value === 'onlyDrive') {
            setData('stock', '5');
        } else if (value === 'cursor') {
            setData('stock', '5');
        } else if (value === 'geminiVeo3_2tb') {
            setData('stock', '1');
        } else {
            setData('stock', '');
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <Header title="Add Product" btnText="All Products" btnLink="/products" btnIcon={<List className="h-4 w-4" />} />

                {/* Using basic form as I am using custom logic in submission */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Hidden input to ensure productCategory is included in form submission */}
                    <input type="hidden" name="productCategory" value={data.productCategory} />

                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        {/* Product category */}
                        <div className="w-full">
                            <Label htmlFor="productCategory">Product Category</Label>
                            <Select value={data.productCategory} onValueChange={handleCategoryChange} required>
                                <SelectTrigger className="mt-2 w-full" id="productCategory" name="productCategory">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {productCategories.map((category, index) => (
                                        <SelectItem key={index} value={category.value}>
                                            {category.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError className="mt-2" message={errors.productCategory} />
                        </div>
                        {/* Product name */}
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

                    {/* Stock */}
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
                        <Button disabled={processing} className="w-full cursor-pointer lg:w-1/12">
                            {processing ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

const productCategories = [
    { label: 'GPT(Shared)', value: 'GPT(Shared)' },
    { label: 'GPT(Team)', value: 'GPT(Team)' },
    { label: 'Gemini or Veo 3 or 2TB', value: 'geminiVeo3_2tb' },
    { label: 'Perplexity', value: 'perplexity' },
    { label: 'YouTube', value: 'youTube' },
    { label: 'Spotify', value: 'spotify' },
    { label: 'Netflix 4k Plan', value: 'Netflix4k' },
    { label: 'Amazon Prime', value: 'amazonPrime' },
    { label: 'Cursor', value: 'cursor' },
    { label: 'Cap Cut Standard', value: 'CapCutStandard' },
    { label: 'Drive + YT', value: 'driveYt' },
    { label: 'Only Drive', value: 'onlyDrive' },
    { label: 'Stealth Writer', value: 'stealthWriter' },
    { label: 'Quillbot', value: 'quillbot' },
    { label: 'Turnitin Student', value: 'turnitinStudent' },
];
