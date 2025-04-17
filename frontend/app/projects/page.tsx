// Example usage in your page file
import ZigZag from '../components/ui/zigzag-component/zigzag';

const projectsData = [
  {
    id: 1,
    title: "Allenty Website",
    description: "A responsive website for Allenty, showcasing their services and portfolio with a modern design.",
    image: "/images/allenty.png",
    technologies: ["React", "HTML", "CSS / SCSS", "Docker"],
    demoLink: "https://www.allenty.com/",
  },
  {
    id: 2,
    title: "Marty Massage Website",
    description: "A sleek and modern website for a massage therapy business, featuring a booking system and service descriptions.",
    image: "/images/marty.png",
    technologies: ["Wordpress", "HTML", "CSS", "JaneAPP", "PHP"],
    demoLink: "https://martysmassage.com/",
  },
  {
    id: 3,
    title: "Ordis TTRPG manager",
    description: "A web application for managing tabletop RPG campaigns, characters, and sessions.",
    image: "/images/ordis.png",
    technologies: ["React", "Django", "Docker", "AWS", "Github Actions"],
    demoLink: "https://martysmassage.com/",
  },
  {
    id: 4,
    title: "Ordis TTRPG manager",
    description: "A web application for managing tabletop RPG campaigns, characters, and sessions.",
    image: "/images/ordis.png",
    technologies: ["React", "Django", "Docker", "AWS", "Github Actions"],
    demoLink: "https://martysmassage.com/",
  },
  // Add more projects as needed
];

export default function Projects() {
  return (
    <main>
      <h1>My Projects</h1>
      <ZigZag projects={projectsData} />
    </main>
  );
}