# Real Estate Listings Dashboard

A modern, responsive Real Estate Dashboard built with React, TypeScript, and Zustand. This application displays property listings with advanced filtering, search functionality, and detailed property views.

## 🏠 Live Demo

The application provides a seamless property browsing experience with:
- **Property List Page**: Grid layout with search and filters
- **Property Details Page**: Comprehensive property information
- **Responsive Design**: Optimized for mobile, tablet, and desktop

## 🚀 Features

### Core Functionality
- ✅ **Property Listings**: Display properties in responsive card grid
- ✅ **Search**: Case-insensitive search by property title and location
- ✅ **Filters**: Filter by minimum bedrooms and sort by price
- ✅ **Property Details**: Comprehensive property information page
- ✅ **Navigation**: Seamless routing between list and detail views

### Attention to Detail Requirements
- ✅ **Search Placeholder**: Exact text "Search properties..."
- ✅ **Empty State Message**: "No properties found. Try adjusting your filters."
- ✅ **Hover Effects**: Property cards have shadow and scale-up animations

### Technical Features
- 🎯 **TypeScript**: Full type safety throughout the application
- 🔧 **Zustand**: Modern state management with DevTools
- 📱 **Responsive Design**: Mobile-first approach with CSS Grid
- ♿ **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- 🎨 **Modern UI**: Clean design with smooth animations
- ⚡ **Performance**: Optimized loading states and error handling

## 🛠️ Technology Stack

### Frontend
- **React** 19.1.1 - UI framework
- **TypeScript** 4.9.5 - Type safety
- **React Router DOM** 7.9.1 - Client-side routing

### State Management
- **Zustand** 5.0.8 - Lightweight state management

### Styling
- **CSS Modules** - Component-scoped styling
- **CSS Grid & Flexbox** - Responsive layouts
- **Custom CSS Variables** - Design system

### Build Tools
- **Create React App** - Development environment
- **TypeScript Compiler** - Build and type checking

## 📦 Installation

### Prerequisites
- Node.js (14.0 or higher)
- npm or yarn

### Setup Steps
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── PropertyCard/   # Property display cards
│   │   ├── SearchBar/      # Search functionality
│   │   ├── Filters/        # Filter controls
│   │   ├── Layout/         # Layout components
│   │   └── EmptyState/     # Empty state messaging
│   ├── pages/              # Route-level components
│   │   ├── PropertyList.tsx    # Main listings page
│   │   └── PropertyDetails.tsx # Property detail page
│   ├── store/              # Zustand state stores
│   │   ├── propertyStore.ts    # Property data management
│   │   └── filterStore.ts      # Search/filter state
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── styles/             # Global styles
│   ├── App.tsx             # Main app component with routing
│   └── index.tsx           # Application entry point
├── package.json            # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## 🎯 Available Scripts

### Development
```bash
npm start          # Start development server (http://localhost:3000)
npm run build      # Create production build
npm test           # Run test suite
npm run eject      # Eject from Create React App (one-way operation)
```

### Type Checking
```bash
npx tsc --noEmit   # Check TypeScript types without building
```

## 🔧 Configuration

### API Endpoint
The application fetches property data from:
```
https://s3.us-central-1.wasabisys.com/mashvisor-cdn/task-fe-listings.json
```

### Environment Variables
No additional environment variables required for basic functionality.

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (single column)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (3-4 columns)

### Features
- Mobile-first CSS approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized typography scaling

## ♿ Accessibility

### Implemented Features
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Screen reader friendly descriptions
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG compliant color ratios
- **Reduced Motion**: Respects prefers-reduced-motion

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Success**: Green (#059669)
- **Text**: Gray scale (#111827 to #9ca3af)
- **Background**: Light gray (#f8f9fa)

### Typography
- **System Fonts**: -apple-system, BlinkMacSystemFont, Segoe UI
- **Scales**: 0.875rem to 2.25rem
- **Weights**: 400, 500, 600, 700

## 🐛 Error Handling

### Implemented Strategies
- **Loading States**: Skeleton components during data fetch
- **Error Boundaries**: Graceful error handling
- **Network Errors**: Retry functionality with user feedback
- **404 Handling**: Proper not found states
- **Image Fallbacks**: Placeholder images for broken links

## 🔮 Future Enhancements

### Potential Features
- **Advanced Filters**: Price range, property type, amenities
- **Map Integration**: Google Maps with property markers
- **Favorites**: Save properties for later
- **Comparison**: Side-by-side property comparison
- **Virtual Tours**: 360° property views
- **Price Charts**: Historical price data visualization

### Technical Improvements
- **Progressive Web App**: Offline capability
- **Server-Side Rendering**: Next.js migration
- **Testing**: Unit and integration tests
- **Performance**: Virtual scrolling for large datasets
- **Internationalization**: Multi-language support

## 📊 Performance Metrics

### Build Output
- **JavaScript**: ~78KB gzipped
- **CSS**: ~4.3KB gzipped
- **Chunks**: Optimized code splitting

### Optimization Features
- **Code Splitting**: Automatic chunk optimization
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Compressed images and fonts
- **Lazy Loading**: On-demand component loading

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript strict mode
2. Use semantic commit messages
3. Maintain component documentation
4. Write accessible HTML
5. Test responsive designs

### Code Style
- **ESLint**: React and TypeScript rules
- **Prettier**: Consistent code formatting
- **CSS**: BEM-inspired naming convention
- **Components**: Functional components with hooks

## 📝 License

This project is created for demonstration purposes.

---

**Development Time**: Approximately 3 hours  
**Satisfaction Rating**: 9/10  

### Notes on Approach
- **Component-First**: Built reusable, isolated components
- **Type Safety**: Comprehensive TypeScript integration
- **Modern Patterns**: Hooks, functional components, Zustand
- **Performance**: Optimized renders and bundle size
- **Accessibility**: WCAG guidelines implementation
- **Responsive**: Mobile-first, progressive enhancement

### Trade-offs Made
- Used relative imports instead of path aliases for Create React App compatibility
- Focused on core features over advanced functionality
- Prioritized code quality over additional features