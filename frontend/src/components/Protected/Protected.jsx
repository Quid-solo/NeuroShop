import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({children, authentication}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    const authActive = useSelector(state => state.auth.active);

    useEffect(() => {
        //check below code again
        if (authentication && authActive !== authentication) {
            navigate("/login")
        } else if (!authentication && authActive !== authentication) {
            navigate("./");                  //this . here tells to continue to the current url if you dont use . here it renders to the root.
        }
        setLoading(false)
    },[authActive, navigate, authentication])

    return loading ? <h1>Loading...</h1> : <>{children}</>;
}; 