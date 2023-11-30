import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocilaLogin = () => {
    const { googleSignin } = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/"
    const handleGoogleLogin = () => {
        googleSignin()
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate(from, { replace: true });
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div className="divider">OR</div>
            <div className="text-center my-2 ">
                <button onClick={handleGoogleLogin} className="btn btn-circle px-6">
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocilaLogin;