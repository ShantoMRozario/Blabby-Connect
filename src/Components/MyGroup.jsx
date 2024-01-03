import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";



const MyGroup = () => {


    //get Database
const db = getDatabase();

//redux Store
const data = useSelector((state) => state.userLoginInfo.userInfo)

    const [groupList, setGroupList] = useState([])
    const [selectMyGroup,setSelectMyGroup] = useState('')


    //get data from database
useEffect(()=>{
    const groupRef = ref(db,'groupList')
    let list = []
    onValue(groupRef,(snapshot)=>{
        snapshot.forEach((item)=>{
            if (data.uid == item.val().adminId) {
                    list.push({...item.val(), id: item.key})
                    
                }   
        })
        setGroupList(list)
    })   
    
},[]);
//get data from database

// Delete group
const handleDeleteMyGroup = (item)=>{
    remove(ref(db,'groupList/' + item.id))
    console.log(item);
}

    return (
        <div className="allhomeitems">
        <div className="title">
            <h2>my group : {groupList.length}</h2>
            <button>
                <BsThreeDotsVertical />
            </button>
        </div>
    <div className="home_item">
        {
            groupList.map((item)=>{
                return(
        <div key={item.id} className="content relative">
            <>
            <div className="user">
                <div className="image">
                    <span className="font-bold flex justify-center items-center  mt-2">{item.groupName[0] + item.groupName[1] }</span>
                </div>
                <div className="info">
                    <h2>{item.groupName}</h2>
                    <h3>Admin: {item.adminName}</h3>
                </div>
            </div>
            <div className="btn flex gap-2">
                    <button className="!bg-textBlueColor">Info</button>
                    <button onClick={()=>{setSelectMyGroup(item)}} className="!bg-redColor">Delete</button>
            </div>
            </>
            {
                selectMyGroup && selectMyGroup.id == item.id &&(

                    <div className="popup bg-textOrangeColor absolute right-0 top-0 w-full z-10 h-full text-whiteColor flex items-center justify-between px-2  ">
                        <h2 className='capitalize'>Delete {item.groupName} ?</h2>
                        <div className="btn">
                            <button onClick={()=>handleDeleteMyGroup(item)} className='!bg-textBlueColor'>Yes</button>
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