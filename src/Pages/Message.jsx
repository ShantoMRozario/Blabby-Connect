import Friends from "../Components/Friends";
import GroupList from "../Components/GroupList";
import MobileMenu from "../Components/MobileMenu";
import MyAllGroup from "../Components/MyAllGroup";
import Sidebar from "../Components/Sidebar";
import { GoFileDirectory } from "react-icons/go";
import { BsImages } from "react-icons/bs";
import ModalImage from "react-modal-image";





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
            <div className="">
                <div className="title w-full lg:text-[20px]  flex gap-3 items-center py-2 lg:py-4 px-[28px] capitalize  bg-primaryColorv2 text-whiteColor font-semibold">
                    <div className="image bg-textOrangeColor w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-primaryColor">
                        <span className="font-bold flex justify-center items-center  mt-2">G</span>
                    </div>
                    <div className="text">
                        <h2>my group : </h2>
                        <h5 className="text-sm font-normal">online</h5>
                    </div>
                    
                </div>
            </div>
            {/* Message */}
            <div className="overflow-y-scroll h-[800px] px-[20px] pt-2 pb-[100px] mb-[500px]">
                 {/*REceived Message  */}
                 <div className="receivetextMain">
                    <div className="receivetext flex gap-4 mb-5">
                        <div className="image  w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-primaryColor">
                            <span className="font-bold flex justify-center items-center  mt-2">G</span>
                        </div>
                        <p className="bg-textLightAshColor w-[80%] p-5 text-justify rounded-lg rounded-tl-none">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus ex, explicabo autem voluptatem nostrum, expedita nam temporibus deleniti error vitae illum nesciunt quia possimus facere? Provident molestias perferendis consectetur inventore possimus sed voluptas! Mollitia necessitatibus voluptatem ad blanditiis eaque, voluptatum atque, fugit animi unde vero ea consequuntur cumque doloribus labore?</p>

                    </div>
                 </div>
                 {/*REceived Message  */}

                 {/*Send Message  */}
                 <div className="senttextMain">
                    <div className="senttext flex gap-4 mb-5 justify-end">
                        <p className="bg-primaryColor text-whiteColor w-[80%] p-5 text-justify rounded-lg rounded-tr-none">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus ex, explicabo autem voluptatem nostrum, expedita nam temporibus deleniti error vitae illum nesciunt quia possimus facere? Provident molestias perferendis consectetur inventore possimus sed voluptas! Mollitia necessitatibus voluptatem ad blanditiis eaque, voluptatum atque, fugit animi unde vero ea consequuntur cumque doloribus labore?</p>
                        <div className="image bg-textOrangeColor w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-primaryColor">
                            <span className="font-bold flex justify-center items-center  mt-2">G</span>
                        </div>

                    </div>
                 </div>
                 {/*Send Message  */}


                 {/*REceived Image  */}
                 <div className="receivetextMain">
                    <div className="receivetext flex gap-4 mb-5">
                        <div className="image  w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-primaryColor">
                            <span className="font-bold flex justify-center items-center  mt-2">G</span>
                        </div>
                        <div className="bg-textLightAshColor w-[80%] p-5 text-justify rounded-lg rounded-tl-none">
                            <ModalImage
                            small='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'
                            large="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                            alt="Hello World!"
                            />
                        </div>

                    </div>
                 </div>
                 {/*REceived Image  */}

                 {/*Send Image  */}
                 <div className="senttextMain">
                    <div className="senttext flex gap-4 mb-5 justify-end">
                        <div className="bg-primaryColor text-whiteColor w-[80%] p-5 text-justify rounded-lg rounded-tr-none">
                        <ModalImage
                            small='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'
                            large="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                            alt="Hello World!"
                            />
                        </div>
                        <div className="image bg-textOrangeColor w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-primaryColor">
                            <span className="font-bold flex justify-center items-center  mt-2">G</span>
                        </div>

                    </div>
                 </div>
                 {/*Send Image  */}
            </div>
            {/* Message */}

            {/* send text input and button */}
            <div className="sticky w-full right-0 bottom-[0px] bg-whiteColor  border-t-2 border-textAshColor p-5 ">
                <form className="flex items-center justify-between" >
                    <input className="w-[80%] rounded-lg p-2 border border-primaryColor focus:outline-none" type="text" />
                    <GoFileDirectory className="text-[30px] text-primaryColor" />
                    <BsImages className="text-[30px] text-primaryColor" />
                    <button className="py-2 px-[35px] rounded-lg capitalize bg-primaryColorv2 text-whiteColor">send</button>
                </form>
            </div>
            {/* send text input and button */}
        </div>
    </div>
</div>

);
};

export default Message;