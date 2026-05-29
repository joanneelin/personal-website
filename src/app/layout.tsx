import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavLinks from '@/components/NavLinks';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Joanne Lin',
  description: 'Student at Penn M&T — economics, computer science, and building things.',
  openGraph: {
    title: 'Joanne Lin',
    description: 'Student at Penn M&T — economics, computer science, and building things.',
    url: 'https://joanneelin.com',
    siteName: 'Joanne Lin',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <NavLinks />
        <main>
          {children}
        </main>
        <footer>
          <div className="content">
            <div className="footer-links">
              <a href="https://github.com/joanneelin" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://linkedin.com/in/joanneelin/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="mailto:joanneln@wharton.upenn.edu">
                Email
              </a>
            </div>
            <p>© {new Date().getFullYear()} Joanne Lin</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
