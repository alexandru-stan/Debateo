
import { CommunityInfo } from './body/communityInfo';
import React, { useState,useEffect } from 'react';
import { CommunityInfoRequest } from '../../../js/CommunityInfoRequest';
import { formatImage } from '../../../js/imageFormatting';
import { PostsRequestByCommunity } from '../../../js/PostRequestByCommunity';
import { Mensajes } from '../reusable/mensajes/mensajes';
import { useRef } from 'react';
import SpinnerLoader from '../reusable/SpinnerLoader';
import { useNavigate } from 'react-router-dom';
import { CrearPublicacion } from './body/crearPublicacion';
import admin from '../../../assets/img/admin.png';
import crown from '../../../assets/img/crown.png';
import axios from 'axios';
import {SERV_DIR,SERV_PORT} from "../../../utilities";
import { update } from '../../../redux-store/slices/RecentCommunityTrigger';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { assign } from '../../../redux-store/slices/PopUp';
export const Body = (props) => {
const [state,setState] = useState(localStorage.getItem('cid'));
const [info,setInfo] = useState({});
const [postsArr,setPostsArr] = useState([]);
const [page,setPage] = useState(0);
const [isLast,setIslast] = useState(false);
const[subscription,setSubscription] = useState(null);
const [SubButton,setSubButton] = useState(null);
const [creadorState, setCS] = useState(null);

const [loading, setLoading] = useState(true);
const rctTrigger = useSelector(state => state.recentCommunityTrigger.value);
const myRef = useRef();
let comunidadesRecientes = JSON.parse(localStorage.getItem("comunidadesRecientes"));
const navigate = useNavigate();
const messagesRender = useSelector(state => state.messagesRender.value);
const popUpVal = useSelector(state => state.popUp.value);
const dispatch = useDispatch();
let creador;
let loggedUser = JSON.parse(sessionStorage.getItem('user')).username;

let request =  {
  page:0,
  state:state,
  myRef:myRef,
  setIslast:setIslast,
  setPostsArr:setPostsArr,


}
const handleIntersection = (entries) => {
  if (entries[0].isIntersecting && !isLast) {
    
    observer.disconnect();
    // setPage((prevPage) => prevPage + 1);
    request.page = request.page+1;
    setLoading(true);
     PostsRequestByCommunity(request,creador)
  
      .then((response) => {
        setPostsArr((prevPosts) => prevPosts.concat(response));
       setLoading(false);
      })  
  
      
  } 
  if(isLast) setIslast(false);


};
const observer = new IntersectionObserver(handleIntersection);


// useEffect(()=>{
// if(info.communityId!=undefined){


//   let index = comunidadesRecientes.findIndex(obj => obj == info.communityId) 

//  index == -1 ?
//  (function() {comunidadesRecientes.push(info.communityId);
//   localStorage.setItem("comunidadesRecientes", JSON.stringify(comunidadesRecientes))
//   dispatch(update(!rctTrigger))})
//   :

//   comunidadesRecientes.splice(index,1);
//   comunidadesRecientes.unshift(info.communityId);
//   localStorage.setItem("comunidadesRecientes",JSON.stringify(comunidadesRecientes))
//   dispatch(update(!rctTrigger))

// }
// },[info])



function changeSub(subscription){
let userData = JSON.parse(sessionStorage.getItem("user"))
  if(subscription==null) {
    
    axios.post("http://"+SERV_DIR+":"+SERV_PORT+"/subscriptions/sub/"+loggedUser+"/"+state);
   userData.subsCount++;
  sessionStorage.setItem('user',JSON.stringify(userData))
    setSubscription("MEMBER");
  }
  else {
    axios.delete("http://"+SERV_DIR+":"+SERV_PORT+"/subscriptions/unsub/"+loggedUser+"/"+state);
    userData.subsCount--;
    sessionStorage.setItem('user',JSON.stringify(userData));
    setSubscription(null);
  }

}


useEffect(() => {
  setState(localStorage.getItem('cid'));
  // setPage(0);
  setPostsArr([]);
  
   },[localStorage.getItem('cid')])
  
   useEffect(()=> {
 
    CommunityInfoRequest(state).then(response => {
    let data = response.data;
        
        creador = data.communityCreator;
        setCS(data.communityCreator);
        setSubscription(data.subscription);
      
      if(creadorState==loggedUser) setSubButton(<button className=" hover:bg-moradoLight rounded-md p-2 text-gray-700 border-2 border-moradoLight  text-white bg-moradoFondo placeholder-gray-400  placeholder-gray-400 focus:outline-none    focus:border-naranjaMolon" id='administrar'>Administrar</button>)
  else if ( data.subscription!=null) setSubButton(<button className=" hover:bg-moradoLight rounded-md p-2 text-gray-700 border-2 border-moradoLight  text-white bg-moradoFondo placeholder-gray-400  placeholder-gray-400 focus:outline-none    focus:border-naranjaMolon" onClick={()=> {changeSub(data.subscription)}} id='Unsub'>Desuscribirse</button>)
  else setSubButton(<button className=" hover:bg-moradoLight rounded-md p-2 text-gray-700 border-2 border-moradoLight  text-white bg-moradoFondo placeholder-gray-400  placeholder-gray-400 focus:outline-none    focus:border-naranjaMolon" onClick={()=> {changeSub(data.subscription)}} id='Sub'>Suscribirse</button>)
        setInfo({
            communityName: data.communityName,
            communityDescription: data.communityDescription,
            communityImage: formatImage(data.communityImage),
            communityBackgroundImage: formatImage(data.communityBackgroundImage),
            communityCreator: data.communityCreator,
            communityMembers: data.communityMembers,
            sensitiveContent: data.sensitiveContent,
            communityId:data.communityId,
            categoria: data.categoria,
            admin: data.communityCreator==loggedUser ? <img src={crown} /> : data.subscription=="MOD"?<img  src={admin} />:null
        })

        
       
        PostsRequestByCommunity(request,creador,response.data.subscription).then(response =>{
         
          setPostsArr(response);
          setLoading(false);
         
         
        
         
        })
        
        

    })
   },[state])


useEffect(()=> {
console.log("ola");
  if(creadorState==loggedUser) setSubButton(<button className=" hover:bg-moradoLight rounded-md p-2 text-gray-700 border-2 border-moradoLight  text-white bg-moradoFondo placeholder-gray-400  placeholder-gray-400 focus:outline-none    focus:border-naranjaMolon" onClick={()=> navigate("/admin/"+state)} id='administrar'>Administrar</button>)
  else if ( subscription!=null) setSubButton(<button className="hover:bg-moradoLight rounded-md p-2  text-gray-700 border-2 border-moradoLight  text-white bg-moradoFondo placeholder-gray-400  placeholder-gray-400 focus:outline-none   focus:border-naranjaMolon" onClick={()=> {changeSub(subscription)}} id='Unsub'>Desuscribirse</button>)
  else setSubButton(<button className="hover:bg-moradoLight rounded-md p-2 text-gray-700 border-2 border-moradoLight  text-white bg-moradoFondo placeholder-gray-400  placeholder-gray-400 focus:outline-none    focus:border-naranjaMolon" onClick={()=> {changeSub(subscription)}} id='Sub'>Suscribirse</button>)

},[subscription,creadorState,state,])


 



useEffect(()=>{


if(myRef.current!=null && postsArr.length>0){
    observer.observe(myRef.current);
  
}


},[postsArr])







    return (
    <div className='mt-5 flex flex-col justify-center items-center community-body'>
        <CommunityInfo subButton ={SubButton} state={state} info={info}/>
        {postsArr}
        {loading ? <SpinnerLoader clase='mt-5' id='spinnerCommunityPosts'/> : null}
        {messagesRender ? <Mensajes/>:null}
    </div>
    )
}