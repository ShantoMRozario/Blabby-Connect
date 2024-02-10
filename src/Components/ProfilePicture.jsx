
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect } from "react";
import { useState } from "react";



const ProfilePicture = ({item}) => {

    const storage = getStorage()
    const [image , setImage] = useState('');

    const profilePicRef = ref(storage, item?.id)

    useEffect(()=>{
        getDownloadURL(profilePicRef)
        .then((url)=>{
            setImage(url)
        })
        .catch((error)=>{
            // console.log();
        })
    },[])

    return (
        <div className="image">
            {
                image?
                <img src={image} alt="" />  
                :          
                <h5 className="flex justify-center leading-10 font-bold capitalize ">{item?.username[0]+item?.username[1]}</h5>

            }
            
        </div>
    );
};

export default ProfilePicture;