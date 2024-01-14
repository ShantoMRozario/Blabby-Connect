

import { GoFileDirectory } from "react-icons/go";
import { BsImages } from "react-icons/bs";
import ModalImage from "react-modal-image";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect } from "react";

const Chat = () => {

    //useState: message
    const [message,setMessage] = useState('')
    //useState: messageList
    const [messageList,setMessageList] = useState([])
    console.log(messageList);

    //databse
    const db = getDatabase()

    //redux Store
    const data = useSelector((state) => state.userLoginInfo.userInfo)
    const selectedFriend = useSelector((state)=> state.selectedFriendInfo.selectedFriend)

    
    
    //Send Message
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(selectedFriend?.status == 'selected'){
            set(push(ref(db,'friendMessage')),{
                sentById:data.uid,
                sentByName:data.displayName,
                receivedById:selectedFriend.id,
                receivedByName:selectedFriend.name,
                message:message,
                date: `${new Date().getHours() % 12} : ${new Date().getMinutes()}, ${new Date().getHours() > 12 ? 'PM' : 'AM' }  `,
                year: `${new Date().getDate()} - ${new Date().getMonth() + 1} - ${new Date().getFullYear()}`,
            })
            .then(()=>{
                console.log('hoise');
                setMessage('')
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }
     //Send Message

     //Load Sent or Received message
     useEffect(()=>{
        onValue(ref(db,'friendMessage'),(snapshot)=>{
            let list = []
            snapshot.forEach((item)=>{
                if(
                    (item.val().sentById == data.uid && item.val().receivedById == selectedFriend.id) ||
                    (item.val().sentById == selectedFriend.id && item.val().receivedById == data.uid) 
                ){
                    list.push(item.val())
                }
            })
            setMessageList(list)
        })
     },[selectedFriend.id])
     //Load Sent or Received message


    return (
        <div>
            <div className="">
                <div className="title w-full lg:text-[20px]  flex gap-3 items-center py-2 lg:py-4 px-[28px] capitalize  bg-primaryColorv2 text-whiteColor font-semibold">
                    <div className="image bg-textOrangeColor w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-primaryColor">
                        <span className="font-bold flex justify-center items-center  mt-2">G</span>
                    </div>
                    <div className="text">
                        <h2>{selectedFriend?.name }</h2>
                        <h5 className="text-sm font-normal">online</h5>
                    </div>
                    
                </div>
            </div>
            {/* Message */}
            <div className="overflow-y-scroll h-[710px] px-[20px] pt-2  mb-[500px]">
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
                            alt=""
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
                            alt=""
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
            <div className="sticky w-full right-0 bottom-[0px] bg-whiteColor  border-t border-textAshColor p-5 ">
                <form onSubmit={handleSubmit} className="flex items-center justify-between" >
                    <input onChange={(e)=> setMessage(e.target.value)} className="w-[80%] rounded-lg p-2 border border-primaryColor focus:outline-none" type="text" value={message} />
                    <GoFileDirectory className="text-[30px] text-primaryColor" />
                    <BsImages className="text-[30px] text-primaryColor" />
                
                    {
                        message.length > 0?
                        <div  className="py-2 px-[35px] rounded-lg capitalize bg-primaryColorv2 text-whiteColor">send</div>
                        :
                        <button  className="py-2 px-[35px] rounded-lg capitalize bg-primaryColorv3 text-whiteColor">send</button>
                    }
                    
                </form>
            </div>
            {/* send text input and button */}
        </div>
    );
};

export default Chat;