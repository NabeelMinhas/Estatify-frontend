
import './Header.css';

interface HeaderProps {
  title?: string | undefined;
}

const Header: React.FC<HeaderProps> = ({ title = 'Estatify' }) => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          {/* Logo and Brand */}
          <div className="header__brand">
            <div className="header__logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="currentColor"/>
              </svg>
              <span className="header__brand-text">{title}</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="header__nav">
            <a href="/" className="header__nav-item header__nav-item--active">
              Home
            </a>
            <a href="/" className="header__nav-item">
              Properties
            </a>
            <a href="/" className="header__nav-item">
              Agents
            </a>
            <a href="/" className="header__nav-item">
              Insights
            </a>
            <a href="/" className="header__nav-item">
              Contact
            </a>
          </nav>

          {/* User Actions */}
          <div className="header__actions">
            <div className="header__notifications">
              <button className="header__notification-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21A2 2 0 0 1 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="header__notification-badge">3</span>
              </button>
            </div>
            <div className="header__user">
              <button className="header__user-btn">
                <div className="header__user-avatar">
                  <span>A</span>
                </div>
                <span className="header__user-text">Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
