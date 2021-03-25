import React ,{useState, useEffect} from 'react';
import "../App.css";
import Axios from "axios";
import { Link } from "react-router-dom";

export default function DashBoard(props){
    const [chatRooms, setChatRooms ] = useState([]);

    const getChatRooms = () => {
        Axios({
            method: "GET",
            headers: {
                Authorization : "Bearer " + localStorage.getItem("CC_Token"),
            },
            url: "http://localhost:4000/chatroom",
        }).then((res)  => {
                setChatRooms(res.data);
        }).catch((err)=>{
            setTimeout(getChatRooms, 3000);
        });
    };

    useEffect(() => {
        getChatRooms();

    },[]);
    return (
        <div className="auth-inner">
            <h1>Dashboard</h1>
            <div className="form-group">
                <label>Chatroom Name</label>
                <input
                    type = "text"
                    className="form-control"
                    placeholder="Chatroom Name"
                />
            </div>
            <button className="btn btn-primary btn-block">방만들기</button>

            <div className="chatrooms">
                {chatRooms.map((chatroom) => (
                    <div key = {chatroom._id} className="chatroom row m-3">
                        <div className="name m-auto">{chatroom.name}</div>
                        <Link to={"/chatroom/" + chatroom._id}>
                            <button className="btn-lg btn-primary ">join</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}