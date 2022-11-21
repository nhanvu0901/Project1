import React from 'react';
import { getAuth } from "firebase/auth";
import moment from 'moment';
import useFirestore from '../../../../../hooks/useFirestore';
import { motion } from 'framer-motion';
import { IoClose } from "react-icons/io5";
import { AiOutlineAlignLeft } from "react-icons/ai"; 
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";
import {
   deleteDoc, doc,updateDoc, deleteField , increment// doc
} from 'firebase/firestore'
import { ref, deleteObject } from "firebase/storage";
import { db ,storage } from '../../../../../firebase';
import { useState ,useEffect} from 'react';
import ReactPlayer from 'react-player'
import { useAuth } from '../../../../../firebase';
const ImageGrid = ({user,setSelectedImg,setOpenNoteModal,setSelectedText,setType,album}) => {
  const { docs } = useFirestore(album);
  const [imageID,setImage] = useState(null);
  const auth = getAuth();
  const userId=auth.currentUser.uid;


  // const messagesEndRef = useRef(null)

  // const scrollToBottom = () => {
  //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  // }



  const iconMotion = {
    rest: {
      y: "-100vh",
     opacity:0,
     zindex:99999,
     transition: {
      
      type: "tween",
      ease: "easeOut"
    }
    },
    hover: {
      y: 0,
      opacity:99999,
      zindex:99999,
      transition: {
        duration: 0.01,
        type: "tween",
        ease: "easeOut"
      }
    }
  }
  const iconMotionNote = {
    
    rest: {
     x:'100vw',
     opacity:0,
     zindex:99999,
     transition: {
      
      type: "tween",
      ease: "easeOut"
    }
    },
    hover: {
      x:0,
      opacity:99999,
      zindex:99999,
      transition: {
        duration: 0.01,
        type: "tween",
        ease: "easeOut"
      }
    }
  }
  const imageHover ={
    rest:{
     
      opacity: 0.8
    },
    hover:{
      
      opacity: 1
    }
  }
 

  const DeleteImage = (e)=>{
    e.preventDefault();
   
    const imgID = e.currentTarget.getAttribute("data-id");
    
    const imgName = e.currentTarget.getAttribute("data-name");
    const desertRef = ref(storage,userId+imgID);
    console.log(imgID)
    if(imgID){
      const docRef = doc(db,"user",userId,"image",imgID);
      const docUserRef =doc(db,"user",userId);
      
      updateDoc(docUserRef,{
        numOfPic: increment(-1)
      }).then(()=>{
        console.log("Ok mf")
       })
       .catch(error=>{
        console.log(error)
       })


      deleteObject(desertRef).then(() => {
       console.log("OK ")
      }).catch((error) => {
        console.log(error)
      });;


      deleteDoc(docRef)
      .then(()=>{
        console.log("Delete successfull");
        setImage(null);
      })
    }
    
  }
  const deleteNotice = async (imgID) =>{
    const docRef = doc(db, album,imgID);
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
  const downloadImage =(e)=>{
    e.preventDefault();
    let image_src =  document.getElementById('imageId').src
    window.location.href = image_src
  }
  
  return (
    <div className="img-grid" >
      
      {docs && docs.map(doc =>  {
       
        return doc.user === userId ? 
        <motion.div className="img-wrap" key ={doc.id}
        layout
        variants={imageHover}
        initial="rest" whileHover="hover" animate="rest"
      >
           
          
       {doc.type === "video/mp4" ? 
        <ReactPlayer url={doc.url} loading='lazy'  width='100%' height='100%'  className='react-player' onClick={()=>{setSelectedImg(doc.url);setType(doc.type)}}/>
        :<motion.img loading='lazy'   id ='imageId' src={doc.url} alt="uploaded pic" setType={doc.type} onClick={()=>{setSelectedImg(doc.url);setType(doc.type)}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />}   

        <motion.div variants={iconMotion}  className='imageDelete'>
          <IoClose   
          data-id={doc.id}
          data-name={doc.name}
          
          size={40}
          onClick={DeleteImage}
          />
         </motion.div>
         <svg width="1em" height="1em">
          <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop stopColor="#1008ff" offset="0%" />
            <stop stopColor="rgb(0, 238, 255)" offset="100%" />
          </linearGradient>
        </svg>


        {typeof doc.notification != "undefined" &&  doc.notification.createdAt !=null &&
        <div className='notice'>
          <AiOutlineExclamationCircle  size={40} />
          <div>Change {moment((doc.notification.createdAt).toDate()).fromNow()} by {doc.notification.email === "neopet20001@gmail.com" ? "Pa Pa":"Ma Ma"}</div>
          
          </div>
          } 



         <motion.div variants={iconMotionNote} className='noteOpen' >

         <AiOutlineDownload   
            onClick={downloadImage}
            data-note={doc.note}
            data-id={doc.idImage}
            style={{ fill: "url(#blue-gradient)" }}
            size={40}/>

           <AiOutlineAlignLeft 
           onClick={openModalNote}
           data-note={doc.note}
           data-id={doc.idImage}
           style={{ fill: "url(#blue-gradient)" }}
           size={40}/>

          
            </motion.div>
      </motion.div> 
      
      
      : null;

      
        
        
})}
       {/* <div ref={messagesEndRef} /> */}
    </div>
  )
}

export default ImageGrid;