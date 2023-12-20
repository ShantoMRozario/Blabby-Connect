import { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { TbMessage2 } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdSwap } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
// import  { ReactCropperElement, Cropper} from "react-cropper";
import { createRef } from 'react';
import "cropperjs/dist/cropper.css";
import { Cropper } from 'react-cropper';
import { userLoginInfo } from "../Slices/userSlice";
import { useDispatch } from "react-redux/es/exports";





const Sidebar = () => {

    const auth = getAuth();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //modal for upload profile pic
    const [modal,setModal] = useState(false)

    //Firebase photo upload
    const storage = getStorage();
    console.log();

    //To get user data from redux store
    const data = useSelector((state)=> state.userLoginInfo.userInfo);
   

    //Expend sidebar
    const [expend,setExpend] = useState(false)
    const handleExpend = ()=>{
    setExpend(current => !current)
}

    //SignOut 
    const handleSignOut = ()=>{
        signOut(auth).then(() => {
            localStorage.removeItem('user')
            dispatch(userLoginInfo(null))
            navigate('/login')
            toast.success('Logout Successfull')
          }).catch((error) => {
            // An error happened.
          });
    }

    // ImageCroper for profile pic start
    const [image, setImage] = useState();
    const [cropData, setCropData] = useState("#");
    const cropperRef = createRef();
    const handleProfilePicUpload = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result );
        };
        reader.readAsDataURL(files[0]);
    };
    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
          
            const storageRef = ref(storage, data?.uid);
            // Data URL string
            const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
            uploadString(storageRef, message4, 'data_url').then((snapshot) => {
                // get the download URL
                getDownloadURL(storageRef)
                .then((downloadURL) => {
                    updateProfile(auth.currentUser,
                        {
                            photoURL: downloadURL
                        
                })
                dispatch(userLoginInfo({
                    ...data,
                    photoURL: downloadURL
                }))
                localStorage.setItem('user', JSON.stringify(auth.currentUser))
                setModal(false)
                
                console.log(storageRef);
            });
            
        });
        
    }
    
};
    
    // ImageCroper for profile pic end


return (
<div id="sidebar" className={expend ? 'side_expend' : '' }>
    <div className="main ">
        <div className="profile">
            <div className="image">
                <img src={data?.photoURL} alt="" />
                <div onClick={()=>{setModal(!modal)}} className="upload">
                    <IoCloudUploadOutline />
                </div>
            </div>
            <div className="user">
                <span className={expend ? '' : 'display_hidden' }>{data?.displayName}</span>
            </div>
        </div>
        <div className="menu">
            <div className="main_option">
                <button className="expend_text">
                    <IoHomeOutline />
                    <span className={expend ? '' : 'display_hidden' }>home</span>
                </button>
                <button className="expend_text">
                    <TbMessage2 />
                    <span className={expend ? '' : 'display_hidden' }>message</span>
                </button>
                <button className="expend_text">
                    <IoMdNotificationsOutline />
                    <span className={expend ? '' : 'display_hidden' }>notification</span>
                </button>
                <button className="expend_text">
                    <IoSettingsOutline />
                    <span className={expend ? '' : 'display_hidden' }>settings</span>
                </button>

            </div>
            <div className="logout">
                <button className="expend_text" onClick={handleExpend}>
                    <IoMdSwap />
                    <span className={expend ? '' : 'display_hidden' }>expend</span>
                </button>
                <button className="expend_text" onClick={handleSignOut}>
                    <MdLogout />
                    <span className={expend ? '' : 'display_hidden' }>logout</span>
                </button>

            </div>
        </div>
    </div>


    {/* Modal */}

    { modal &&
    <div className="profile_pic_upload_modal">
        <div className="modal">
            <div className="heading text-3xl mb-[20px] text-primaryColor ">
                <h2>Upload profile picture</h2>
            </div>
            <div className="import mb-5 border border-primaryColor rounded-lg py-[20px]">
                <input className='pl-5' type="file" onChange={handleProfilePicUpload} />
            </div>

            {image ?
                <div className="img-preview"></div>
                :
                <div className="default_img">
                    <img src={data?.photoURL} alt="" />
                </div>
            }
            { image &&
            <Cropper 
            ref={cropperRef}
            style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} 
                guides={true}
                />
            }
            <div className="btn flex gap-2 mt-4">
                <button  onClick={()=>{setModal(!modal),setCropData(''),setImage('')}} className='common_btn bg-redColor text-lg w-full'>cancel</button>
                { 
                image&&
                <button onClick={getCropData} className='common_btn text-lg w-full'>upload</button>
                }
            </div>
        </div>
    </div>

    }

</div>
);
};

export default Sidebar;