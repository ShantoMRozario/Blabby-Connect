import {  useEffect, useState } from "react";
import {toast} from 'react-toastify'
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";

const GroupList = () => {


//get Database
const db = getDatabase();

//redux Store
const data = useSelector ((state) => state.userLoginInfo.userInfo)


const [show, setShow] = useState(false)
const [groupName, setGroupName] = useState('')
const [tagLine, setTagLine] = useState('')
const [loading, setLoading] = useState(false)
const [groupList, setGroupList] = useState([])
const [groupJoinReq, setGroupJoinReq] = useState([])





const handleGroupName = (e)=>{
setGroupName(e.target.value)
}
const handleTagLine = (e)=>{
setTagLine(e.target.value)
}



//Create Group in Database
const handleCreateGroup = ()=>{
if(groupName == ''){
    toast.success('Enter Group Name')
}
else if(tagLine == ''){
    toast.success('Enter Tag Line')
}
else{
    setLoading(true)
        set(push(ref(db,"groupList")),{
            groupName: groupName,
            tagLine: tagLine,
            adminName: data.displayName,
            adminId: data.uid
        }).then(()=>{
            setLoading(false)
            setShow(false)
            setGroupName('')
            setTagLine('')
            toast.success('Congratulations, You have Created a New Group')
        })


}

}

//get data from database
useEffect(()=>{
const groupRef = ref(db,'groupList')
onValue(groupRef,(snapshot)=>{
    let list = []
snapshot.forEach((item)=>{
if (data.uid !== item.val().adminId) {
list.push({...item.val(), id: item.key})

}
})
setGroupList(list)
})

},[]);
//get data from database

//Join Request start
const handleJoinReq = (item)=>{
    set(push(ref(db,"groupJoinRequest")),{
        groupId: item.id,
        groupName: item.groupName,
        tagLine: item.tagLine,
        adminId: item.adminId,
        adminName : item.adminName,
        requestId: data.uid,
        requestName: data.displayName,
    }).then(()=>{
        toast.success(`You sent join request to ${item.groupName}`)
    })
    


}
//Join Request end

//get group join request
useEffect(()=>{
    const groupJoinRef = ref(db,'groupJoinRequest')
    onValue(groupJoinRef,(snapshot)=>{
        let list = []
        snapshot.forEach((item)=>{
            if(data.uid == item.val().requestId){
                list.push({...item.val(),id:item.key})
            }
            setGroupJoinReq(list)
        })
    })
},[])



return (
<div className="allhomeitems">
    <div className="title flex justify-between">
        <h2>group list : {groupList.length}</h2>
        {/* <button>
            <BsThreeDotsVertical />
        </button> */}
        <div className=" btn ">
            <button onClick={()=> setShow(!show)} type="button" className="text-sm bg-textBlueColor p-2" >New Group</button>
        </div>

        {
            show&&
                <div className="fixed top-0 left-0 bg-textOrangeColor z-[9999] modal w-full h-screen">


                    <div className="form_body mx-auto w-[30%] bg-primaryColor p-2 rounded-lg lg:mt-[200px]">
                        
                        <h2 className="my-3">Create New Group</h2>
                        <form>
                            <input onChange={handleGroupName} type="text" value={groupName}
                                className="w-full text-[16px] outline-none text-blackColor rounded-lg font-normal p-3 my-2"
                                placeholder="Group Name" />
                            <input onChange={handleTagLine} type="text" value={tagLine}
                                className="w-full text-[16px] outline-none text-blackColor rounded-lg font-normal p-3 my-2"
                                placeholder="Tag Line" />
                            <div className="btn text-right mt-5">
                                <button onClick={()=> {setShow(!show),setLoading(false)}} type="button" className="text-sm
                                    bg-redColor px-5 py-3 rounded-lg ml-2 " >
                                    Cancel
                                </button>
                                {
                                loading?
                                <button type="button" className="text-sm bg-textOrangeColor px-5 py-3 rounded-lg ml-2 ">
                                    <SyncLoader margin={2} size={10} color="#36d7b7" />
                                </button>
                                :
                                <button onClick={handleCreateGroup} type="button"
                                    className="text-sm bg-textOrangeColor px-5 py-3 rounded-lg ml-2 ">
                                    Create
                                </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
        }

    </div>
    <div className="home_item">
        {
        groupList.map((item,i)=>{
        return(
        <div key={i} className="content">
            
            <div className="user">
                <div className="image">
                <span className="font-bold flex justify-center items-center mt-2">{item.groupName[0] + item.groupName[1] }</span>
                </div>
                <div className="info">
                    <h2>{item.groupName}</h2>
                    <p>Admin: {item.adminName}</p>
                </div>
            </div>
            <div className="btn">
                {
                    groupJoinReq.some((item) => item.requestId === data.uid) ?
                    <button >Request Sent</button>
                    :
                    <button onClick={()=>handleJoinReq(item)} >join</button>
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

export default GroupList;