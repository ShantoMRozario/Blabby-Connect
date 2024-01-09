import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { BsChatSquareText } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import { useSelector } from "react-redux";
import ProfilePicFriendReq from "./ProfilePicFriendReq";
import ProfilePicture from "./profilePicture";



const MyAllGroup = () => {


    //get Database
const db = getDatabase();

//redux Store
const data = useSelector((state) => state.userLoginInfo.userInfo)

    const [groupList, setGroupList] = useState([])
    const [groupJoinReq, setGroupJoinReq] = useState([])
    const [groupMembers, setGroupMembers] = useState([])
    const [selectMyGroup,setSelectMyGroup] = useState('')
    const [showGroupReq, setShowGroupReq] = useState(false)
    const [showGroupInfo, setShowGroupInfo] = useState(false)

console.log(groupMembers);

    //get data from database
useEffect(()=>{
    const groupRef = ref(db,'groupList')
    onValue(groupRef,(snapshot)=>{
        let list = []
        snapshot.forEach((item)=>{
            if (data.uid == item.val().adminId) {
                    list.push({...item.val(), id:item.key})
                    
                }   
        })
        setGroupList(list)
    })   
    
},[]);
//get data from database

// Delete group
const handleDeleteMyGroup = (item)=>{
    remove(ref(db,'groupList/' + item.id))
}


//handle group join reqest
const handleGroupJoinReq = (group)=>{
    const groupJoinRef = ref(db,'groupJoinRequest')
    onValue(groupJoinRef,(snapshot)=>{
        let list = []
        snapshot.forEach((item)=>{
            if(data.uid == item.val().adminId && item.val().groupId === group.id){
                list.push({...item.val(),id:item.key})
            }
        })
        setGroupJoinReq(list)
    })
}

// Accept group join req
const handleAcceptGroupJoinReq = (item)=>{
    set(push(ref(db,"groupMembers")),{
        groupId: item.groupId,
        groupName: item.groupName,
        adminId: item.adminId,
        adminName: item.adminName,
        userId: item.requestId,
        userName: item.requestName
    }).then(()=>{
        remove(ref(db,'groupJoinRequest/' + item.id))
    })
}


//Delete group join req
const handleDeleteGroupJoinReq = (item)=>{
    remove(ref(db,'groupJoinRequest/' + item.id))
}

// get data from database of Group members

const handleGroupInfo = (group)=>{
    const groupMembersRef = ref(db,'groupMembers')
    onValue (groupMembersRef, (snapshot)=>{
        let list = []
        snapshot.forEach((item)=>{
            if(data.uid == group.adminId && item.val().groupId == group.id ){
                list.push({...item.val(), id:item.key})
            }
        })
        setGroupMembers(list)
    })
}

// kick Group users
const handleKickGroupUser = (item)=>{
    remove(ref(db,'groupMembers/' + item.id))
}


    return (
        <div className="allhomeitems">
        <div className="title">
            <h2>my group : {groupList.length}</h2>
            
        </div>

        <div className="home_item">
        {
            groupList.map((group)=>{
                return(
        <div key={group.id} className="content relative">
            <>
            <div className="user">
                <div className="image">
                    <span className="font-bold flex justify-center items-center  mt-2">{group.groupName[0] + group.groupName[1] }</span>
                </div>
                <div className="info">
                    <h2>{group.groupName}</h2>
                    <h3>Admin: {group.adminName}</h3>
                </div>
            </div>
            <div className="btn flex gap-2">
                    <button className= "text-sm bg-textBlueColor p-2 flex gap-2 items-center"><BsChatSquareText /> Message</button>
            </div>
            </>
        </div>

                )
            })
        }
    </div>
</div>
    );
};

export default MyAllGroup;