import React from 'react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player'

const Modal = ({ setSelectedImg, selectedImg,setType,type }) => {

  const handleClick = (e) => {
    if (e.currentTarget.classList.contains('closeable')) {
      setSelectedImg(null);
    }
    console.log(e.target.classList.contains('closeable'))
  }

  return (
    <motion.div className="backdrop closeable" onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
     
    {type === 'video/mp4' ? <ReactPlayer url={selectedImg} playing={true} loop={true} controls={true} className='video-player'/> : <motion.img src={selectedImg} alt="enlarged pic" 
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      />}  
    </motion.div>
  )
}

export default Modal;