import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, router } from '@inertiajs/react';
// import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formateDate } from '@/lib/utils';
import { Edit, MoreHorizontal, Plus, Trash2 } from 'lucide-react';
// import { formateDate } from '@/lib/utils';

const breadcrumbs = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Product {
    id: number;
    productCategory: string;
    productName: string;
    stock: number;
    sold: number;
    price: number;
    created_at: string;
}
interface ProductsProps {
    products: Product[];
}

export default function Products({ products }: ProductsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <Header title="Products" btnText="Add Product" btnLink="/products/create" btnIcon={<Plus className="h-4 w-4" />} />

                {/* Products Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Product Inventory</CardTitle>
                        <CardDescription>View and manage all your products</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Sold</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead className="">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => {
                                    const productCategoryLower = product.productCategory.toLowerCase();
                                    return (
                                        <TableRow key={product.id}>
                                            <TableCell>{product.id}</TableCell>
                                            <TableCell>{formateDate(product.created_at)}</TableCell>
                                            <TableCell
                                                className={
                                                    productCategoryLower === 'youtube'
                                                        ? 'font-bold text-red-600'
                                                        : productCategoryLower === 'spotify'
                                                          ? 'text-green-600'
                                                          : ''
                                                }
                                            >
                                                {product.productCategory}
                                            </TableCell>
                                            <TableCell className="font-medium">{product.productName}</TableCell>
                                            <TableCell>{product.stock}</TableCell>
                                            <TableCell>{product.sold}</TableCell>
                                            <TableCell>{product.price}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => router.visit(`/products/${product.id}/edit`)}>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-red-600"
                                                            onClick={() => {
                                                                if (confirm('Are you sure you want to delete this product?')) {
                                                                    router.delete(`/products/${product.id}`);
                                                                }
                                                            }}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
