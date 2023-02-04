import React,{useEffect,useState,useRef} from 'react';
import {BsThreeDots,FaEdit,BiSearch,IoLogOutOutline} from 'react-icons/all';
import { ActiveFriend } from './ActiveFriend';
import { Friends } from './Friends';
import { RightSide } from './RightSide';
import {useDispatch,useSelector} from 'react-redux';
import { getFriends, messageSend,getMessage,imageMessageSend } from '../store/actions/messengerAction';
import {io} from 'socket.io-client';
import { LOGOUT_SUCCESS, MESSAGE_SEND_SUCCESS_CLEAR, NEW_USER_ADD, NEW_USER_ADD_CLEAR, SOCKET_MESSAGE, UPDATE_FRIEND_MESSAGE } from '../store/types/messengerType';
import toast,{Toaster, toaster} from 'react-hot-toast';
import useSound from 'use-sound';
import notificationSound from '../audio/notification.mp3';
import sendingSound from '../audio/sending.mp3';
import { userLogout } from '../store/actions/authAction';
export const Messenger = () => {

    const {friends,message,messageSendSuccess,new_user_add}=useSelector(state=>state.messenger);
    const {myInfo}=useSelector(state=>state.auth);

    const [currentFriend,setCurrentFriend]=useState('');
    const [newMessage,setNewMessage]=useState('');
    const [activeUser,setActiveUser]=useState([]);
    const [socketMessage,setSocketMessage]=useState('');
    const [typingMessage,setTypingMessage]=useState('');
    const [hide,setHide]=useState(true);

    const scrollRef=useRef();
    const socket=useRef();
    const dispatch=useDispatch();


    const [notificationSPlay]=useSound(notificationSound);
    const [sendingSPlay]=useSound(sendingSound);


    useEffect(()=>{
        if(messageSendSuccess){
            socket.current.emit('sendMessage',message[message.length-1]);
            dispatch({
                type:UPDATE_FRIEND_MESSAGE,
                payload:{
                    messageInfo:message[message.length-1]
                }
            });
        }
        dispatch({type:MESSAGE_SEND_SUCCESS_CLEAR});
    },[messageSendSuccess])


    useEffect(()=>{
        socket.current=io('ws://localhost:8000');
        socket.current.on('getMessage',(data)=>{
            setSocketMessage(data);
        })
        socket.current.on('typingMessageGet',(data)=>{
            setTypingMessage(data);
        })
    },[])


    useEffect(()=>{
        if(socketMessage && currentFriend){
            if(socketMessage.senderId===currentFriend._id && socketMessage.receiverId===myInfo.id){
                dispatch({
                    type:SOCKET_MESSAGE,
                    payload:{
                        message:socketMessage
                    }
                })
            }
            dispatch({
                type:UPDATE_FRIEND_MESSAGE,
                payload:{
                    messageInfo:socketMessage
                }
            })
        }
        setSocketMessage('');
    },[socketMessage])


    useEffect(()=>{
        if(socketMessage && currentFriend){
            if(socketMessage.senderId!==currentFriend._id && socketMessage.receiverId===myInfo.id){
                notificationSPlay();
                toast.success(`${socketMessage.senderName} send a new message.`)
            }
        }
    },[socketMessage])


    useEffect(()=>{
        socket.current.emit('addUser',myInfo.id,myInfo);
    },[])


    useEffect(()=>{
        socket.current.on('getUser',(users)=>{
            const filterUser=users.filter(u=>u.userId!==myInfo.id);
            console.log(users);
            setActiveUser(filterUser);
        })
        socket.current.on('new_user_add',data=>{
            dispatch({
                type:NEW_USER_ADD,
                payload:{
                    new_user_add:data
                }
            })
        })
    },[])


    const inputHandle=(e)=>{
        setNewMessage(e.target.value);
        socket.current.emit('typingMessage',{
            senderId:myInfo.id,
            receiverId:currentFriend._id,
            message:e.target.value
        })
    }


    const sendMessage=(e)=>{
        e.preventDefault();
        sendingSPlay();
        const data={
            senderName:myInfo.userName,
            receiverId:currentFriend._id,
            message:newMessage?newMessage:'❤️'
        }
        socket.current.emit('typingMessage',{
            senderId:myInfo.id,
            receiverId:currentFriend._id,
            message:''
        })
        dispatch(messageSend(data));
        setNewMessage('');
    }

    const emojiSend=(emoji)=>{
        setNewMessage(`${newMessage}`+emoji);
        socket.current.emit('typingMessage',{
            senderId:myInfo.id,
            receiverId:currentFriend._id,
            message:emoji
        })
    }
    
    const imageSend=(e)=>{
        if(e.target.files[0]!==0){
            sendingSPlay();
            const imageName=e.target.files[0].name;
            const newImageName=Date.now()+imageName;

            const formData=new FormData();

            formData.append('senderName',myInfo.userName);
            formData.append('imageName',newImageName)
            formData.append('receiverId',currentFriend._id);
            formData.append('image',e.target.files[0]);

            dispatch(imageMessageSend(formData));
            socket.current.emit('sendMessage',{
                senderId:myInfo.id,
                senderName:myInfo.userName,
                receiverId:currentFriend._id,
                time:new Date(),
                message:{
                    text:'',
                    image:newImageName
                }
            })
        }
    }


    useEffect(()=>{
        if(friends && friends.length>0) setCurrentFriend(friends[0]);
        dispatch(getFriends());
        dispatch({type:NEW_USER_ADD_CLEAR});
    },[new_user_add])


    useEffect(()=>{
        if(friends && friends.length>0) setCurrentFriend(friends[0].friendInfo);
    },[friends])


    useEffect(()=>{
        dispatch(getMessage(currentFriend._id));
        setNewMessage('');
    },[currentFriend?._id])


    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:'smooth'})
    },[message])

    const logout=()=>{
        dispatch(userLogout());
        socket.current.emit('logout',myInfo.id);
        dispatch({type:LOGOUT_SUCCESS});

    }

    const search=(e)=>{
        const getFriendClass=document.getElementsByClassName('hover-friend');
        const friendNameClass=document.getElementsByClassName('Fd_name');
        for(var i=0;i<getFriendClass.length,i<friendNameClass.length;i++){
            let text=friendNameClass[i].innerText.toLowerCase();
            if(text.indexOf(e.target.value.toLowerCase())>-1){
                getFriendClass[i].style.display='';
            }else{
                getFriendClass[i].style.display='none';
            }
        }
    }
  return (
    <div className="messenger">
        <Toaster 
            position={'top-right'} 
            reverseOrder={false} 
            toastOptions={{style:{fontSize:'18px'}}}
        />
        <div className="row">
            <div className="col-3">
                <div className="left-side">
                    <div className="top">
                        <div className="image-name">
                            <div className="image">
                                    <img src={`/image/${myInfo.image}`}></img>
                            </div>
                            <div className="name">
                                <h3>{myInfo.userName}</h3>
                            </div>
                        </div>
                        <div className="icons">
                            <div onClick={()=>setHide(!hide)} className="icon">
                                <BsThreeDots size={20}></BsThreeDots>
                            </div>
                            <div className="icon">
                                <FaEdit size={20}></FaEdit>
                            </div>
                            <div className={hide?"theme_logout":"theme_logout show"}>
                                <h3>Dark Mode</h3>
                                <div className="on">
                                    <label htmlFor="dark">ON</label>
                                    <input type="radio" name='theme' value="dark"id="dark" />
                                </div>
                                <div className="off">
                                    <label htmlFor="white">OFF</label>
                                    <input type="radio" name='theme'value="white" id="white" />
                                </div>
                                <div onClick={logout} className="logout">
                                    <IoLogOutOutline/>Logout
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="friend-search">
                        <div className="search">
                            <button><BiSearch></BiSearch></button>
                            <input onChange={search} type="text" placeholder="search" className="form-control" />
                        </div>
                    </div>
                    <div className="active-friends">
                        <ActiveFriend
                             user={activeUser}
                            setCurrentFriend={setCurrentFriend}
                        />
                    </div>
                    <div className="friends">
                        {
                            friends && friends.length>0? friends.map((fd,index)=>
                            <div key={index} onClick={()=>setCurrentFriend(fd.friendInfo)} className={currentFriend._id==fd.friendInfo._id?"hover-friend active":"hover-friend"}>
                                <Friends friend={fd}/>
                            </div>):'no friend'
                        }
                    </div>
                </div>
            </div>
            {
                currentFriend?<RightSide 
                                    typingMessage={typingMessage} 
                                    activeUser={activeUser} 
                                    imageSend={imageSend} 
                                    emojiSend={emojiSend}
                                    scrollRef={scrollRef} 
                                    message={message}
                                    sendMessage={sendMessage} 
                                    inputHandle={inputHandle} 
                                    newMessage={newMessage} 
                                    currentFriend={currentFriend}
                                    />
                                    :'Please select your friend from the friendlist'
            }
        </div>
    </div>
  )
}
