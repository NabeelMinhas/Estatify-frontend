# 🏠 Estatify - Real Estate Listings Dashboard

A modern, responsive Real Estate Listings Dashboard built with React and TypeScript, featuring beautiful UI/UX, interactive property details, price charts, and map integration.

![Estatify Dashboard](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/CSS-Modern-green?style=for-the-badge&logo=css3)

## 🎥 Live Demo

**[🚀 View Live Demo Video](https://jam.dev/c/be164bd2-8859-4d92-a70c-f81ec75c4678)**

*Experience Estatify in action! Watch the full demo showcasing all features including property browsing, filtering, interactive maps, price charts, and modal interactions.*


## 🛠️ Installation & Setup

### **Prerequisites**
- Node.js 16.x or higher
- npm or yarn package manager

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd frontend
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Start Development Server**
```bash
npm start
```

The application will open at `http://localhost:3000`

### **4. Build for Production**
```bash
npm run build
```


## ✨ Features

### 🏡 **Property Listings**
- **Grid View**: Modern card-based layout with property images and key details
- **List View**: Compact horizontal layout for quick property scanning
- **Map View**: Interactive map showing property locations with custom markers
- **Property Details Modal**: Rich modal with images, stats, price charts, and contact info

### 🎨 **Modern UI/UX**
- **Glassmorphism Design**: Beautiful glass effects and gradient backgrounds
- **Purple Gradient Theme**: Consistent brand colors throughout the application
- **Responsive Design**: Mobile-first approach with perfect mobile experience
- **Smooth Animations**: Micro-interactions and hover effects for premium feel
- **Premium Typography**: Clean, modern font hierarchy

### 🔍 **Search & Filtering**
- **Advanced Filters**: Filter by minimum bedrooms and price sorting
- **Search Functionality**: Real-time property search
- **Filter Badges**: Visual representation of active filters
- **Smart State Management**: Zustand-powered filter persistence

### 📊 **Data Visualization**
- **Interactive Price Charts**: 12-month price history using Chart.js
- **Market Trends**: Visual price appreciation indicators
- **Property Statistics**: Bedrooms, bathrooms, square footage display
- **Professional Data Presentation**: Investment insights for users

### 🗺️ **Map Integration**
- **Interactive Leaflet Maps**: Zoom, pan, and explore property locations
- **Custom Property Markers**: Branded house icons for properties
- **Rich Map Popups**: Property previews with images and key details
- **Geographic Context**: Neighborhood and location insights

### 📱 **Mobile Experience**
- **Touch-Friendly Interface**: Optimized for mobile interactions
- **Responsive Modal System**: Full-screen mobile modals with smooth scrolling
- **Mobile Navigation**: Collapsible filters and mobile-optimized layouts
- **Performance Optimized**: Fast loading and smooth animations

## 🚀 Technologies Used

### **Frontend Framework**
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with strict typing
- **React Router DOM** - Client-side routing and navigation

### **State Management**
- **Zustand** - Lightweight state management for properties and filters
- **Custom Hooks** - Reusable logic for property and filter management

### **Styling & UI**
- **CSS Modules** - Component-scoped styling
- **Custom CSS** - Hand-crafted animations and glassmorphism effects
- **Responsive Design** - Mobile-first CSS with media queries

### **Data Visualization**
- **Chart.js** - Interactive price charts and data visualization
- **React Chart.js 2** - React wrapper for Chart.js integration

### **Maps & Location**
- **Leaflet** - Open-source interactive maps
- **React Leaflet** - React components for Leaflet integration
- **OpenStreetMap** - Free, editable map tiles

### **Icons & Assets**
- **Lucide React** - Modern icon library for UI elements
- **Custom SVG Icons** - Hand-crafted icons for property features

### **Development Tools**
- **Create React App** - Development environment and build tools
- **ESLint** - Code linting and quality assurance
- **TypeScript Compiler** - Type checking and compilation

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── EmptyState/      # Empty state displays
│   ├── Filters/         # Property filtering interface
│   ├── Layout/          # Header and layout components
│   ├── MapView/         # Interactive map component
│   ├── PriceChart/      # Chart.js price visualization
│   ├── PropertyCard/    # Property card components
│   ├── PropertyDetailsModal/  # Modal for property details
│   └── SearchBar/       # Search input component
├── pages/               # Main page components
│   ├── PropertyList.tsx # Main property listing page
│   └── PropertyDetails.tsx # Individual property page
├── store/               # Zustand state management
│   ├── propertyStore.ts # Property data and API calls
│   └── filterStore.ts   # Filter state management
├── types/               # TypeScript type definitions
│   └── property.ts      # Property interface definitions
├── utils/               # Utility functions
│   └── api.ts          # API calls and data fetching
└── styles/             # Global styles and themes
    └── global.css      # Global CSS variables and styles
```

