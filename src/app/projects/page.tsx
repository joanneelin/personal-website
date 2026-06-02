import type { Metadata } from 'next';

type SoftwareProject = {
  name: string;
  description: string;
  url: string | null;
  thumbnail: string | null;
};

const softwareProjects: SoftwareProject[] = [
  {
    name: 'Subly',
    description: 'Subletting website to simplify the complicated subletting process on college campuses.',
    url: 'https://subly-web-ez4dvmc6o-joanneelins-projects.vercel.app/',
    thumbnail: null,
  },
  {
    name: 'ReHome (all-in-one moving app)',
    description: 'Coming soon.',
    url: null,
    thumbnail: null,
  }/*,
  {
    name: 'Board of Advisors',
    description: 'Coming soon. (Austin Marchese)',
    url: null,
    thumbnail: null,
  },
  {
    name: 'Niched Command Center',
    description: 'Coming soon. (Austin Marchese)',
    url: null,
    thumbnail: null,
  },
  {
    name: 'AI-Optimized Public Profile',
    description: 'Coming soon. (Austin Marchese)',
    url: null,
    thumbnail: null,
  },
  {
    name: 'Internal Operating System',
    description: 'Coming soon. (Austin Marchese)',
    url: null,
    thumbnail: null,
  },*/
];

export const metadata: Metadata = {
  title: 'Joanne Lin',
  description: 'Projects',
};

const games = [
  {
    name: 'Cow Game',
    description: 'Based off of the Cow Evolution merge game.',
    url: '/games/Cow Game/index.html',
    thumbnail: '/games/Cow Game/thumbnail.png',
  },
  {
    name: 'Connect Five',
    description: 'Get five in a row to win.',
    url: '/games/Connect Five/index.html',
    thumbnail: '/games/Connect Five/thumbnail.png',
  },
  {
    name: 'Number Game',
    description: 'Compete and guess the computer\'s 4-digit secret number.',
    url: '/games/Number Game/index.html',
    thumbnail: '/games/Number Game/thumbnail.png',
  },
  {
    name: 'Zombie Game',
    description: 'Survive the 10 waves of zombies.',
    url: '/games/Zombie Game/index.html',
    thumbnail: '/games/Zombie Game/thumbnail.png',
  },
  {
    name: 'KidChat',
    description: 'A chat app.',
    url: '/games/KidChat/index.html',
    thumbnail: '/games/KidChat/thumbnail.png',
  },
];

export default function ProjectsPage() {
  return (
    <div className="content" style={{ padding: '3rem 2rem 5rem' }}>
      <h1>Projects</h1>

      <div className="games-grid" style={{ marginBottom: '2.5rem' }}>
        {softwareProjects.map((project) =>
          project.url ? (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="game-card"
            >
              {project.thumbnail
                ? <img src={project.thumbnail} alt={project.name} className="game-thumb" />
                : <div className="thumb-placeholder" />}
              <div className="game-info">
                <span className="game-name">{project.name}</span>
                <span className="game-desc">{project.description}</span>
              </div>
            </a>
          ) : (
            <div key={project.name} className="game-card game-card--disabled">
              {project.thumbnail
                ? <img src={project.thumbnail} alt={project.name} className="game-thumb" />
                : <div className="thumb-placeholder" />}
              <div className="game-info">
                <span className="game-name">{project.name}</span>
                <span className="game-desc">{project.description}</span>
              </div>
            </div>
          )
        )}
      </div>

      <hr />

      <h1>Middle School Projects</h1>
      <p style={{ marginBottom: '1.5rem' }}>
        A few games written in middle school. Since then, minimal changes have been made (only size responsiveness) to preserve the code. All made pre-GPT during COVID!
      </p>
      <div className="games-grid">
        {games.map((game) =>
          game.url ? (
            <a
              key={game.name}
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className="game-card"
            >
              <img src={game.thumbnail} alt={game.name} className="game-thumb" />
              <div className="game-info">
                <span className="game-name">{game.name}</span>
                <span className="game-desc">{game.description}</span>
              </div>
            </a>
          ) : (
            <div key={game.name} className="game-card game-card--disabled">
              <img src={game.thumbnail} alt={game.name} className="game-thumb" />
              <div className="game-info">
                <span className="game-name">{game.name}</span>
                <span className="game-desc">{game.description}</span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
