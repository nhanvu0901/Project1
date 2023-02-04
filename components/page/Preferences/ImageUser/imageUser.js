import React, {useState} from 'react';
import './imageuser.css'
import useFirestore from '../../../../hooks/useFirestore';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player'
import Modal from "../../Dashboard/UploadImage/comps/Modal";
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import {deleteField, doc, updateDoc} from "firebase/firestore";
import {db} from "../../../../firebase";
import NoteModal from "../../Dashboard/UploadImage/comps/NoteModal";
const ImageUser  = () => {

 const [selectedImg,setSelectedImg] = useState(null);
  const [selectedText,setSelectedText] = useState({imgNote:'',imgID:''});
  const [type,setType] = useState('');
    const [openNoteModal,setOpenNoteModal] =useState(null);

      const [needUpdateModal,setNeedUpdateModal] = useState(false);

    const location = useLocation()
    const uid = location.state.userUid
    const { docs } = useFirestore(uid);


    const deleteNotice = async (imgID) =>{
    const docRef = doc(db, "images",imgID);
    await updateDoc(docRef, {
      notification: deleteField()
  });
  }
   const openModalNote = (e)=>{
    e.preventDefault();
    const imgNote = e.currentTarget.getAttribute("data-note");//currentTarget khac gi -->tim hieu di
    const imgID = e.currentTarget.getAttribute("data-id");

    if(imgNote){

      setOpenNoteModal(true);
      setSelectedText({imgNote,imgID});
      deleteNotice(imgID);


    }
  }
    return(
      <div className="main-search" style={{
        minHeight: '100vh',
        height:'100%',
       
        width:'100%',
        paddingTop:'4rem'
      }}>
{/*<div class="blob"></div>*/}
          { selectedImg && (
        <Modal  selectedImg={selectedImg} setSelectedImg={setSelectedImg} setType={type} type={type}/>
      )}
           {openNoteModal && (<NoteModal needUpdateModal={needUpdateModal}    setOpenNoteModal={setOpenNoteModal} selectedText={selectedText} album={'images'}/>)}
        <div className='info-container'>
          <h1>{location.state.userName}</h1> 
          <div className='user-info-container'>
              <img className="avatar"  src={location.state.userAva} width="150"/>
              <div className='user-info'>
                 <p>{location.state.userJob}</p>
                 <p>{location.state.userPresent}</p>
                 <p>{location.state.userEmailL}</p>
              </div>
          </div> 
          
        </div>
        <div className="img-grid" >
        {docs && docs.map(doc =>  {

            let time = {
            seconds: doc.createdAt.seconds,
            nanoseconds: doc.createdAt.nanoseconds,
            }

            const fireBaseTime = new Date(
            time.seconds * 1000 + time.nanoseconds / 1000000,
            );
            const date = fireBaseTime.toDateString();
            const atTime = fireBaseTime.toLocaleTimeString();
            console.log(date+" "+atTime)
            return doc.user === uid ? 
            <div className="img-wrap" key ={doc.id}
            layout
           
            initial="rest" whileHover="hover" animsate="rest"
            >
              <div className='create-date'>
                <span>{(date)} at {atTime}</span>
              </div>
              {doc.type === "video/mp4" ? 
            <ReactPlayer url={doc.url} loading='lazy'  width='100%' height='100%'  className='react-player' onClick={()=>{setSelectedImg(doc.url);setType(doc.type)}}/>
            :<img loading='lazy'   id ='imageId' src={doc.url} alt="uploaded pic" setType={doc.type} onClick={()=>{setSelectedImg(doc.url);setType(doc.type)}} />}
<FontAwesomeIcon icon={faNoteSticky} onClick={openModalNote}
           data-note={doc.note}
           data-id={doc.idImage}
           style={{ color: "#00fff8",

               zIndex:"9",

               height:"40px",
               width:"40px",
               position:"absolute",
               right:"10px",
               bottom:"0px"
           }}/>



        

            </div>


            : null;


//TODO create a hover that show the note

            })}
        </div>






        
      </div>
    );
}
export default ImageUser