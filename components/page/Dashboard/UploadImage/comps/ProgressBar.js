import React, { useEffect } from 'react';
import useStorage from '../../../../../hooks/useStorage';
import { motion } from 'framer-motion';

const ProgressBar = ({ file, setFile ,setText,text ,send,setSend,setOpenModal,album}) => {
  const { progress, imageUrl } = useStorage(file,text,album);//ham add anh dong thoi cha ve gia tri

  useEffect(() => {
    if (imageUrl) {
      setFile(null);
      setText(null);
      setSend(false);
      setOpenModal(null);
    }
  }, [imageUrl, setFile]);

  return (
    <motion.div className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    >{progress}%</motion.div>
  );
} 

export default ProgressBar;
