import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const SocilaLogin = () => {
    const { googleSignin } = useContext(AuthContext)
    const handleGoogleLogin = () => {
        googleSignin()
            .then(result => {
                const user = result.user;
                console.log(user)
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