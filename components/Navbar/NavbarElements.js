

import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
  

export const NavLink = styled(Link)`

font-size: 20px;
font-weight: 500;
transition: 0.5s;
text-decoration: none;
padding: 10px 20px;
&:hover {
  transform: scale(1.1);
  background-color: #ffff;
  border-radius: 10px;
 
  
}
`;
  

  