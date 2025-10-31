import { useMemo } from "react";
import { useSelector } from "react-redux"
import { Container, ProductCard } from "../components";

export default function Wishlist(){
    let wishlist = useSelector(state=>state.product?.wishlist);
    wishlist = JSON.parse(wishlist);
    const allProducts = useSelector(state=>state.product?.allProducts);

    const filteredProducts = useMemo(() => {
        return allProducts?.filter(product => wishlist.includes(product.$id));
    }, [allProducts, wishlist]);

    return(
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                    filteredProducts?.map((product)=> (
                        <div key={product.$id} className='p-2 w-1/4'>
                            <ProductCard product={product} wishlist={true} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}