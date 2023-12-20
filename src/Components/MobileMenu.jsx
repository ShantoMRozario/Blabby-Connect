
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoCloudUploadOutline, IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import { TbMessage2 } from 'react-icons/tb';
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import { useSelector } from 'react-redux';

// import  { ReactCropperElement, Cropper} from "react-cropper";
import { createRef, useState } from 'react';
import "cropperjs/dist/cropper.css";
import { Cropper } from 'react-cropper';
import { getDownloadURL, getStorage ,ref, uploadString } from 'firebase/storage';
import { userLoginInfo } from '../Slices/userSlice';

import { useDispatch } from "react-redux/es/exports";


const MobileMenu = () => { 

    const dispatch = useDispatch()

    const auth = getAuth();
    const navigate = useNavigate()
    
    //To get User data from Redux store
    const data = useSelector((state)=> state.userLoginInfo.userInfo);
    //modal for profile pic
    const [modal,setModal] = useState(false)
    //Firebase photo upload
    const storage = getStorage();
    
    
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
            getDownloadURL(storageRef).then((downloadURL) => {
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
            });
            });
        }
      };
    
    // ImageCroper for profile pic end

    //sign out
    const handleSignOut = ()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.removeItem('user')
            dispatch(userLoginInfo(null))
            navigate('/login')
            toast.success('Logout Successfull')
          }).catch((error) => {
            // An error happened.
          });
    }

return (
<div id="mobilemenu" className='lg:hidden'>
    <div className="mobile_main">
        <div className="image">
                <img src={data?.photoURL}  alt="" />
                <div  onClick={()=>{setModal(!modal)}}  className="upload">
                    <IoCloudUploadOutline />
                </div>
            </div>
        <div className="mobile_option">
            <button >
                <IoHomeOutline />
            </button>
            <button >
                <TbMessage2 />
            </button>
            <button >
                <IoMdNotificationsOutline />
            </button>
            <button >
                <IoSettingsOutline />
            </button>
        </div>
        <div className="logout">

            <button onClick={handleSignOut}>
                <MdLogout  />
            </button>

        </div>
    </div>

    {/* Modal */}

    { modal &&
    <div className="profile_pic_upload_modal">
        <div className="modal">
            <div className="heading text-[25px] mb-[20px] text-primaryColor ">
                <h2>Upload profile picture</h2>
            </div>
            <div className="import mb-5 border border-primaryColor rounded-lg py-[20px]">
                <input className='pl-5' type="file" onChange={handleProfilePicUpload} />
            </div>
            { image&&
                <div className="profie_cropper">
                    <Cropper 
                    ref={cropperRef}
                    style={{ height: 400, width: "98%" }}
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
                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                        guides={true}
                        />
                </div>
            }
            <div className="btn flex gap-2 mt-4">
                <button  onClick={()=>{setModal(!modal),setCropData(''),setImage('')}} className='common_btn bg-redColor text-lg'>cancel</button>
                { 
                image&&
                <button onClick={getCropData} className='common_btn text-lg'>upload</button>
                }
            </div>
        </div>
    </div>

    }
</div>
);
};

export default MobileMenu;