import React from 'react';
import { Box, Link, Icon } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Box>
        <a target="_blank" rel="noopener noreferrer" href="https://rs.school/react/">
          <img src={'https://rs.school/images/rs_school_js.svg'} width="70px" alt="rs-logo" />
        </a>
      </Box>
      <Box className="github-links-box">
        <Link href="https://github.com/oksanafedotova" color="inherit" className="github-link">
          <Icon>
            <GitHubIcon />
          </Icon>
          OksanaFedotova
        </Link>
        <Link href="https://github.com/UiguunaMikhailova" color="inherit" className="github-link">
          <Icon>
            <GitHubIcon />
          </Icon>
          UiguunaMikhailova
        </Link>
        <Link href="https://github.com/daryadak" color="inherit" className="github-link">
          <Icon>
            <GitHubIcon />
          </Icon>
          DaryaDak
        </Link>
      </Box>
      <Box>2022</Box>
    </footer>
  );
};

export default Footer;
