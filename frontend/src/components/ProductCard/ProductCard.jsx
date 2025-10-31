import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import service from '../../appwrite/config';
import { newToStore } from '../../store/productSlice';

export default function ProductCard({
    product={},
    cart = false,
    wishlist = false,
}){
    const platform = JSON.parse(product?.platform);

    const [selected, setSelected] = useState(false);

    let cartString = useSelector(state=>state.product?.cart);
    let wishlistString = useSelector(state=>state.product?.wishlist);
    const cartStore = JSON.parse(cartString);
    const wishlistStore = JSON.parse(wishlistString);
    const userid = useSelector(state=> state.auth.userData?.$id);

    const dispatch = useDispatch();

    useEffect(()=>{
        if(wishlistStore?.includes(product.$id)) setSelected(true)}
    ,[wishlistStore])

    const handleAddToCart = async (product) => {
        if(!cartStore?.includes(product.$id)){
            const newCartString = JSON.stringify([...cartStore,product.$id]);
            
            await service.addOtherData({
                userid,
                userdata: {
                    cart: newCartString
                }
            })
            
            dispatch(newToStore({
                list: "cart",
                data: newCartString,
            }))
        } else console.log("Already added to the cart");
    }

    const handleAddToWishlist = async (product) => {
        let newWishlistString = wishlistString;
        if(!selected){
            newWishlistString = JSON.stringify([...wishlistStore,product.$id]);
        } else {
            const newWishlistStore = wishlistStore?.filter(id => id !== product.$id);
            newWishlistString = JSON.stringify(newWishlistStore);
        }   

        await service.addOtherData({
            userid,
            userdata: {
                wishlist: newWishlistString
            }
        })
            
        dispatch(newToStore({
            list: "wishlist",
            data: newWishlistString,
        }))

        setSelected(!selected);
        
    }

    return(
            <div className="group relative bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 w-full max-w-sm">
                <button
                    onClick={() => {
                        
                        handleAddToWishlist(product);
                    }}
                    className="absolute top-2 right-2 bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-100 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                >
                    {selected ? (
                    <span className="text-green-600 text-xl font-bold">{!wishlist ? "✓" : "-"}</span>
                    ) : (
                    <span className="text-gray-600 text-xl font-bold">+</span>
                    )}
                </button>
                <div className='p-2'>
                    <img src={platform.flipkart?.imgUrl || platform.amazon?.imgUrl} alt="product image" className="w-full h-40 object-contain bg-white" />
                </div>
                <div className='p-4'>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 truncate" title={platform.flipkart?.title || platform.amazon?.title}>{platform.flipkart?.title || platform.amazon?.title}</h3>
                    </div>
                    <div className="mt-4 border rounded-md divide-y divide-gray-200">
                        <a 
                        href={platform?.amazon?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <div className="flex justify-between px-4 py-2 text-sm cursor-pointer">
                            <span className="text-gray-600">Amazon : </span>
                            <span className="text-green-600 font-medium">₹{platform.amazon?.price}</span>
                        </div>
                        </a>
                        <a 
                        href={platform?.flipkart?.url}
                        target="_blank"
                        rel="noopener noreferrer"    
                        >
                        <div className="flex justify-between px-4 py-2 text-sm cursor-pointer">
                            <span className="text-gray-600">Flipkart : </span>
                            <span className="text-blue-600 font-medium">{platform.flipkart?.price}</span>
                        </div>
                        </a>
                        <div className="px-4 py-2 text-sm text-gray-500 flex justify-between">
                            <span className="text-gray-600">MRP : </span>
                            <span className="line-through text-red-500">{product?.mrp}</span>
                        </div>
                    </div>
                </div>
                <div className="p-4 pt-0">
                    <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                    {!cart ? "Add to Cart" : "Buy"}
                    </button>
                </div>
            </div>
    )
}