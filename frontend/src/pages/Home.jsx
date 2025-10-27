import { useEffect, useState } from "react";
import service from "../../../appwrite/config";
import { ProductCard, Container } from "../components";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts([]);
        service.getProducts().then((products) => {
            if (products) {
                setProducts(products.rows);
            }
        })
    }, []);


    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                    products.map((product)=> (
                    
                        <div key={product.$id} className='p-2 w-1/3'>
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

}