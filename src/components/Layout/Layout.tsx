import Header from './Header';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="layout">
      <Header title={title} />
      <main className="layout__main">
        {children}
      </main>
    </div>
  );
};

export default Layout;
