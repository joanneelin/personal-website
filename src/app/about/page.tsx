import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Joanne Lin',
  description: 'About Joanne Lin',
};

export default function AboutPage() {
  return (
    <div className="content" style={{ padding: '3rem 2rem 5rem' }}>
      <h1>About</h1>
      <p>
        Still learning and exploring, but am especially interested in the startup space + building. A few projects I&apos;ve worked on can be found{' '}
        <a href="/projects">here</a>.
      </p>
      <p>
        Usually can be found in Philly or Vancouver (WA!). Otherwise, I&apos;m reaping the benefits of having older sisters in SF and DC :)
      </p>

      <section className="about-section">
        <br />
        <h1>Past Experiences</h1>
        <div className="entry">
          <div className="entry-header">
            <span className="entry-org">Information Technology Intern @ Lockheed Martin</span>
          </div>
          <p className="entry-role">
            Saved ~$184k/year by building Agile tools from 0-1.
          </p>
        </div>
        <div className="entry">
          <div className="entry-header">
            <span className="entry-org">Research Intern @ University of Maryland</span>
          </div>
          <p className="entry-role">
            Studied woody plant encroachment in Africa in relation to wildfire and grazing patterns.
          </p>
        </div>
        <div className="entry">
          <div className="entry-header">
            <span className="entry-org">iCare Intern @ UW DAIS Research Group</span>
          </div>
          <p className="entry-role">
            Worked on front-end UI/UX for an AI-powered therapist app.
          </p>
        </div>
        <div className="entry">
          <div className="entry-header">
            <span className="entry-org">Founder @ My STEM Project</span>
          </div>
          <p className="entry-role">
            Hosted nine-week cohorts teaching code to 200+ individuals from 20+ countries.
          </p>
        </div>
        <div className="entry">
          <div className="entry-header">
            <span className="entry-org">Leader @ Future Business Leaders of America</span>
          </div>
          <p className="entry-role">
            Four years of leadership across local (Chapter President), state (State President), and national levels (Executive Assistant).
          </p>
        </div>
        <div className="entry">
          <div className="entry-header">
            <span className="entry-org">SEES Intern @ NASA</span>
          </div>
          <p className="entry-role">
            Manipulated satellite data to classify vulnerable tree species.
          </p>
        </div>
      </section>
    </div>
  );
}
