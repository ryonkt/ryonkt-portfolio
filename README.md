# RYONKT // Portfolio Website

Experimental sound artist portfolio website with admin dashboard.

## Features

- 🎵 Monochrome, avant-garde design
- ⚡ Glitch effects and experimental animations
- 📱 Fully responsive
- 🔧 Easy-to-use admin dashboard
- 🚀 Optimized for Kinsta hosting

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:5173

### 3. Build for Production
```bash
npm run build
```

## Project Structure

```
ryonkt-portfolio/
├── src/
│   ├── App.jsx              # Main portfolio
│   ├── Dashboard.jsx        # Admin dashboard (use separate file)
│   ├── index.jsx            # Entry point
│   └── index.css            # Global styles
├── public/
│   └── index.html           # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS config
└── README.md                # This file
```

## Deployment to Kinsta

See `KINSTA_DEPLOYMENT_GUIDE.md` for detailed instructions.

### Quick Deploy Steps:

1. Push to GitHub
2. Connect GitHub to Kinsta
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

## Content Management

Edit content through the dashboard at `/dashboard` route or directly in the code:

- Works: Add/edit/delete in Dashboard
- About: Update bio and details
- Contact: Update social links

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide Icons

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 RYONKT. All rights reserved.

## Support

For deployment issues, see the deployment guide or contact support.
