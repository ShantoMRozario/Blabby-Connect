
import Sidebar from "../Components/Sidebar";
import MobileMenu from "../Components/MobileMenu";
import UserList from "../Components/UserList";
import GroupList from "../Components/GroupList";
import Friends from "../Components/Friends";
import FriendRequest from "../Components/FriendRequest";
import MyGroup from "../Components/MyGroup";
import BlockedUsers from "../Components/BlockedUsers";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {useNavigate} from 'react-router-dom'
import { useEffect } from "react";



const Home = () => {
    const navigate = useNavigate()
    const data = useSelector((state)=> state.userLoginInfo.userInfo);

    useEffect(()=>{
        if(!data){
            navigate('/login')
        }
    },[])
    return (
        <div>
           <MobileMenu></MobileMenu> 
           <Sidebar></Sidebar>
           <div className="allItems">
            <div className="item"><GroupList/></div>
            <div className="item"><Friends/></div>
            <div className="item"><UserList/></div>
            <div className="item"><FriendRequest/></div>
            <div className="item"><MyGroup/></div>
            <div className="item"><BlockedUsers/></div>
           </div>
        </div> 
    );
};

export default Home;