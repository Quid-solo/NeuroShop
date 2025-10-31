import { useNavigate } from "react-router-dom";
import { Button, Input, LoadingSpinner, Logo } from "../index";
import { useForm } from "react-hook-form";
import service from "../../appwrite/config";
import { newToStore } from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function AddProduct(){
    let myproducts = useSelector(state=> state.product?.myproducts);
    myproducts = JSON.parse(myproducts);
    const allproducts = useSelector(state=> state.product?.allProducts);
    const userid = useSelector(state=> state.auth.userData?.$id)

    const [loading, setLoading] = useState(false);
    
    // console.log("userid", userid);
    // console.log("allproducts", allproducts);

    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerProduct = async (data)=>{
        setLoading(true);
        const productUrl = encodeURIComponent(data.url);
        
        try {
            const response = await fetch(`http://localhost:5000/api/scrape?url=${productUrl}`);
            let productData = await response.json();
            if(productData){
                const mrp = productData?.amazon?.mrp || productData?.flipkart?.mrp;
                if(mrp) {
                    delete productData?.amazon?.mrp
                    delete productData?.flipkart?.mrp
                }

                

                productData = JSON.stringify(productData);

                const product = await service.addProduct({mrp, platform: productData});

                const myproductsString = JSON.stringify([...myproducts,product.$id])

                await service.addOtherData({
                    userid,
                    userdata: {
                        myproducts: myproductsString,
                    }
                })

                dispatch(newToStore({
                    list: "allProducts",
                    data: [...allproducts, product],
                }))
                
                dispatch(newToStore({
                    list: "myProducts",
                    data: myproductsString,
                }))
            }
            navigate('/');
        } catch (error) {
            console.log("Adding product failed || err: ",error);
        } finally{
            setLoading(false);
        }
        
        
    }

    return !loading ? (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Add product url</h2>
                <form onSubmit={handleSubmit(registerProduct)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                        label="URl:"
                        placeholder="Enter url of your product" 
                        {...register("url",{
                            required: true,
                        })}
                        />
                        <Button 
                        type="submit" 
                        className='w-1/3 mx-auto text-center justify-center flex rounded-lg py-2  hover:bg-blue-400'
                        >Register product</Button>

                    </div>
                </form>
            </div>
        </div>
    ) : ( 
        <>
        <LoadingSpinner />
        <h1 className='text-center'><i>Wait scraping data for the product...</i></h1> 
        </>
        )
};