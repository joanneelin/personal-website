import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Joanne Lin',
};

export default function Home() {
  return (
    <div className="home-centered">
      <p>
        Hi, I&apos;m Joanne! I&apos;m studying finance and computer science at Penn&apos;s{' '}
        <a href="https://fisher.wharton.upenn.edu" target="_blank" rel="noopener noreferrer">
          Jerome Fisher M&amp;T Program
        </a>{' '} (BS @ Wharton and BSE @ Penn Engineering).
      </p>
      <p>
        Previously: L&T Technology Services, Lockheed Martin.
      </p>
      <p>
        Reach me at{' '}
        <a href="mailto:joanneln@wharton.upenn.edu">joanneln@wharton.upenn.edu</a>.
      </p>
    </div>
  );
}
