import {Link} from 'react-router-dom';

export default function ProductCard({
    mrp,
    platform = {}
}){

    platform = JSON.parse(platform);

    return(
            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 w-full max-w-sm">
                <div className='p-2'>
                    <img src={platform.flipkart?.imgUrl || platform.amazon?.imgUrl} alt="product image" className="w-full h-40 object-contain bg-white" />
                </div>
                <div className='p-4'>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 truncate" title={platform.flipkart?.title || platform.amazon?.title}>{platform.flipkart?.title || platform.amazon?.title}</h3>
                    </div>
                    <div className="mt-4 border rounded-md divide-y divide-gray-200">
                        <Link to={platform?.amazon?.url}>
                        <div className="flex justify-between px-4 py-2 text-sm cursor-pointer">
                            <span className="text-gray-600">Amazon : </span>
                            <span className="text-green-600 font-medium">₹{platform.amazon?.price}</span>
                        </div>
                        </Link>
                        <Link to={platform?.flipkart?.url}>
                        <div className="flex justify-between px-4 py-2 text-sm cursor-pointer">
                            <span className="text-gray-600">Flipkart : </span>
                            <span className="text-blue-600 font-medium">{platform.flipkart?.price}</span>
                        </div>
                        </Link>
                        <div className="px-4 py-2 text-sm text-gray-500 flex justify-between">
                            <span className="text-gray-600">MRP : </span>
                            <span className="line-through text-red-500">{mrp}</span>
                        </div>
                    </div>
                </div>
            </div>
    )
}