# 🩺 Breast Insight Predict - Development Guide

## 🚀 Project Overview

Breast Insight Predict is a modern AI-powered web application for breast cancer screening assistance. Built with React, TypeScript, and cutting-edge UI components, it provides medical professionals and researchers with an intuitive interface for cancer prediction using machine learning models.

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.1** - Fast build tool and dev server

### UI Components
- **shadcn/ui** - High-quality component library
- **Tailwind CSS 3.4.11** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful SVG icons

### State Management
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling
- **Axios** - HTTP client

## 📁 Project Structure

```
breast-insight-predict/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui base components
│   │   ├── PredictionForm.tsx    # Medical parameter input
│   │   ├── ResultsDisplay.tsx    # AI prediction results
│   │   ├── ModelInfo.tsx         # ML model information
│   │   └── SampleData.tsx        # Clinical sample cases
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and API client
│   │   ├── api.ts        # API communication layer
│   │   └── utils.ts      # Helper functions
│   ├── pages/            # Page components
│   │   ├── Index.tsx     # Main application page
│   │   └── NotFound.tsx  # 404 error page
│   └── App.tsx           # Root application component
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite build configuration
```

## 🏥 Medical Features

### Core Prediction Parameters
1. **Clump Thickness** - Cellular organization assessment
2. **Uniform Cell Size** - Cell size consistency
3. **Uniform Cell Shape** - Cellular morphology
4. **Marginal Adhesion** - Cell connection strength
5. **Single Epithelial Cell Size** - Epithelial cell dimensions
6. **Bare Nuclei** - Nuclear characteristics
7. **Bland Chromatin** - Chromatin structure
8. **Normal Nucleoli** - Nucleolar appearance
9. **Mitoses** - Cell division activity

### Feature Ranges
- **1-3**: Normal/Benign characteristics
- **4-6**: Suspicious/Atypical features
- **7-10**: Concerning/Malignant indicators

## 🔌 API Integration

### Base Configuration
```typescript
const API_BASE_URL = 'https://api-deploy-ml-breastcancer-wisconsin.onrender.com';
```

### Available Endpoints
- `GET /` - Health check
- `POST /predict` - Single prediction
- `GET /model/info` - Model information
- `POST /predict/batch` - Batch predictions

### Example Usage
```typescript
import { predictCancer } from '@/lib/api';

const features = [2, 1, 1, 1, 2, 1, 2, 1, 1];
const result = await predictCancer(features);
```

## 🎨 UI/UX Design

### Color Scheme
- **Primary**: Blue tones for medical professionalism
- **Success**: Green for benign/healthy results
- **Warning**: Yellow/Orange for suspicious cases
- **Danger**: Red for malignant/critical cases

### Component Patterns
- **Cards**: Main content containers with shadows
- **Badges**: Status and risk level indicators
- **Progress bars**: Confidence and accuracy displays
- **Alerts**: Important medical disclaimers

## 📊 Component Architecture

### PredictionForm Component
- Interactive sliders for parameter input
- Real-time risk assessment
- Visual feedback with color coding
- Medical tooltips and explanations

### ResultsDisplay Component
- Comprehensive prediction results
- Risk assessment visualization
- Clinical recommendations
- Medical disclaimers

### SampleData Component
- Pre-configured clinical cases
- Tabbed organization by risk level
- Detailed patient information
- Educational content

### ModelInfo Component
- AI model specifications
- Performance metrics
- Training information
- Algorithm comparison

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🧪 Testing Strategy

### Manual Testing Checklist
- [ ] All medical parameters accept values 1-10
- [ ] API integration works correctly
- [ ] Sample cases trigger correct predictions
- [ ] UI is responsive across devices
- [ ] Medical disclaimers are prominent
- [ ] Accessibility features function

### Sample Test Cases
1. **Benign Case**: [2, 1, 1, 1, 2, 1, 2, 1, 1]
2. **Malignant Case**: [8, 7, 8, 5, 10, 9, 8, 7, 3]
3. **Borderline Case**: [5, 4, 4, 3, 6, 4, 5, 3, 2]

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- Touch-friendly sliders
- Collapsible sections
- Simplified navigation
- Optimized typography

## ⚠️ Medical Compliance

### Required Disclaimers
- Educational/research purpose only
- Not for actual medical diagnosis
- Consult healthcare professionals
- AI predictions may be inaccurate

### Data Privacy
- No patient data storage
- Session-based interactions
- HIPAA compliance awareness
- Secure API communications

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
- API endpoints
- Feature flags
- Analytics keys
- Error tracking

## 🔮 Future Enhancements

### Phase 1 (Immediate)
- [ ] Enhanced data visualization
- [ ] Historical prediction tracking
- [ ] Improved accessibility
- [ ] Performance optimizations

### Phase 2 (Short-term)
- [ ] User authentication
- [ ] Report generation
- [ ] Additional ML models
- [ ] Batch processing

### Phase 3 (Long-term)
- [ ] Professional verification
- [ ] Integration with EMR systems
- [ ] Advanced analytics
- [ ] Multi-language support

## 📞 Support

For technical issues or feature requests:
- **GitHub Issues**: [Repository Issues](../../issues)
- **Discussions**: [Community Discussions](../../discussions)
- **Documentation**: This file and README.md

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ for advancing medical AI research and education**
