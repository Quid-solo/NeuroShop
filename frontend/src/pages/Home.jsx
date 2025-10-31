import { useEffect } from "react";
import service from "../appwrite/config";
import { ProductCard, Container } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { newToStore } from "../store/productSlice";

export default function Home() {
    const dispatch = useDispatch();
    const allProducts = useSelector(state=>state.product?.allProducts)

    useEffect(() => {
        service.getProducts().then((products) => {
            if (products) {
                dispatch(newToStore({
                    list: "allProducts",
                    data: products.rows,
                }))
            }
        })
    }, []);



    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                    allProducts?.map((product)=> (
                        <div key={product.$id} className='p-2 w-1/4'>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

}