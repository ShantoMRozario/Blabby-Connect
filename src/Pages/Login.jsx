
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import RegAnimation from '../assets/Animations/login.json'
import {FcGoogle} from 'react-icons/fc'
import {BsEyeSlash} from 'react-icons/bs'
import {BsEye} from 'react-icons/bs'
import { useState } from "react";
import {toast} from 'react-toastify'
import { getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux/es/exports";
import { userLoginInfo } from "../Slices/userSlice";

const Login = () => {

    const auth = getAuth();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //Provivers
    const provider = new GoogleAuthProvider();

    //For Input Value start
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showPass,setShowPass] = useState('password')
    //For Input Value End
    //For Error Input Value start
    const [emailError,setEmailError] = useState('')
    const [passwordError,setPasswordError] = useState('')
    //For Error Input Value End
    
    //Get input value
    const handleEmail = (e)=>{
        setEmail(e.target.value)
        if(email != '' ){
            setEmailError('')
        }
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value)
        if (password != ''){
            setPasswordError('')
        }
    }
    //Show password 
    const handleShowPass = ()=>{
        if(showPass == "password"){
            setShowPass("text")
        }
        else{
        setShowPass('password')
        }
    }

    //Google Login
    const handleGoogleLogin = ()=>{

        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)

            navigate('/')
            toast.success('Login Successfull')
            
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
        
    }



    //Email Regex
    const emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    //Handle Submit
    const handleSubmit = (e)=>{
        e.preventDefault()

        if(email == ''){
            setEmailError('Enter Email')
        }
        else if(emailregex.test(email) == false){
            setEmailError('Enter Valid Email')
            }
        else if(password == ''){
            setPasswordError('Enter Password')
        }
        else{
            
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                toast.success('Login Successfull')
                navigate('/')
                dispatch(userLoginInfo(user))
                localStorage.setItem('user',JSON.stringify(user))
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode,errorMessage);
            });
        }

    }
    return (
        <div id="registration_login" className="login">

            <div className="right">
            <Lottie animationData={RegAnimation} />
            </div>            
            <div className="left login">
                <div className="reg_content log_content">
                    <div className="logo">
                        <img src="/src/assets/Logos/BlabbyConnectLogo.png" alt="Logo" />
                    </div>
                    <div className="title">
                        <h2 className="login_title">Login to your account!</h2>
                        
                        <button onClick={handleGoogleLogin}><FcGoogle/> Login With Google</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input_field group">
                            <label 
                            className="
                            ">Email Address</label>
                            <input onChange={handleEmail} type="text" placeholder="example@gmail.com" />
                            <p className="error">{emailError}</p>
                        </div>
                        <div className="input_field group">
                            <label 
                            className="
                            ">Password</label>
                            <div className="pass">
                                <input onChange={handlePassword} type={showPass} placeholder="*******" />
                                { showPass == 'password'?
                                <BsEyeSlash onClick={handleShowPass} className="absolute transform translate-y-[-50%] top-[50%] right-5 lg:left-[440px]  cursor-pointer text-[20px] text-borderColor"/>
                                :
                                <BsEye onClick={handleShowPass} className="absolute transform translate-y-[-50%] top-[50%] right-5 lg:left-[440px] cursor-pointer text-[20px] " />
                                }
                            </div>
                            <p className="error">{passwordError}</p>
                        </div>
                        <div className="reset_pass">
                        <p>Forgot Password ? <Link to='/resetpassword' className="another_link">Reset Password</Link></p>
                        </div>
                        <button className="common_btn">Login</button>
                        <p>New Here ? <Link to='/registration' className="another_link">Register Now</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;