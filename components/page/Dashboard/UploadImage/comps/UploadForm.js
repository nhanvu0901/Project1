import React from 'react';

import { BiAddToQueue } from "react-icons/bi";
const UploadForm = ({setOpenModal}) => {

  
  return (
    <form>
      <BiAddToQueue onClick={() =>setOpenModal(true)} size={40} className="addItem"/>
    </form>
    
  );
}

export default UploadForm;