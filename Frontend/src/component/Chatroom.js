import React, {useState, useRef, useEffect} from 'react';
import { withRouter} from "react-router";

const ChatRoom = ({ match, socket }) => {
    const chatroomId = match.params.id;
    const [messages, setMessages] = useState([]);
    const messageRef = useRef();
    const [userId, setUserId] = useState("");

    const sendMessage = () => {
        if (socket) {
            console.log(socket);
            socket.emit("chatroomMessage", {
                chatroomId,
                message: messageRef.current.value,
            });

            messageRef.current.value = "";
        }
    };

    useEffect(()=>{
        const token = localStorage.getItem("CC_Token");
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUserId(payload.id);
        }
        if (socket) {
            socket.on("newMessage", (message) => {
                const newMessages = [...messages, message];
                setMessages(newMessages);
            });
        }
    }, [messages]);


    useEffect(()=>{
        if (socket) {
            socket.emit("joinRoom", {
                chatroomId,
            });
        }

        return () => {
            //컴포넌트 unmount
            if(socket){
                socket.emit("leaveRoom",{
                    chatroomId,
                });
            }
        };
    },[]);


    return (
        <div className="chatbox">
            <div className="chatlogs">
                    <div className="chat ownMessage">
                        <div className="user-photo"></div>
                        <div className="chat-message">
                              <span className="username">
                                Me
                              </span>{" "}hello
                        </div>
                    </div>
                    <div className="chat otherMessage">
                        <div className="user-photo"></div>
                        <div className="chat-message">
                              <span className="username">
                                You
                              </span>{" "}hello
                        </div>
                    </div>
                    {messages.map((message, i) => (
                        <div key={i} className={ userId === message.userId ? "chat ownMessage" : "chat otherMessage" }>
                            <div className="user-photo"></div>
                            <div className="chat-message">
                              <span className="username">
                                {message.name}:
                              </span>{" "}{message.message}
                            </div>
                        </div>
                    ))}
            </div>
            <div className="chat-form">
                    <textarea
                        placeholder="메시지 보내기"
                        ref={messageRef}
                    />
                    <button className="btn-lg btn-primary" onClick={sendMessage}>
                        Send
                    </button>
            </div>
        </div>
    );
};

export default withRouter(ChatRoom);