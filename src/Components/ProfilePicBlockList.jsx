
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect } from "react";
import { useState } from "react";



const ProfilePicBlockList = ({user}) => {

    const storage = getStorage()
    const [image , setImage] = useState('');
    const profilePicRef = ref(storage, user?.blockById)
    console.log(user);

    useEffect(()=>{
        getDownloadURL(profilePicRef)
        .then((url)=>{
            setImage(url)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])

    return (
        <div className="image">
            {
                image?
                <img src={image} alt="" />  
                :          
                <h5 className="flex justify-center leading-10 font-bold capitalize ">{user?.blockedIdName[0]+user?.blockedIdName[1]}</h5>
                
                
                
            }
            
        </div>
    );
};

export default ProfilePicBlockList;