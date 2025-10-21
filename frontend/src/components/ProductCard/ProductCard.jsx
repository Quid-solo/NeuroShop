import {Link} from 'react-router-dom';

export default function ProductCard({
    imageUrl,
    title,
    mrp,
    amazonPrice,
    flipkartPrice,
}){

    return(
        <Link to={``}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 w-full max-w-sm">
                <div className='p-2'>
                    <img src={imageUrl} alt="product image" className="w-full h-48 object-contain bg-gray-100" />
                </div>
                <div className='p-4'>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
                    </div>
                    <div className="mt-4 border rounded-md divide-y divide-gray-200">
                        <div className="flex justify-between px-4 py-2 text-sm">
                            <span className="text-gray-600">Amazon</span>
                            <span className="text-green-600 font-medium">₹{amazonPrice}</span>
                        </div>
                        <div className="flex justify-between px-4 py-2 text-sm">
                            <span className="text-gray-600">Flipkart</span>
                            <span className="text-blue-600 font-medium">₹{flipkartPrice}</span>
                        </div>
                        <div className="px-4 py-2 text-sm text-gray-500">
                            MRP: <span className="line-through text-red-500">₹{mrp}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}