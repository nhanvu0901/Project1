

import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import { motion } from 'framer-motion';
import { IoClose } from "react-icons/io5";
const UploadModal = ({setOpenModal,album}) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [text,setText] = useState(null);
  const [send,setSend] = useState(false);
  const types = ['image/png', 'image/jpeg','image/gif','video/mp4'];



  const handleChange = (e) => {
    setError(null);
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
      
    } else {
      
      setFile(null);
      setError('Please select an image file (png,jpg,gif,mp4)');
    }
  };
    const handleClick = (e) => {
        if (e.target.classList.contains('backdrop')) {
            setOpenModal(null);
        }
      }
   const handleSubmit =(e)=>{
     e.preventDefault();
     if(file && text){
      setSend(true);
      setError('');
     }
     else{
        setError('Không được bỏ trống dòng và hãy chọn ảnh');
        setSend(false)
      
     }
   } 
  return (
    <motion.div className="backdrop" onClick={handleClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.form className='modalForm' onSubmit={handleSubmit} 
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}>
          
  
        <h1>Điền ghi chú vào ảnh:</h1>
        <textarea rows="12" value={text} onChange={(e) => setText(e.target.value)} />
        <h1 >Chọn ảnh:</h1>
        <label>
          <input className='plus' type="file" onChange={handleChange}/>
          <span>+</span>
      </label> 
      { file && <div className='imageName'>{ file.name }</div> }
     <input type="submit" className='submitButton' value="Thêm ảnh"/>
      { send && <ProgressBar album={album} file={file} setFile={setFile} setText={setText} text={text}  send={send} setSend={setSend} setOpenModal={setOpenModal}/> }
       { error && <div className="error">{ error }</div>}
      
      <IoClose className='closeModal' size={40} onClick={()=>setOpenModal(null)}/>
    </motion.form>
  </motion.div>

  )
}

export default UploadModal