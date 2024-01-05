import Friends from "../Components/Friends";
import GroupList from "../Components/GroupList";
import MobileMenu from "../Components/MobileMenu";
import Sidebar from "../Components/Sidebar";





const Message = () => {
return (

<div>
    <MobileMenu></MobileMenu>
    <Sidebar></Sidebar>
    <div className="flex items-center justify-between py-5">

        <div className="left w-[30%] ml-[120px] ">
            <div className="allItems flex flex-col gap-5 ml-0">
                <div className="item !p-0 !w-[90%] h-[40%]">
                    <GroupList />
                </div>
                <div className="item !w-[90%] h-[40%]">
                    <Friends />
                </div>
            </div>
        </div>
        <div className="right h-[900px]  w-[70%] bg-textBlueColor shadow-lg">
            
        </div>
    </div>
</div>

);
};

export default Message;