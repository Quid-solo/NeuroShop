import { useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "../index";
import { useForm } from "react-hook-form";
import service from "../../../../appwrite/config";
import { addToStore } from "../../store/productSlice";
import { useDispatch } from "react-redux";

export default function AddProduct(){

    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerProduct = async (data)=>{
        const productUrl = encodeURIComponent(data.url);
        
        try {
            const response = await fetch(`http://localhost:5000/api/scrape?url=${productUrl}`);
            const productData = await response.json();
            if(productData){
                const mrp = productData?.amazon?.mrp || productData?.flipkart?.mrp;
                if(mrp) {
                    delete productData?.amazon?.mrp
                    delete productData?.flipkart?.mrp
                }
                //first check for the title of the fetched product and from the array of the already stored products in store
                service.addProduct({mrp, platform: productData});

                dispatch(addToStore({
                    list: "allProducts",
                    product: productData,
                }))
                
                dispatch(addToStore({
                    list: "myProducts",
                    product: productData,
                }))
            }
            navigate('/');
        } catch (error) {
            console.log("Adding product || err: ",error);
        }
        
        
    }

    return(
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
    )
};