import { FRIENDS_GET_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS,IMAGE_MESSAGE_SEND, SOCKET_MESSAGE, MESSAGE_SEND_SUCCESS_CLEAR, UPDATE_FRIEND_MESSAGE, LOGOUT_SUCCESS, NEW_USER_ADD, NEW_USER_ADD_CLEAR } from "../types/messengerType";

const messengerState={
    friends:[],
    message:[],
    messageSendSuccess:false,
    new_user_add:''
}
export  const messengerReducer=(state=messengerState,action)=>{
    const {type,payload}=action;

    if(type===FRIENDS_GET_SUCCESS){
         return {
             ...state,
             friends:payload.friends
         }
    }
    if(type===MESSAGE_GET_SUCCESS){
        return{
            ...state,
            message:payload.message
        }
    }
    if(type===MESSAGE_SEND_SUCCESS || type===IMAGE_MESSAGE_SEND){
        return{
            ...state,
            message:[...state.message,payload.message],
            messageSendSuccess:true
        }
    }
    if(type===SOCKET_MESSAGE){
        return{
            ...state,
            message:[...state.message,payload.message]
        }
    }
    if(type===MESSAGE_SEND_SUCCESS_CLEAR){
        return{
            ...state,
            messageSendSuccess:false
        }
    }
    if(type===UPDATE_FRIEND_MESSAGE){
        const index=state.friends.findIndex(f=>f.friendInfo._id===payload.messageInfo.receiverId || f.friendInfo._id===payload.messageInfo.senderId);
        state.friends[index].messageInfo=payload.messageInfo;
        return state;
    }
    if(type===LOGOUT_SUCCESS){
        return{
            ...state,
            friends:[],
            message:[],
            messageSendSuccess:false
        }
    }
    if(type===NEW_USER_ADD){
        return{
            ...state,
            new_user_add:payload.new_user_add
        }
    }
    if(type===NEW_USER_ADD_CLEAR){
        return{
            ...state,
            new_user_add:''
        }
    }
    return state;

}