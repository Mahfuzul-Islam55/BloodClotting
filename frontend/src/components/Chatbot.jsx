import React, { useState } from "react";
import { useAlert } from "react-alert";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { Modal,ModalHeader, ModalBody,Row } from 'reactstrap';
import bot from './assets/bot.svg'
import user from './assets/user.svg'
import send from './assets/send.svg'
import axios from "axios";
import './style.css'

export default function Chatbot({ handleShow }) {
  const alert = useAlert();
  const { loading, successMessage, error, authenticate, myInfo } = useSelector(
    (state) => state.auth
  );


  const [modal, setmodal] = useState(true)
 
  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();

   
  axios.post("http://localhost:5001/", { prompt })
                                      .then(res => {
                                          setResponse(res.data.bot)
                                        console.log(res.data.bot,' json res full')
                                        // console.log(res.data.text,'res text')
                                        // console.log(res.data.choices[0].text,' choices[0].text')
                                      })
                                      .catch(err => console.warn(err,' error '))

                                    
    }

  return(
    <><div>
    <Modal 
        size='lg'
        isOpen={modal}
        toggle={() => setmodal(!modal)}
            >
{/* 
        <ModalHeader toggle={() => setmodal(!modal)}>
            popup
          </ModalHeader> */}

          <ModalBody>
     
          <div>
 
                <form onSubmit={handleSubmit} >       

                <div className='user'>
                <img src={user} /><input className='textarea'
                placeholder="  Ask me anything..."
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                />
                <button className='sbtn' type="submit"> <img src={send} /></button>
                </div>
                <div className='bot'><img src={bot} />{response}</div>

                </form>
                </div>

          </ModalBody>
        </Modal>
   
    </div>
    
    </>
  )

}