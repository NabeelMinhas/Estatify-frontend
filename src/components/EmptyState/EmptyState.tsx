import './EmptyState.css';

interface EmptyStateProps {
  type?: 'no-results' | 'no-properties' | 'error';
  title?: string;
  message?: string;
  showClearButton?: boolean;
  onClearFilters?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'no-results',
  title,
  message,
  showClearButton = true,
  onClearFilters
}) => {
  const getDefaultContent = () => {
    switch (type) {
      case 'no-results':
        return {
          title: 'No Properties Found',
          message: 'No properties found. Try adjusting your filters.',
          icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          )
        };
      case 'no-properties':
        return {
          title: 'No Properties Available',
          message: 'There are no properties to display at the moment.',
          icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4" 
              />
            </svg>
          )
        };
      case 'error':
        return {
          title: 'Something went wrong',
          message: 'We encountered an error while loading properties. Please try again.',
          icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          )
        };
      default:
        return {
          title: 'No Results',
          message: 'No content available.',
          icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
              />
            </svg>
          )
        };
    }
  };

  const defaultContent = getDefaultContent();
  const displayTitle = title || defaultContent.title;
  const displayMessage = message || defaultContent.message;

  return (
    <div className={`empty-state empty-state--${type}`}>
      <div className="empty-state__icon">
        {defaultContent.icon}
      </div>
      
      <h3 className="empty-state__title">
        {displayTitle}
      </h3>
      
      <p className="empty-state__message">
        {displayMessage}
      </p>
      
      {showClearButton && onClearFilters && type === 'no-results' && (
        <button
          type="button"
          className="empty-state__button"
          onClick={onClearFilters}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
