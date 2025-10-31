import { useMemo } from "react";
import { useSelector } from "react-redux"
import { Container, ProductCard } from "../components";

export default function MyProducts(){
    let myproducts = useSelector(state=>state.product?.myproducts);
    myproducts = JSON.parse(myproducts);
    const allProducts = useSelector(state=>state.product?.allProducts);

    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => myproducts.includes(product.$id));
    }, [allProducts, myproducts]);

    return(
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                    filteredProducts?.map((product)=> (
                        <div key={product.$id} className='p-2 w-1/4'>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}