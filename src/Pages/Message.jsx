import Friends from "../Components/Friends";
import GroupList from "../Components/GroupList";
import MobileMenu from "../Components/MobileMenu";
import MyAllGroup from "../Components/MyAllGroup";
import Sidebar from "../Components/Sidebar";

import Chat from "../Components/Chat";





const Message = () => {
return (

<div>
    <MobileMenu></MobileMenu>
    <Sidebar></Sidebar>
    <div className="flex  justify-evenly py-5 px-5">

        <div className="left w-[30%] ml-[120px] ">
            <div className="allItems flex flex-col gap-5 ml-0">
                <div className="item !p-0 !w-[90%] h-[40%]">
                    <MyAllGroup />
                </div>
                <div className="item !w-[90%] h-[40%]">
                    <Friends />
                </div>
            </div>
        </div>
        <div className="right overflow-y-hidden relative h-[880px]  w-[70%]  shadow-lg">
            <Chat></Chat>
        </div>
        
    </div>
</div>

);
};

export default Message;