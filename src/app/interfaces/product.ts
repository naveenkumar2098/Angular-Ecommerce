export interface Product {
    id: number,
    categoryId: number,
    name: string,
    make: string,
    model: string,
    price: number,
    images: string[],
    description: string,
    stock: number,
    featured: boolean
}