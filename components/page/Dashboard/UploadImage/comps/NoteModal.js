import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoClose } from "react-icons/io5";
import { db } from '../../../../../firebase';
import { doc,updateDoc,serverTimestamp } from 'firebase/firestore';







const NoteModal = ({setOpenNoteModal,selectedText,album}) => {
  const [inputDate, setInputDate] = useState(new Date().getTime());

  
  

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setOpenNoteModal(null);
    }
  }
  const onUpdate = async(e)=>{
    e.preventDefault();
    
   const textValue = document.querySelector('.textAreaNote').value;
   const docRef =doc(db,album,selectedText.imgID);
 
   updateDoc(docRef,{
     note:textValue,
     notification:{
       id:selectedText.imgID,
       createdAt: serverTimestamp(),
     
   }
   })
   .then(()=>{
    //  toast("🦄 Cập nhật thành công !",{ 
    //  });
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
        <textarea className='textAreaNote'>
          {selectedText.imgNote}
        </textarea>
        


        <input type="submit" className='submitButton' value="Cập nhật ghi chú" onClick={onUpdate}/>
        <IoClose className='closeNoteModal' size={40} onClick={()=>setOpenNoteModal(null)}/>
     </motion.div>
    </motion.div>
  )
}

export default NoteModal