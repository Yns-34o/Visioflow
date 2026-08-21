import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/nos-projets', label: 'Nos projets' },
    { href: '/comment-ca-marche', label: 'Comment ça marche' },
    { href: '/a-propos', label: 'À propos' },
  ];

  return (
    <>
      <nav className={`vf2-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="vf2-nav-content">
          <Link href="/" className="vf2-logo">
            <svg viewBox="0 0 44 44" width="34" height="34" fill="none">
              <defs>
                <linearGradient id="vf-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              <path
                d="M22 22 C18 14, 8 14, 8 22 C8 30, 18 30, 22 22 C26 14, 36 14, 36 22 C36 30, 26 30, 22 22"
                stroke="url(#vf-logo-grad)"
                strokeWidth="3.4"
                strokeLinecap="round"
              />
            </svg>
            Visio<span className="vf2-logo-accent">flow</span>
          </Link>

          <div className="vf2-nav-links">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="vf2-nav-link">
                {link.label}
              </Link>
            ))}
            <a href="#devis" className="vf2-nav-cta">
              Démarrer un projet
            </a>
          </div>

          <button className="vf2-nav-burger" onClick={toggleMobile} aria-label="Menu">
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile Panel */}
      <div className={`vf2-mobile-panel ${mobileOpen ? 'open' : ''}`}>
        <button
          onClick={toggleMobile}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(0, 113, 227, 0.1)',
            border: '1px solid rgba(0, 113, 227, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          aria-label="Fermer"
        >
          <X size={24} color="var(--vf2-blue)" />
        </button>

        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="vf2-mobile-link"
            onClick={toggleMobile}
          >
            {link.label}
          </Link>
        ))}

        <a
          href="#devis"
          className="vf2-btn-primary"
          onClick={toggleMobile}
          style={{ marginTop: '16px' }}
        >
          Démarrer un projet
        </a>
      </div>

      <style jsx>{`
        .vf2-mobile-panel button:hover {
          background: rgba(0, 113, 227, 0.15);
        }
      `}</style>
    </>
  );
}