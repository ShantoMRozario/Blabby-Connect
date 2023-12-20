import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import ProfilePicFriendReq from './ProfilePicFriendReq';

const FriendRequest = () => {

const db = getDatabase()
const [friendReqList, setFriendReqList] = useState([]);
const [selectFriendReq, setSelectFriendReq] = useState('')


//To get User data from Redux store
const data = useSelector((state)=> state.userLoginInfo.userInfo);

//get data from database
useEffect(()=>{ 
    
    const requestRef = ref(db,"friendRequest")
    onValue(requestRef,(snapshot)=>{
        let requestList = []
        snapshot.forEach((item)=>{
            if (item.val().receiverId === data.uid){
                requestList.push({...item.val() ,id: item.key})
                
            }
        })
        setFriendReqList(requestList)
        
    })
    
},[]);
//get data from database

// Cancel Friend Request start
const handleCancelFriendReq = (item)=> {
    remove(ref(db,'friendRequest/'+ item.id))
}
//Cancel Friend Request end


//Accept Friend Request start
const handleAcceptFriendReq = (item) =>{
    set(push(ref(db,"friends")),{...item})
    .then(()=>{
        remove(ref(db,'friendRequest/'+ item.id))
    })
}
//Accept Friend Request end


return (
<div className="allhomeitems">
    <div className="title">
        <h2>friend request : {friendReqList.length}</h2>
        <button>
            <BsThreeDotsVertical />
        </button>
    </div>
    <div className="home_item">

    {
        friendReqList.length <= 0 ?
        <h2 className="text-center pt-5">No Friends Request to Show</h2>
        :
        <>
        {
            friendReqList.map((item, i) =>{
                return(
                    <div key={i} className="content relative">
                        <>
                        <div className="user ">
                            <ProfilePicFriendReq user={item}></ProfilePicFriendReq> 
                            <div className="info">
                                <h2>{item.senderName}</h2>
                                <p>Hey! I want to be your friend.</p>
                            </div>
                        </div>
                        <div className="btn">
                            <button onClick={()=>handleAcceptFriendReq(item)} className='!bg-textBlueColor'>Accept</button>
                            <button onClick={()=>setSelectFriendReq(item)} className='!bg-redColor ml-2'>Delete</button>
                        </div>
                        </>   
                        {
                            selectFriendReq && selectFriendReq.id == item.id &&(

                            <div className="popup bg-textOrangeColor absolute right-0 top-0 w-full z-10 h-full text-whiteColor flex items-center justify-between px-2  ">
                                <h2 className='capitalize'>Delete {item.senderName}'s Friend Request ?</h2>
                                <div className="btn">
                                    <button onClick={()=>handleCancelFriendReq(item)} className='!bg-textBlueColor'>Yes</button>
                                    <button onClick={()=> setSelectFriendReq(null)} className='!bg-redColor ml-2'>no</button>
                                </div>
                            </div>
                            )
                        }

                    </div> 
                )
            })
        }
        </>
    }

    </div>
</div>
);
};

export default FriendRequest;

