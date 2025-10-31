import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {LoadingSpinner} from "../index";

export default function Protected({children, authentication}) {
    const navigate = useNavigate();
    // const [load, setLoad] = useState(false);
    
    const {active, loading} = useSelector(state => state.auth);
    // console.log(active)
    useEffect(() => {
        // setLoad(true)
        if (authentication && active !== authentication) {
            if(!loading) navigate("/login")
        } else if (!authentication && active !== authentication) {
            navigate("./");                  //this . here tells to continue to the current url if you dont use . here it renders to the root.
        }
        // setLoad(false)
    },[active, navigate, authentication, loading])

    return loading ? ( 
        <>
        <LoadingSpinner />
        <h1 className='text-center'><i>Loading...</i></h1> 
        </>
        ) : <>{children}</>;
};