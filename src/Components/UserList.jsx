import { useEffect,useState } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { ImBlocked } from "react-icons/im";
import { FaPlus } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { useSelector } from 'react-redux';
import ProfilePicture from "../Components/ProfilePicture";


const UserList = () => {

const db = getDatabase()
const [userList, setUserList] = useState([])
const [friendList, setFriendList] = useState([])
const [friendReqList, setFriendReqList] = useState([])
const [blockList, setBlockList] = useState([])

// console.log(blockList); 

//To get User data from Redux store
const data = useSelector((state)=> state.userLoginInfo.userInfo);


//get data from database
useEffect(()=>{
    const userRef = ref(db,'users')
    let list = []
    onValue(userRef,(snapshot)=>{
        snapshot.forEach((item)=>{
            //for not showing own data in userlist if i logged in
            if(data.uid !== item.key){
                list.push({...item.val(), id: item.key})
            }
        })
        setUserList(list)
    })   
    
},[]);
//get data from database

//send Friend Request
const handleFriendReq = (item)=>{
    set(push(ref(db,"friendRequest")),{
        senderId: data.uid ,
        senderName: data.displayName,
        receiverId: item.id,
        receiverName: item.username,

    })
}

useEffect(()=>{
    const friendReqRef = ref(db,"friendRequest")
    onValue(friendReqRef,(snapshot)=>{
        let requestList= []
        snapshot.forEach((item)=>{
            requestList.push(item.val().receiverId + item.val().senderId)
        })
        setFriendReqList(requestList)
    })
},[])
//send Friend Request


//Accept Friend Request
useEffect (()=>{
    const friendListRef = ref(db,"friends")
    onValue(friendListRef,(snapshot)=>{
        let list = []
        snapshot.forEach((item)=>{
            list.push(item.val().receiverId + item.val().senderId)
        })
        setFriendList(list)
    })
},[])
//Accept Friend Request

//Block Friend 
useEffect (()=>{
    const blockListRef = ref(db,"blockedUser")
    onValue(blockListRef,(snapshot)=>{
        let list = []
        snapshot.forEach((item)=>{
            list.push(item.val().blockById + item.val().blockedId)
        })
        setBlockList(list)
    })
},[])
//Block Friend 


return (
<div className="allhomeitems ">
    <div className="title">
        <h2>user list</h2>
        <button>
            <BsThreeDotsVertical />
        </button>
    </div>

    <div className="home_item">
        {
        userList.map((item)=>{
        return(
        <div key={item.id} className="content ">
            <div className="user" >
                    <ProfilePicture item={item}></ProfilePicture>
                
                <div className="info">
                    <h2>{item.username}</h2>
                    <p>{item.email}</p>
                </div>
            </div>
            <div className="btn">
                {
                    friendList.includes(data.uid + item.id) || friendList.includes(item.id + data.uid)? 
                    <button className="flex !bg-textDeepBlueColor items-center justify-between gap-2"><LiaUserFriendsSolid /> <span>Friends</span></button>
                    :
                      blockList.includes(data.uid + item.id)? 
                        <button className="flex !bg-redColor items-center justify-between gap-2"><ImBlocked /> <span>Blocked</span></button>
                        :
                        blockList.includes(item.id + data.uid)? 
                        <button className="flex !bg-redColor items-center justify-between gap-2"><ImBlocked /> <span>No Entry</span></button>
                        :
                     friendReqList.includes(data.uid + item.id)? 
                     <button className="flex !bg-textBlueColor items-center justify-between gap-2"><IoCheckmarkDoneSharp /> <span>Accept Request</span></button>
                     :
                     friendReqList.includes(item.id + data.uid)?
                     <button className="flex !bg-textOrangeColor items-center justify-between gap-2"><IoMdCheckmark /> <span>Request Sent</span></button>
                     :
                     <button onClick={()=>handleFriendReq(item)} className="flex items-center justify-between gap-2"><FaPlus /> <span>Add Friend</span></button>
                     

                }
            </div>
        </div>

        )
        })
        }
    </div>

</div>
);
};

export default UserList;