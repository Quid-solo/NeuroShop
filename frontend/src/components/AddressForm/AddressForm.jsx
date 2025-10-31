import { useForm } from "react-hook-form";
import {Button, Input, LoadingSpinner} from "../index";
import { useState } from "react";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newToStore } from "../../store/productSlice";

export default function AddressForm({setShowform}){
    const {register, handleSubmit} = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userid = useSelector(state=> state.auth.userData.$id);
    let addresses = useSelector(state=> state.product?.addresses);
    addresses = JSON.parse(addresses);

    const submitAddress = async (data)=>{
        
        setLoading(true);
        
        const addressString = JSON.stringify([...addresses,data]);
        // dispatch(updateAddress(data));
        await service.addOtherData({
            userid,
            userdata: {
                addresses: addressString
            }
        })
        data = JSON.stringify(data);
        dispatch(newToStore({
            list: "addresses",
            data: addressString,
        }))
        
        setShowform(false);
        setLoading(false);
        navigate('./');        
    }

    return !loading ? (
        <div className="p-2 m-1">
            <form onSubmit={handleSubmit(submitAddress)} className="max-w-md mx-auto bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Address</h2>

                <Input label={`Name`} type="text" id="name" name="name" placeholder="Enter name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                {...register("name",{
                    required: true,
                })}
                />

                <Input label={`Address`} type="text" id="street" name="street" placeholder="Enter address..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                {...register("address",{
                    required: true,
                })} 
                />

                <Input label={`City`} type="text" id="city" name="city" placeholder="City.."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                {...register("city",{
                    required: true,
                })} 
                />

                <Input label={`State`} type="text" id="state" name="state" placeholder="State..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                {...register("state",{
                    required: true,
                })}
                />

                <Input label={`Postal Code`} type="text" id="postalCode" name="postalCode" placeholder="126116"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                {...register("postalcode",{
                    required: true,
                })}/>

                <Input label={`Country`} type="text" id="country" name="country" placeholder="India"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                {...register("country",{
                    required: true,
                })}
                />

                <Button type="submit"
                    classname="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                    Save Address
                </Button>
            </form>
        </div>
    ) : ( 
        <>
        <LoadingSpinner />
        <h1 className='text-center'><i>Adding new address...</i></h1> 
        </>
        )
};
