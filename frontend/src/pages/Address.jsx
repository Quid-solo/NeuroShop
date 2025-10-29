import { useState } from "react";
import { AddressForm } from "../components";
import { useSelector } from "react-redux";

export default function Address(){
   const [showForm, setShowForm] = useState(false);
   let addresses = useSelector(state=> state.product.addresses);
   
   addresses = JSON.parse(addresses);
   const useData = useSelector(state=>state.auth.userData);
   console.log(useData);
   
    return (
        <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Saved Addresses</h2>

        <div className="space-y-4 mb-6">
            {addresses?.map((addr, idx) => {
                console.log(addr);
            return <div key={idx} className="border p-4 rounded shadow-sm bg-white">
                <p className="font-semibold">{addr.name}</p>
                <p>{addr.address}, {addr.city}</p>
                <p>{addr.state} - {addr.postalCode}</p>
                <p>{addr.country}</p>
            </div>
            })}
        </div>

        <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
        >
            <span className="text-2xl font-bold">+</span> Add New Address
        </button>

        {showForm && <AddressForm setShowform={setShowForm}/>}
        </div>
    )
}