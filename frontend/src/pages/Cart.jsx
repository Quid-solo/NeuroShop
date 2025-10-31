import { useMemo } from "react";
import { useSelector } from "react-redux"
import { Container, ProductCard } from "../components";

export default function Cart(){
    let cart = useSelector(state=>state.product?.cart);
    cart = JSON.parse(cart);
    const allProducts = useSelector(state=>state.product?.allProducts);

    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => cart.includes(product.$id));
    }, [allProducts, cart]);

    return(
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                    filteredProducts?.map((product)=> (
                        <div key={product.$id} className='p-2 w-1/4'>
                            <ProductCard product={product} cart={true} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}