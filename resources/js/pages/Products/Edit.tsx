import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head, useForm } from '@inertiajs/react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from 'lucide-react'

interface Product{
    id: number,
    name: string,
    price: number,
    description: string,
}

interface Props {
    product: Product
}

export default function Edit({product} : Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: product.name,
    price: product.price,
    description: product.description,
  })

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('products.update',product.id))
   
  }

  return (
    <AppLayout breadcrumbs={[{title: 'Edit a product', href: `products/${product.id}/edit`}]}>
      <Head title="Update product" />

      <div className="flex justify-center">
        <div className="w-full max-w-lg p-6">
          <form
            onSubmit={handleUpdate}
            className="space-y-6 bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-md"
          >
            {Object.keys(errors).length > 0 && (
              <Alert variant="destructive" className="mb-4">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Errors</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc list-inside space-y-1">
                    {Object.entries(errors).map(([key, message]) => (
                      <li key={key}>{message as string}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Product Name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                placeholder="Price"
                value={data.price}
                onChange={(e) => setData('price', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Description"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                {processing ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}
