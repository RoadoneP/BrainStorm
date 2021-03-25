import React, {useEffect} from 'react';

export default function MainPage(props){

    useEffect(()=>{
        const token = localStorage.getItem("CC_Token"); //토큰 가져오고
        console.log(token);
        if(token){
            props.history.push("/dashboard"); //없으면 로그인
        }
        else{
            props.history.push("/login"); // 있으면 대쉬보드로 가자
        }
    },[0]);

    return(
        <div></div>
    );
};
