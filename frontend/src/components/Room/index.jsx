import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import * as dotenv from 'dotenv'

dotenv.config()
export const Roompage = ()=>{

    const {roomID} = useParams()
    const myMeeting = async (element)=>{
        const appID = process.env.appID
        const serverSecret = process.env.serverSecret
        const kitToken= ZegoUIKitPrebuilt.generateKitTokenForTest(appID,
            serverSecret,
            roomID,
            Date.now().toString(),
            "hasan")

            const zc = ZegoUIKitPrebuilt.create(kitToken)
            zc.joinRoom({
                container: element,
                scenario:{
                    mode: ZegoUIKitPrebuilt.OneONoneCall,            
                },
                sharedLinks:[{
                    name: "copy link",
                    url: `http://localhost:3000/room/${roomID}`,
                }],
                showScreenSharingButton:true,
            })

    }

    return 
    <div>
        <div ref={ myMeeting}/>
    </div>
    

}




