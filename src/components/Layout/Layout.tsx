import React from "react";
import './Layout.css';
import ILayout from '../../interfaces/ILayout';
  
const Layout: React.FC<ILayout> = ({title, content, children}) => {
    return (
         <div className="layout">
          { title ? <h3>{title}</h3>: null }
          <span>{content}</span>
      <>{children}</>
      </div>
    )
  }
   
export default Layout;
