import React from "react";
import { Button } from "@mui/material";

const Buttons= ({text}: {text: string;}) => {
    return (
    <Button variant="outlined" color="inherit" sx={{mr: 1}}>{text}</Button>
    )
}

export default Buttons;
