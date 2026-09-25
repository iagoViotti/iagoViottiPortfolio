import { IProject, IFolder, IBio } from '../types/Index';

const projects: IProject[] = [
  {
    name: "Rubber Duck Debugger",
    category: "Web Application",
    description: "Debug your code by explaining it to a rubber duck",
    year: 2024,
    image: "./rubberduck.png",
    externalLink: "https://rubberduckdebugging.vercel.app/",
    mainStack: "React",
    type: 'project',
    shortDescription: '',
    stacks: ['React', 'React Three Fiber'],
  },
  {
    name: "HandCamera Py App",
    category: "Digital Art Installation",
    description: "A Python application for hand gesture recognition and snapping photos",
    year: 2025,
    image: "./handsnap.png",
    externalLink: "https://github.com/iagoViotti/handCameraPy",
    mainStack: "Python",
    type: 'project',
    shortDescription: '',
    stacks: []
  },
  {
    name: "NoWaste App",
    category: "Mobile App",
    description: "Track and reduce food waste in your kitchen",
    year: 2023,
    image: "./nowasteapp.png",
    externalLink: "https://github.com/iagoViotti/noWasteApp",
    mainStack: "React",
    type: 'project',
    shortDescription: '',
    stacks: []
  },
  {
    name: "Grupo Vitor",
    category: "Landing Page",
    description: "A Landing page for a paid advertising agency",
    year: 2025,
    image: "./grupovitor.png",
    externalLink: "https://grupovitor.com.br/",
    mainStack: "Wordpress",
    type: 'project',
    shortDescription: '',
    stacks: []
  },
  {
    name: "Javascript Creative Coder",
    category: "Digital Art Installation",
    description: "A web application to showcase a collection of study purpose canvas artworks",
    year: 2024,
    image: "./creativecoder.png",
    externalLink: "https://github.com/iagoViotti/creative-coder-domestika-course",
    mainStack: "Javascript",
    type: 'project',
    shortDescription: '',
    stacks: []
  },
  {
    name: "Vekotec",
    category: "Web Application",
    description: "A web application for an environmental solutions company",
    year: 2022,
    image: "./vekotec.png",
    externalLink: "https://vekotec.com.br/",
    mainStack: "React",
    type: 'project',
    shortDescription: '',
    stacks: []
  },
  {
    name: "My Portfolio",
    category: "Web Application",
    description: "My personal portfolio to showcase my work",
    year: 2025,
    image: "./portfolio.png",
    externalLink: "",
    mainStack: "React",
    type: 'project',
    shortDescription: '',
    stacks: []
  }
];

export const portfolio: IFolder = {
  name: "portfolio",
  Files: projects,
}

export const bio: IBio = {
  name: "bio",
  type: "bio",
  bio: `
  Nascido nos anos 90, cresci vendo a internet se transformar de uma novidade tecnológica em um espaço de exploração, expressão e criação.
  As interfaces e mundos virtuais daquela época despertaram em mim uma curiosidade que continua até hoje: como transformar uma tela em uma experiência? 
  Hoje sou desenvolvedor web com foco em UI e frontend, unindo programação, design e minha formação como artista para criar experiências digitais visuais, interativas e expressivas.
  Gosto de explorar a fronteira entre código e criação, transformando ideias em experiências digitais que não apenas funcionam, mas também despertam curiosidade, comunicam e convidam à interação.
  `,
  status: 'Available',
  techStack: ["Javascript", "Typescript"],
  professionalExperience: [],
  educationalExperience: []
}
