import React from "react";
import './Layout.css';

interface ILayout {
    title: string;
    content?: string;
    children?: JSX.Element[];
  }
  
  const Layout: React.FC<ILayout> = ({title, content, children}) => {
      return (
          <div className="layout">
            { title? <h3>{title}</h3>: null }
            <span>{content}</span>
        <>{children}</>
        </div>
      )
    }
   
    export default Layout;
