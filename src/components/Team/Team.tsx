import React from 'react';
import githubIcon from '../../assets/githubIcon.svg';
import './Team.css';
import card3 from '../../assets/daryadak.jpg';
import card2 from '../../assets/Uiguuna.jpg';
import card1 from '../../assets/Oksana.png';
import { FormattedMessage } from 'react-intl';

const Team = () => {
  return (
    <div>
      <h2 className="h2">
        <FormattedMessage id="our_team" />
      </h2>
      <div className="team-wrapper">
        <div className="team-member">
          <img src={card1} alt="team-member-image" className="team-member-image" />
          <p className="team-member-name">
            <FormattedMessage id="team_lead" />
          </p>
          <p className="team-member-role">
            <FormattedMessage id="team_role_lead" />
          </p>
          <p className="team-member-decription">
            <FormattedMessage id="lead_role_description" />
          </p>
          <a
            target="blank"
            rel="noreferer"
            href="https://github.com/OksanaFedotova"
            className="github-link"
          >
            <img src={githubIcon} alt="github-image" />
          </a>
        </div>
        <div className="team-member">
          <img src={card2} alt="team-member-image" className="team-member-image" />
          <p className="team-member-name">
            <FormattedMessage id="developer_one" />
          </p>
          <p className="team-member-role">
            <FormattedMessage id="team_role" />
          </p>
          <p className="team-member-decription">
            <FormattedMessage id="role_one_description" />
          </p>
          <a
            target="blank"
            rel="noreferer"
            href="https://github.com/uiguunamikhailova"
            className="github-link"
          >
            <img src={githubIcon} alt="github-image" />
          </a>
        </div>
        <div className="team-member">
          <img src={card3} alt="team-member-image" className="team-member-image" />
          <p className="team-member-name">
            <FormattedMessage id="developer_two" />
          </p>
          <p className="team-member-role">
            <FormattedMessage id="team_role" />
          </p>
          <p className="team-member-decription">
            <FormattedMessage id="role_two_description" />
          </p>
          <a
            target="blank"
            rel="noreferer"
            href="https://github.com/daryadak"
            className="github-link"
          >
            <img src={githubIcon} alt="github-image" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Team;
