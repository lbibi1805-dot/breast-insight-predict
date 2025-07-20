# 🩺 Breast Insight Predict - AI Medical Screening Tool

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.11-38B2AC.svg)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Latest-000000.svg)](https://ui.shadcn.com/)

**Breast Insight Predict** is a modern, AI-powered web application for breast cancer screening assistance. Built with React, TypeScript, and shadcn/ui, it provides an intuitive interface for medical professionals and researchers to input patient data and receive AI-powered predictions using machine learning models.

## 🚀 Live Demo & API

**🌐 Frontend Application**: Coming Soon  
**🔌 API Backend**: https://api-deploy-ml-breastcancer-wisconsin.onrender.com

## ✨ Key Features

### 🏥 Medical Interface
- **Interactive Parameter Input**: Intuitive sliders for 9 medical features
- **Real-time Risk Assessment**: Visual feedback with color-coded risk levels
- **Medical Tooltips**: Detailed explanations for each parameter
- **Sample Data**: Pre-loaded test cases for demonstration

### 🤖 AI Integration
- **KNN Model Integration**: 97.08% accuracy breast cancer prediction
- **Real-time Predictions**: Instant results via API calls
- **Confidence Scoring**: Prediction confidence levels displayed
- **Model Information**: Detailed AI model statistics and metrics

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark/Light Mode**: Theme switching support
- **Accessibility**: WCAG compliant design patterns
- **Professional Medical Theme**: Clean, medical-grade interface

### 📊 Educational Content
- **Medical Information**: Comprehensive breast cancer education
- **Feature Explanations**: Detailed descriptions of each input parameter
- **Risk Factor Information**: Educational content about cancer risks
- **Prevention Guidelines**: Medical screening recommendations

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and suspense
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.1** - Lightning-fast build tool and dev server

### UI Components & Styling
- **shadcn/ui** - High-quality, accessible UI components
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful, customizable icons

### State Management & API
- **TanStack Query** - Server state management and caching
- **React Hook Form** - Performant form handling
- **Axios** - HTTP client for API communication
- **Zod** - TypeScript-first schema validation

### Development Tools
- **ESLint** - Code linting and quality assurance
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixes

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0+ and **npm** (or **yarn/pnpm/bun**)
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd breast-insight-predict

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Commands

```bash
# Development server with hot reload
npm run dev

# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Build for production
npm run build

# Build for development (with source maps)
npm run build:dev
```

## 📊 Analytics Setup

This project includes Vercel Analytics for tracking page views and user interactions.

### Get Started with Analytics

To start counting visitors and page views, follow these steps:

**1. Install the package** (Already included)
```bash
npm i @vercel/analytics
```

**2. Add the React component** (Already configured)
```tsx
import { Analytics } from "@vercel/analytics/react"

// Component is already added to App.tsx
<Analytics />
```

**3. Deploy & Visit your Site**

Deploy your changes and visit the deployment to collect your page views.

If you don't see data after 30 seconds, please check for content blockers and try to navigate between pages on your site.

For full examples and further reference, please refer to the [Vercel Analytics documentation](https://vercel.com/docs/analytics).

## 🏗️ Project Structure

```
breast-insight-predict/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── PredictionForm.tsx
│   │   ├── ResultsDisplay.tsx
│   │   ├── ModelInfo.tsx
│   │   └── SampleData.tsx
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and API client
│   ├── pages/            # Page components
│   └── App.tsx           # Main application component
├── package.json
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## 🔌 API Integration

The application integrates with the Breast Cancer Prediction API:

```typescript
// Example API usage
import { predictCancer, getModelInfo } from '@/lib/api';

// Make a prediction
const features = [2, 1, 1, 1, 2, 1, 2, 1, 1]; // 9 medical features
const result = await predictCancer(features);

// Get model information
const modelInfo = await getModelInfo();
```

### API Endpoints Used
- `GET /` - Health check
- `POST /predict` - Cancer prediction
- `GET /model/info` - Model information
- `POST /predict/batch` - Batch predictions

## 🩺 Medical Features

The application processes 9 key medical parameters:

1. **Clump Thickness** - Thickness of cell clumps
2. **Uniform Cell Size** - Consistency of cell sizes
3. **Uniform Cell Shape** - Consistency of cell shapes
4. **Marginal Adhesion** - Cell adhesion quality
5. **Single Epithelial Cell Size** - Size of epithelial cells
6. **Bare Nuclei** - Presence of bare nuclei
7. **Bland Chromatin** - Chromatin structure quality
8. **Normal Nucleoli** - Nucleoli appearance
9. **Mitoses** - Cell division frequency

Each parameter is rated on a scale of 1-10 where:
- **1-3**: Normal range
- **4-6**: Suspicious range  
- **7-10**: Concerning range

## 🎯 Features Roadmap

### Completed ✅
- Interactive prediction form with medical parameters
- Real-time API integration with confidence scoring
- Responsive design with modern UI components
- Educational content and sample data
- Model information display
- Medical disclaimers and safety warnings

### In Progress 🚧
- Advanced data visualization and charts
- Historical prediction tracking
- Enhanced accessibility features
- Performance optimizations

### Planned 📋
- User authentication and session management
- Medical report generation and export
- Integration with additional ML models
- Batch prediction capabilities
- Medical professional verification system

## ⚠️ Medical Disclaimer

**IMPORTANT**: This application is designed for **educational and research purposes only**. It should **NOT** be used for actual medical diagnosis or treatment decisions. 

- Always consult qualified healthcare professionals for medical advice
- Results are based on AI predictions and may not be accurate
- This tool does not replace professional medical screening
- Use only as a supplementary educational resource

## 🤝 Contributing

We welcome contributions from the medical and developer community:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Follow TypeScript best practices
- Maintain medical accuracy in educational content
- Ensure accessibility compliance
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Wisconsin Breast Cancer Dataset** - University of Wisconsin
- **Medical Research Community** - For validation and feedback
- **Open Source Contributors** - React, TypeScript, and shadcn/ui teams
- **Healthcare Professionals** - For medical guidance and review

## 📞 Support & Contact

For technical support, medical questions, or collaboration opportunities:

- **Issues**: [GitHub Issues](../../issues)
- **Discussions**: [GitHub Discussions](../../discussions)
- **Email**: [Contact Form Coming Soon]

---

**Made with ❤️ for advancing medical AI research and education**
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ee759ced-ebd0-4470-a445-0f0a70e7b721) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
