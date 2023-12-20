import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";



const MyGroup = () => {


    //get Database
const db = getDatabase();

//redux Store
const data = useSelector ((state) => state.userLoginInfo.userInfo)
    const [groupList, setGroupList] = useState([])


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
        <div key={item.id} className="content">
            <div className="user">
                <div className="image">
                    <span className="font-bold flex justify-center items-center  mt-2">{item.groupName[0] + item.groupName[1] }</span>
                </div>
                <div className="info">
                    <h2>{item.groupName}</h2>
                    <h3>Admin: {item.adminName}</h3>
                </div>
            </div>
            <div className="btn">
            <p>Today, 8:56pm</p>
            </div>
        </div>

                )
            })
        }
    </div>
</div>
    );
};

export default MyGroup;