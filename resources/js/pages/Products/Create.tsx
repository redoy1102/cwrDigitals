import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, router, useForm } from '@inertiajs/react';
import { List } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Product',
        href: '/products/create',
    },
];

export default function CreateProduct() {
    const { data, setData, post, processing, errors, reset } = useForm({
        productName: '',
        stock: '',
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/products', {
            onSuccess: () => {
                reset();
                router.visit('/products');
            },
        });
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

                <Form method="post" action="/products" onSubmit={handleSubmit} className="space-y-6">
                    {({ processing, recentlySuccessful, errors }) => (
                        <>
                            <div className="grid gap-2">
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

                            <div className="grid gap-2">
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
                                <Button disabled={processing}>Save</Button>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-neutral-600">Saved</p>
                                </Transition>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
