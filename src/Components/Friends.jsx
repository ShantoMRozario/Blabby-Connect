import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { selectedFriendChat } from "../Slices/selectedFriendSlice";
import ProfilePicFriendReq from "./ProfilePicFriendReq";

const Friends = () => {

//database
const db = getDatabase()

//redux Store
const data = useSelector ((state) => state.userLoginInfo.userInfo)

const dispatch = useDispatch()

//state
const [friendList,setFriendList] = useState([])

//get friend list from database
useEffect(()=>{
const friendRef = ref(db, 'friends/')
onValue(friendRef,(snapshot)=>{
let list = []
snapshot.forEach((item)=>{
if(data.uid === item.val().receiverId){
list.push({...item.val(), key:item.key})
}
else if(data.uid === item.val().senderId){
list.push({...item.val(), key:item.key})
}
})
setFriendList(list)
})
},[])

//Block Friends start
const handleBlock = (item)=>{
if(data.uid === item.senderId){
    set(push(ref(db,"blockedUser")),{
        blockedId: item.receiverId,
        blockById: item.senderId,
        blockedIdName: item.receiverName,
        blockByIdName: item.senderName
    })
.then(()=>{
        remove(ref(db,"friends/" + item.key))
    })
}
else{
    set(push(ref(db,"blockedUser")),{
        blockedId: item.senderId,
        blockById: item.receiverId,
        blockedIdName: item.senderName ,
        blockByIdName: item.receiverName,
    })
.then(()=>{
        remove(ref(db,"friends/" + item.key))
    })
}
}
//Block Friends end
// Unfriend Friend start
    const handleUnfriend = (item)=>{
        remove(ref(db,"friends/" + item.key))
    }
// Unfriend Friend end 

//handle Selected Friend
const handleSelectedFriend = (item)=>{
    
    if(item.receiverId == data.uid){
        dispatch(selectedFriendChat({status:'selected',id: item.senderId, name: item.senderName}))
        localStorage.setItem('selectedFriend',JSON.stringify({status:'selected',id: item.senderId, name: item.senderName}))
    }
    else{
        dispatch(selectedFriendChat({status:'selected',id: item.receiverId, name: item.receiverName}))
        localStorage.setItem('selectedFriend',JSON.stringify({status:'selected',id: item.receiverId, name: item.receiverName}))
    }
}

return (
<div className="allhomeitems">
    <div className="title">
        <h2>Friends ({friendList.length})</h2>
        <button>
            <BsThreeDotsVertical />
        </button>
    </div>
    <div className="home_item">
            {
                friendList.length <= 0 ?
                <h2 className="text-center pt-5">No Friends to Show</h2>
                :
                <>
                {
            friendList.map((item,i)=>{
            return(

            <div onClick={()=> handleSelectedFriend(item)} key={i} className="content cursor-pointer">
                <div className="user">
                    <ProfilePicFriendReq user={item}></ProfilePicFriendReq>
                    <div className="info">
                        {
                        data.uid === item.senderId?
                        <h2>{item.receiverName}</h2>
                        :
                        <h2>{item.senderName}</h2>
                        }
                        <h3>Dinner?</h3>
                    </div>
                </div>
                <div className="btn">
                    <button onClick={()=>handleBlock(item)} className='!bg-redColor'>Block</button>
                    <button onClick={()=>handleUnfriend(item)} className='!bg-textOrangeColor ml-2'>Unfriend</button>
                </div>
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

export default Friends;