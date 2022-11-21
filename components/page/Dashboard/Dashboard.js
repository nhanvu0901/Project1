
import React, { useState } from 'react';
import Title from './UploadImage/comps/Title';
import UploadForm from './UploadImage/comps/UploadForm';
import ImageGrid from './UploadImage/comps/ImageGrid'
import Modal from './UploadImage/comps/Modal';
import './dashboard.css'
import UploadModal from './UploadImage/comps/UploadModal';
import NoteModal from './UploadImage/comps/NoteModal';
// import ScrollButtonTop from './scrollbutton/ScrollButtonTop';
// import ScrollButtonBottom from './scrollbutton/ScrollButtonBottom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../firebase';
const ImageLoader = ({user}) => {
  const [selectedImg,setSelectedImg] = useState(null);
  const [openModal,setOpenModal] =useState(null);
  const [openNoteModal,setOpenNoteModal] =useState(null);
  const [selectedText,setSelectedText] = useState({imgNote:'',imgID:''});
  const [type,setType] = useState('');

  const currentUser = useAuth();


  return (
    <div className="App main"
      style={{
        minHeight: '100vh',
        height:'100%',
       
        width:'100%',
        paddingTop:'4rem'
      }}
    >
      {/* <ToastContainer position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/> */}
      {/* <ScrollButtonBottom container={".App"}/>
      <ScrollButtonTop /> */}
       <h1 className='title'>Album picture</h1>
      <UploadForm setOpenModal={setOpenModal} />
      <ImageGrid setSelectedImg={setSelectedImg} setOpenNoteModal={setOpenNoteModal} setSelectedText={setSelectedText} setType={setType} album={'images'} />
      { selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} setType={type} type={type}/>
      )}
      {openModal && (<UploadModal setOpenModal={setOpenModal} album={'images'}/>)}
      {openNoteModal && (<NoteModal    setOpenNoteModal={setOpenNoteModal} selectedText={selectedText} album={'images'}/>)}
    </div>
  );
};
  
export default ImageLoader;