import React from "react";
import Logo from "../../reusable/img";
import profileImg from "../../../../assets/img/stockProfileImage.jpg"
import calendarIcon from "../../../../assets/img/registerDate.png"
import cakeIcon from "../../../../assets/img/birthDate.png"
import { EditProfile } from "./EditProfile";
import { useState } from "react";
import { refreshProfileImage } from "../../../../js/RefreshProfileImage";
import { formatImage } from "../../../../js/imageFormatting";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { assign } from "../../../../redux-store/slices/PopUp";
export const UserData = () =>  {
    const [editProfile,setEditProfile] = useState(false);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const popUpVal = useSelector(state => state.popUp.value);
    const dispatch = useDispatch();
    const date = new Date(user.birth_date);
    const formatter = new Intl.DateTimeFormat('es', { month: 'long' });
    const mes = formatter.format(date)
    const [profileImage,setProfileImage] = useState(JSON.parse(sessionStorage.getItem('user')).profileImageFile);
            const updateParentState = (newValue) => {
        setEditProfile(newValue);
      };
    
    return (
        
      

        <div id='userData' className='w-2/4 '>
        {/* {editProfile ? <EditProfile editProfile = {updateParentState}/> : null} */}
        <div className="w-full flex  items-center p-3 text-center  ">
            <img onError={()=>{
                refreshProfileImage(user.username).then(r => setProfileImage(formatImage(r.data.profileImage)));
            }} style={{width:'100px',height:'100px'}} className=" rounded-full" src={profileImage}></img>
            {/* <p onClick={()=> setEditProfile(!editProfile)} className="ml-auto bg-moradoFondo text-naranjaMolon font-semibold hover:bg-moradoLight hover:cursor-pointer border-2 border-moradoLight py-2 px-4 rounded-lg ">Editar perfil</p> */}
            {/* <p onClick={()=> {dispatch(assign(<EditProfile editProfile = {updateParentState}/>))}} className="ml-auto bg-moradoFondo text-naranjaMolon font-semibold hover:bg-moradoLight hover:cursor-pointer border-2 border-moradoLight py-2 px-4 rounded-lg ">Editar perfil</p> */}

        </div>
        <div  className="p-3 ">
            <p className="text-bold Kanit text-3xl text-naranjaMolon">{user.username}</p>
            <p className="text-gray-400 ">{user.name}</p>
        </div>

        <div style={{paddingLeft:'0.75rem'}} className=" flex ">
        
        <div className="flex items-center">
        <img style={{width:'1rem', marginRight:'1rem'}} src={cakeIcon}/>
        <p className=" text-gray-400 ">Fecha de nacimiento: {date.getDate()} de {mes} de {date.getFullYear()} </p>
        </div>
        {/* <div style={{marginLeft:'2%'}} className="flex items-center">
        <img style={{width:'1rem', marginRight:'1rem'}} src={calendarIcon}/>
        <p className="text-gray-400"> Se unió en {mes} de {date.getFullYear()} </p>
        </div> */}
        </div>
        </div>
    )
}