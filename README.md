# Guillermo Ortiz - Portfolio Website

A modern, responsive, and multilingual portfolio website showcasing Guillermo Ortiz's professional experience, skills, and achievements as a Head of Engineering and Enterprise Architect.

![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)
![i18n](https://img.shields.io/badge/i18n-Multilingual-success)
![Vite](https://img.shields.io/badge/Vite-5.x-646cff?logo=vite)

## 🚀 Features

- **Fully Responsive Design** - Optimized for mobile, tablet, and desktop devices
- **Multilingual Support** - English and Spanish with seamless language switching
- **Modern UI/UX** - Built with Tailwind CSS and Lucide React icons
- **Component-Based Architecture** - Modular, maintainable React components
- **Type-Safe** - Full TypeScript support for better code quality
- **Performance Optimized** - Built with Vite for fast build times and development experience
- **Accessibility First** - Semantic HTML and ARIA labels throughout

## 📋 Sections

The portfolio includes the following sections:

- **Hero** - Eye-catching introduction with social links and language selector
- **About** - Professional background and expertise overview with three key pillars
- **Experience** - Career timeline with detailed positions and achievements from 2017-Present
- **Certifications** - AWS, Azure, Adobe, and Scrum certifications with verified badges
- **Skills & Expertise** - Organized by categories: Leadership, Architecture, Security, Technologies, CMS, and Methodologies
- **Languages** - Multilingual proficiency (Spanish, Catalan, English, French, German)
- **Achievements** - Key professional accomplishments highlighting global leadership and platform transformation
- **Contact** - Multiple contact methods (Email, Phone, LinkedIn, Website, Location)

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **Styling**: Tailwind CSS with PostCSS
- **Build Tool**: Vite 5.x
- **Internationalization**: i18next + react-i18next
- **Icons**: Lucide React
- **Backend/Database**: Supabase (configured but optional)
- **Code Quality**: ESLint with TypeScript support

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/gortizfigueroa/gortiz-portfolio.git
   cd gortiz-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The portfolio will be available at `http://localhost:5173`

## 🔨 Build

To build for production:

```bash
npm run build
```

The optimized build output will be in the `dist/` directory.

## 📝 Scripts

- `npm run dev` - Start Vite development server with hot module replacement
- `npm run build` - Build for production with TypeScript type checking
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally
- `npm run typecheck` - Run TypeScript type checker without emitting files

## 🌍 Internationalization (i18n)

The portfolio supports English and Spanish. Language files are located in:

```
src/locales/
├── en.json    # English translations
└── es.json    # Spanish translations
```

### Adding a New Language

1. Create a new locale file in `src/locales/` (e.g., `fr.json`)
2. Add translations for all keys matching the structure of `en.json`
3. Update `src/i18n.js` to include the new language:
   ```javascript
   i18n
     .use(initReactI18next)
     .init({
       resources: {
         en: { translation: en },
         es: { translation: es },
         fr: { translation: fr }, // Add new language
       },
       // ... rest of config
     });
   ```

### Language Switcher

The Hero component includes a language selector dropdown that:
- Shows the current language (EN/ES)
- Dynamically updates all content when changed
- Closes automatically after selection
- Detects clicks outside to auto-close

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.tsx           # Introduction and language switcher
│   ├── About.tsx          # Professional summary
│   ├── Experience.tsx     # Career timeline
│   ├── Certifications.tsx # Professional certifications
│   ├── Skills.tsx         # Skills by category
│   ├── Languages.tsx      # Language proficiency
│   ├── Achievements.tsx   # Key accomplishments
│   └── Contact.tsx        # Contact information
├── locales/
│   ├── en.json           # English translations
│   └── es.json           # Spanish translations
├── App.tsx               # Main application component
├── i18n.js              # i18n configuration
├── index.css            # Global styles
└── main.tsx             # Application entry point
```

## 🎨 Styling

The project uses **Tailwind CSS** for styling with a custom color scheme:

- **Primary**: Slate (900, 800, 50)
- **Accent**: Emerald (500)
- **Text**: White and slate variants

Configuration files:
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS plugins

## ♿ Accessibility

The portfolio follows web accessibility best practices:

- Semantic HTML structure
- ARIA labels for all interactive elements
- Keyboard navigation support
- Proper heading hierarchy
- Color contrast ratios meet WCAG standards
- Focus indicators for keyboard users

## 🚀 Deployment

The portfolio can be deployed to various platforms:

### Vercel (Recommended)
```bash
vercel
```

### Netlify
```bash
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
npm run build
# Deploy the dist/ folder to your GitHub Pages branch
```

## 📊 Performance Optimization

- **Code Splitting** - Components are lazy-loadable
- **Image Optimization** - SVG icons via Lucide React
- **CSS Optimization** - Tailwind purges unused styles
- **Build Optimization** - Vite's esbuild for fast bundling

## 🐛 Known Issues & Limitations

- Supabase integration is configured but not actively used (can be removed if not needed)
- Contact form sends emails via i18n translations (no backend form submission)

## 🔐 Environment Variables

Currently, no environment variables are required for basic functionality. If using Supabase, create a `.env.local`:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## 📄 License

This project is open source and available under the MIT License.

## 👤 About the Author

**Guillermo Ortiz** - Head of Engineering at Flight Centre Travel Group
- 🔗 LinkedIn: [guillermoortizfigueroa](https://www.linkedin.com/in/guillermoortizfigueroa)
- 🌐 Website: [guillermoortiz.es](https://www.guillermoortiz.es)
- 📧 Email: guillermo@guillermoortiz.es
- 📍 Location: Barcelona, Spain

## 🤝 Contributing

This is a personal portfolio project, but feel free to fork it and customize it for your own use!

## 📞 Support

For questions or feedback about the portfolio, reach out via:
- Email: guillermo@guillermoortiz.es
- LinkedIn: [@guillermoortizfigueroa](https://www.linkedin.com/in/guillermoortizfigueroa)

---

**Last Updated**: December 2025 | **Version**: 1.0.0
