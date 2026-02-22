import htmlLogo from "../assets/skills/HTML5.png";
import cssLogo from "../assets/skills/CSS3.png";
import jsLogo from "../assets/skills/JavaScript.png";
import phpLogo from "../assets/skills/PHP.png";
import reactLogo from "../assets/skills/React.png";
import laravelLogo from "../assets/skills/Laravel.png";
import bootstrapLogo from "../assets/skills/Bootstrap.png";
import mysqlLogo from "../assets/skills/MySQL.png";
import mongoLogo from "../assets/skills/MongoDB.png";
import githubLogo from "../assets/skills/GitHub.png";
import gitlabLogo from "../assets/skills/GitLab.png";
import jenkinsLogo from "../assets/skills/Jenkins.png";
import sonarLogo from "../assets/skills/SonarQube.png";
import vscodeLogo from "../assets/skills/vscode.png";
import jiraLogo from "../assets/skills/Jira.png";

export const skillsData = [
  {
    category: "languages",
    skills: [
      { name: "HTML5",      icon: htmlLogo, level: 90 },
      { name: "CSS3",       icon: cssLogo, level: 85 },
      { name: "JavaScript", icon: jsLogo, level: 80 },
      { name: "PHP",        icon: phpLogo, level: 78 },
    ],
  },
  {
    category: "frameworks",
    skills: [
      { name: "React",     icon: reactLogo, level: 75 },
      { name: "Laravel",   icon: laravelLogo, level: 80 },
      { name: "Bootstrap", icon: bootstrapLogo, level: 85 },
    ],
  },
  {
    category: "databases",
    skills: [
      { name: "MySQL",   icon: mysqlLogo, level: 82 },
      { name: "MongoDB", icon: mongoLogo, level: 60 },
    ],
  },
  {
    category: "devops",
    skills: [
      { name: "Git / GitHub",  icon: githubLogo, level: 85 },
      { name: "GitLab CI/CD",  icon: gitlabLogo, level: 60 },
      { name: "Jenkins",       icon: jenkinsLogo, level: 55 },
      { name: "SonarQube",     icon: sonarLogo, level: 50 },
    ],
  },
  {
    category: "tools",
    skills: [
      { name: "VS Code", icon: vscodeLogo, level: 90 },
      { name: "Jira Software",    icon: jiraLogo, level: 65 },
    ],
  },
];
