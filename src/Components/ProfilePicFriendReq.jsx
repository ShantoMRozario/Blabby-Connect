


import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect } from "react";
import { useState } from "react";



const ProfilePicFriendReq = ({user}) => {

    const storage = getStorage()
    const [image , setImage] = useState('');
    

    const profilePicRef = ref(storage, user.senderId)

    useEffect(()=>{
        getDownloadURL(profilePicRef)
        .then((url)=>{
            setImage(url)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[user.senderId])

    return (
        <div className="image">
            {
                image?
                <img src={image} alt="" />  
                :          
                // <h5 className="flex justify-center leading-10 font-bold capitalize ">{user.senderName[0]+user.senderName[1]}</h5>
                null

            }
            
        </div>
    );
};

export default ProfilePicFriendReq;