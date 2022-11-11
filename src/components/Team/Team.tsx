import React from 'react';
import githubIcon from '../../assets/githubIcon.svg';
import './Team.css';
import card3 from '../../assets/daryadak.jpg';
import card2 from '../../assets/Uiguuna.jpg';
import card1 from '../../assets/Oksana.png';

const Team = () => {
  return (
    <div>
      <h2 className="h2">Наша команда</h2>
      <div className="team-wrapper">
        <div className="team-member">
          <img src={card1} alt={'team-member-image'} className="team-member-image" />
          <p className="team-member-name">Оксана</p>
          <p className="team-member-role">Team Lead</p>
          <p className="team-member-decription">Добавить инфо</p>
          <a
            target="blank"
            rel="noreferer"
            href="https://github.com/OksanaFedotova"
            className="github-link"
          >
            <img src={githubIcon} alt={'github-image'} />
          </a>
        </div>
        <div className="team-member">
          <img src={card2} alt={'team-member-image'} className="team-member-image" />
          <p className="team-member-name">Уйгууна</p>
          <p className="team-member-role">Developer</p>
          <p className="team-member-decription">Добавить инфо</p>
          <a
            target="blank"
            rel="noreferer"
            href="https://github.com/uiguunamikhailova"
            className="github-link"
          >
            <img src={githubIcon} alt={'github-image'} />
          </a>
        </div>
        <div className="team-member">
          <img src={card3} alt={'team-member-image'} className="team-member-image" />
          <p className="team-member-name">Дарья</p>
          <p className="team-member-role">Developer</p>
          <p className="team-member-decription">Добавить инфо</p>
          <a
            target="blank"
            rel="noreferer"
            href="https://github.com/daryadak"
            className="github-link"
          >
            <img src={githubIcon} alt={'github-image'} />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Team;
