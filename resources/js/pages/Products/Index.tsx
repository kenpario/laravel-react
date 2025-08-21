import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Terminal } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface PageProps{
    flash: {
        message?: string,
    }
}

export default function Index() {
    const { flash } = usePage().props as PageProps;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
                <div className="flex m-6 justify-end">
                    <Link href={route('products.create')}><Button>Add new product</Button></Link>
                </div>
                <div className='m-4'>
                    {flash.message && (
                        <Alert>
                            <Terminal />
                            <AlertTitle>Notification!</AlertTitle>
                            <AlertDescription>
                                {flash.message}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
        </AppLayout>
    );
}
