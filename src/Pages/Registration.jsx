
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import RegAnimation from '../assets/Animations/RegAnimation.json'
import {BsEyeSlash} from 'react-icons/bs'
import {BsEye} from 'react-icons/bs'
import { useState } from "react";
import {toast} from 'react-toastify'

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const Registration = () => {


    const auth = getAuth();
    const navigate = useNavigate()
    const db = getDatabase();

    //For Input Value start
    const [fullName,setFullName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showPass,setShowPass] = useState('password')
    //For Input Value End
    //For Error Input Value start
    const [fullNameError,setFullNameError] = useState('')
    const [emailError,setEmailError] = useState('')
    const [passwordError,setPasswordError] = useState('')
    //For Error Input Value End
    
    //Get input value
    const handleFullName = (e)=>{
        setFullName(e.target.value)
        if(fullName != ''){
            setFullNameError('')
        }
    }
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

    //Email Regex
    const emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    //Handle Submit
    const handleSubmit = (e)=>{
        e.preventDefault()

        if(fullName == ''){
            setFullNameError('Enter Fullname')
        }
        else if(email == ''){
            setEmailError('Enter Email')
        }
        else if(emailregex.test(email) == false){
            setEmailError('Enter Valid Email')
            }
        else if(password == ''){
            setPasswordError('Enter Password')
        }
        else{
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //For updating userprofile
                updateProfile(auth.currentUser, {
                    displayName: fullName, photoURL: "/src/assets/images/male-placeholder.png"
                  })

                //For Database
                .then(()=>{
                    set(ref(db, 'users/' + auth.currentUser.uid), {
                        username: auth.currentUser.displayName,
                        email: auth.currentUser.email,
                      }); 
                })

                toast.success('Registration Successfull')
                navigate('/login')
                // Signed up 
                const user = userCredential.user;
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
        <div id="registration_login">
            <div className="left">
                <div className="reg_content">
                    <div className="logo">
                        <img src="/src/assets/Logos/BlabbyConnectLogo.png" alt="Logo" />
                    </div>
                    <div className="title">
                        <h2>Get started with easily register</h2>
                        <h3>Free register and you can enjoy it</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input_field ">
                            <label 
                            className="
                            ">Full Name</label>
                            <input onChange={handleFullName} type="text" placeholder="John Doe" />
                            <p className="error">{fullNameError}</p>
                        </div>
                        <div className="input_field group">
                            <label 
                            className="
                            ">Email Address</label>
                            <input onChange={handleEmail} type="email" placeholder="example@gmail.com" />
                            <p className="error">{emailError}</p>
                        </div>
                        <div className="input_field group">
                            <label 
                            className="
                            ">Password</label>
                            <div className="pass ">
                                <input onChange={handlePassword} type={showPass} placeholder="*******" />
                                { showPass == 'password'?
                                <BsEyeSlash onClick={handleShowPass} className="absolute transform translate-y-[-50%] top-[50%] right-5 lg:left-[410px]  cursor-pointer text-[20px] text-borderColor"/>
                                :
                                <BsEye onClick={handleShowPass} className="absolute transform translate-y-[-50%] top-[50%] right-5 lg:left-[410px] cursor-pointer text-[20px] " />
                                }
                            </div>
                            <p className="error">{passwordError}</p>
                        </div>
                        
                        <button className="common_btn">Sign Up</button>
                        <p>Already  have an account ? <Link to='/login' className="another_link">Sign In</Link></p>
                    </form>
                </div>
            </div>
            <div className="right">
            <Lottie animationData={RegAnimation} />
            </div>
        </div>
    );
};

export default Registration;