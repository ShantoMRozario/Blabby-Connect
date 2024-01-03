import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { TiGroup } from "react-icons/ti";
import { useSelector } from "react-redux";



const MyGroup = () => {


    //get Database
const db = getDatabase();

//redux Store
const data = useSelector((state) => state.userLoginInfo.userInfo)

    const [groupList, setGroupList] = useState([])
    const [groupJoinReq, setGroupJoinReq] = useState([])
    const [selectMyGroup,setSelectMyGroup] = useState('')
    const [showGroupReq, setShowGroupReq] = useState(false)
    console.log(groupJoinReq);


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


//get group join request
// useEffect(()=>{
//     const groupJoinRef = ref(db,'groupJoinRequest')
//     onValue(groupJoinRef,(snapshot)=>{
//         let list = []
//         snapshot.forEach((item)=>{
//             if(data.uid !== item.val().requestId){
//                 list.push({...item.val(),id:item.key})
//             }
//             setGroupJoinReq(list)
//         })
//     })
// },[])

//handle group join reqest
const handleGroupJoinReq = (group)=>{
    const groupJoinRef = ref(db,'groupJoinRequest')
    onValue(groupJoinRef,(snapshot)=>{
        let list = []
        snapshot.forEach((item)=>{
            if(data.uid == item.val().adminId && item.val().groupId == group.key){
                list.push({...item.val(),id:item.key})
            }
        })
        setGroupJoinReq(list)
    })
}

    return (
        <div className="allhomeitems">
        <div className="title">
            <h2>my group : {groupList.length}</h2>
            
        </div>

        {/* Group Join Reqests */}

        {
            showGroupReq &&

            <div className="fixed top-0 left-0 bg-whiteColor z-[9999] modal w-full h-screen ">
                 <button onClick={()=>{setShowGroupReq(!showGroupReq)}} className= "text-sm bg-redColor text-whiteColor m-5 p-2 flex gap-2 items-center"> Cancel</button>

               <div  className=" mx-auto w-[30%] bg-whiteColor shadow-xl rounded-lg lg:mt-[200px] h-[350px] overflow-y-scroll ">
                        
                        <h2 className="my-3 text-center text-[14px] lg:text-[16px] font-semibold capitalize mb-5">Group Join Requests</h2>


                {
                    groupJoinReq.length <= 0 ?
                    <h2 className="text-center capitalize">no request</h2>
                    :
                    <>
                    { 
                    groupJoinReq.map((group,i)=>{
                        return(

                        <div key={i} className="main flex items-center justify-between bg-textLightAshColor p-2 my-2">
                            <div className="user">
                                <div className="image">
                                    {/* <span className="font-bold flex justify-center items-center  mt-2">{item.groupName[0] + item.groupName[1] }</span> */}
                                </div>
                                <div className="info">
                                    <h2 className="text-[18px] capitalize ">{group.requestName}</h2>
                                    <h3 className="text-sm text-textAshColorv2 capitalize">group name : {group.groupName}</h3>
                                </div>
                            </div>
                                    <div className="btn flex gap-2">
                                            <button className="!bg-textBlueColor px-5 py-2 text-whiteColor">Accept</button>
                                            <button  className="!bg-redColor px-5 py-2 text-whiteColor">Delete</button>
                                    </div>
                        </div>
                        )
                        
                    })} 
                    </>  
                }
                </div>
            </div>
        }
        

      
        


        {/* Group Join Reqests */}

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
                    <button onClick={()=>{handleGroupJoinReq(group),setShowGroupReq(!showGroupReq)}} className= "text-sm bg-textBlueColor p-2 flex gap-2 items-center"><TiGroup /> Join Req</button>
                    <button className="!bg-textBlueColor">Info</button>
                    <button onClick={()=>{setSelectMyGroup(group)}} className="!bg-redColor">Delete</button>
            </div>
            </>
            {
                selectMyGroup && selectMyGroup.id == group.id &&(

                    <div className="popup bg-textOrangeColor absolute right-0 top-0 w-full z-10 h-full text-whiteColor flex items-center justify-between px-2  ">
                        <h2 className='capitalize'>Delete {group.groupName} ?</h2>
                        <div className="btn">
                            <button onClick={()=>handleDeleteMyGroup(group)} className='!bg-textBlueColor'>Yes</button>
                            <button onClick={()=> setSelectMyGroup(null)} className='!bg-redColor ml-2'>no</button>
                        </div>
                    </div>
                    )
            }
        </div>

                )
            })
        }
    </div>
</div>
    );
};

export default MyGroup;