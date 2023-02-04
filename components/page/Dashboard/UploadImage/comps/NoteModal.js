import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoClose } from "react-icons/io5";
import { db } from '../../../../../firebase';
import { doc,updateDoc,serverTimestamp } from 'firebase/firestore';
import {getAuth} from "firebase/auth";







const NoteModal = ({setOpenNoteModal,selectedText,needUpdateModal}) => {
  const [inputDate, setInputDate] = useState(new Date().getTime());
  const auth = getAuth();
  const userId = auth.currentUser.uid;

  
  

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setOpenNoteModal(null);
    }
  }
  const onUpdate = async(e)=>{
    e.preventDefault();
    console.log(selectedText.imgID)
   const textValue = document.querySelector('.textAreaNote').value;
   const docRef =doc(db,"user",userId,"image",selectedText.imgID)
   // const docRef =doc(db,album,selectedText.imgID);
 
   updateDoc(docRef,{
     note:textValue,
     notification:{
       id:selectedText.imgID,
       createdAt: serverTimestamp(),

   }
   })
   .then(()=>{
   alert("Update successfully")
   })
  }
  return (
    <motion.div className="backdrop" onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
     <motion.div className='noteModal'
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
     >
        <h2>Ghi chú của ảnh</h2>
         {needUpdateModal === true ?
             <textarea className='textAreaNote' >
              {selectedText.imgNote}
            </textarea>
             :
         <textarea className='textAreaNote' readOnly={true}>
              {selectedText.imgNote}
            </textarea>



         }




         {needUpdateModal === true ? <input type="submit" className='submitButton' value="Cập nhật ghi chú" onClick={onUpdate}/> :''}
        <IoClose className='closeNoteModal' size={40} onClick={()=>setOpenNoteModal(null)}/>
     </motion.div>
    </motion.div>
  )
}

export default NoteModal