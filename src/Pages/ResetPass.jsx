import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPass = () => {

    const auth = getAuth();
    const [email,setEmail] = useState('')

    const handleEmail = (e)=>{
        setEmail(e.target.value)
        console.log(email);
    } 

    const handleResetPassword = ()=>{
        
        if(email == ''){
            alert('Please Enter Email')
        }
        else if(email == '*'){
            alert('Please Enter Valid Email')
        }
        else{
            sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                console.log("Clicked");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode,errorMessage);
                // ..
            });
        }
    }

    return (
<div className="antialiased">
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-medium">Reset password</h1>
        <p className="text-slate-500">Fill up the form to reset the password</p>

        <form action="" className="my-10">
            <div className="flex flex-col space-y-5">
                <p className="font-medium  pb-2">Email address</p>
                <input onChange={handleEmail} id="email" name="email" type="email" className="w-full py-3 border  rounded-lg px-3 focus:outline-primaryColor hover:shadow" placeholder="Enter email address" />
                <button onClick={handleResetPassword}  
                    className="w-full py-3 bg-primaryColor font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">                      
                    <span className=" text-whiteColor">Reset password</span>
                </button>
                <Link to='/login' className= 'text-textOrangeColor'>Please Login</Link>
            </div>
        </form>
    </div>
    
</div>
    );
};

export default ResetPass;