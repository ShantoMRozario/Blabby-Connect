import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect } from "react";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import ProfilePicBlockList from "./ProfilePicBlockList";


const BlockedUsers = () => {


    //database
const db = getDatabase()
//redux Store
const data = useSelector ((state) => state.userLoginInfo.userInfo)

//state
const [blockList,setBlockList] = useState([])
console.log(blockList);

//get block user from database
useEffect(()=>{
    const blockListRef = ref(db,"blockedUser")
    onValue(blockListRef,(snapshot)=>{
        let list = []
        snapshot.forEach((item)=>{
            // if(data.uid === item.val().blockById){
            //     list.push({
            //         id: item.key,
            //         blockedId: item.val().blockedId,
            //         blockedIdName: item.val().blockedIdName,
            //     })
            // }
            // else if(data.uid === item.val().blockedId){
            //     list.push({
            //         id: item.key,
            //         blockById: item.val().blockById,
            //         blockByIdName: item.val().blockByIdName
            //     })
            // }
            // // else{
            // //     list.push({
            // //         id: item.key,
            // //         blockById: item.val().blockById,
            // //         blockByIdName: item.val().blockByIdName
            // //     })
            // // }
            if(data.uid === item.val().blockById){
                    list.push({
                        id: item.key,
                        blockedId: item.val().blockedId,
                        blockedIdName: item.val().blockedIdName,
                        uniKeyBlockBy : item.val().blockedId + item.val().blockById
                    })
                }
                else if(data.uid === item.val().blockedId){
                    list.push({
                        id: item.key,
                        blockById: item.val().blockById,
                        blockByIdName: item.val().blockByIdName,
                        uniKeyBlocked : item.val().blockById + item.val().blockedId
                    })
                }
        })
        setBlockList(list)
    })
},[])

const handleUnblock = (item)=>{
    set(push(ref(db,"friends")),{
        senderId: item.blockedId ,
        senderName: item.blockedIdName,
        receiverId: data.uid,
        receiverName: data.displayName,

    })
    .then(()=>{
        remove(ref(db,'blockedUser/' + item.id))
    })
}

    return (
        <div className="allhomeitems">
                <div className="title">
                        <h2>blocked users {blockList.length}</h2>
                    <button>
                        <BsThreeDotsVertical />
                    </button>
                </div>
            <div className="home_item">

                {
                    blockList.length <= 0 ?
                    <h2 className="text-center pt-5">No Block Data</h2>
                    :
                (
                    blockList.map(item =>{
                        return(
                            <div key={item.id} className="content">
                                <div className="user">
                                    {/* <ProfilePicBlockList user={item}></ProfilePicBlockList> */}
                                    {
                                        data.uid == item.blockById?
                                        <ProfilePicBlockList user={item}></ProfilePicBlockList>
                                        :
                                        data.uid == item.blockedId?
                                        <ProfilePicBlockList user={item}></ProfilePicBlockList>
                                        :
                                        null
                                    }
                                    
                                    <div className="info">
                                        {
                                            // item.blockedId ?
                                            //  <>
                                            // <h2>{item.blockedIdName}</h2>
                                            // <p>You Blocked {item.blockedIdName}</p>
                                            //  </>:
                                            //  item.blockById ?
                                            //  <>
                                            // <h2>{item.blockByIdName}</h2>
                                            // <p>You are Blocked by {item.blockByIdName}</p>
                                            //  </>:
                                            //  null
                                            item.uniKeyBlockBy?
                                            <>
                                                <h2>{item.blockedIdName}</h2>
                                                <p>You Blocked {item.blockedIdName}</p>
                                            </>:
                                            item.uniKeyBlocked?
                                            <>
                                                <h2>{item.blockByIdName}</h2>
                                                <p> {item.blockByIdName} Blocked You</p>
                                            </>:
                                            null
                                            
                                        }
                                    </div>
                                </div>
                                <div className="btn">
                                    {
                                        item.uniKeyBlockBy  ?
                                        <button onClick={()=>handleUnblock(item)} className='!bg-textOrangeColor ml-2'>Unblock</button>
                                        :

                                        null
                                    }
                                </div>
                            </div>

                        )
                    })
                )
                }
                
            </div>
        </div>
    );
};

export default BlockedUsers;