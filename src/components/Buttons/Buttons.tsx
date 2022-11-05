import React from "react";
import { Button } from "@mui/material";

interface IButtons {
    text: string;
}


const Buttons: React.FC<IButtons> = ({text}) => {
    return (
    <Button variant="outlined" color="inherit" sx={{mr: 1}}>{text}</Button>
    )
}

export default Buttons;
