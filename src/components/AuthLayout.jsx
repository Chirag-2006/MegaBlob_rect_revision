import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.status);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      //TODO: make it more easy to understand

      // if (authStatus ===true){
      //     navigate("/")
      // } else if (authStatus === false) {
      //     navigate("/login")
      // }

      //let authValue = authStatus === true ? true : false

    //   if (authentication) {
    //     if (!authStatus) {
    //       navigate("/login");
    //     }
    //   } else {
    //     if (authStatus) {
    //       navigate("/");
    //     }
    //   }

      if (authentication && authStatus !== authentication) {
        navigate("/login");
      } else if (!authentication && authStatus !== authentication) {
        navigate("/");
      }
      setLoading(false);
    };

    checkAuthentication();
  }, [authStatus, navigate, authentication]);

  return <>{loading ? <p>Loading...</p> : { children }}</>;
}

export default AuthLayout;
