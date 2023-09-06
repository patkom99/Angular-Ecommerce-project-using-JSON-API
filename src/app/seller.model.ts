export interface Seller{
    name:string,
    email:string,
    password:string,
    id:number
}

export interface SellerLog{
    email: string,
    password: string
}

export interface UserLog{
    email: string,
    passw: string
}

export interface Product{
    name: string,
    price: number,
    color: string,
    category: string,
    description: string,
    imag: string,
    id: number,
    quantity: undefined | number,
    productId:undefined | number
}

export interface SignUp{
    fname: string,
    lname: string,
    email: string,
    passw: string,
    cpassw:string,
    city:string,
    state: string,
    zip: number,
    id: number
}

export interface Cart{
    name: string,
    price: number,
    color: string,
    category: string,
    description: string,
    imag: string,
    id: undefined | number,
    quantity: undefined | number,
    userId:number,
    productId:number
}

export interface PriceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}
