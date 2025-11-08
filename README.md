# Movie Platform - Frontend

A modern, feature-rich movie management platform built with Next.js, React Query, and TypeScript.

## 🚀 Features

- **🔐 Secure Authentication**: JWT-based auth with automatic token refresh
- **🎬 Movie Management**: Full CRUD operations for movies
- **📤 File Upload**: Direct image upload to S3 via backend
- **⚡ Real-time Updates**: React Query for optimistic updates and caching
- **🎨 Modern UI**: Built with Tailwind CSS and Radix UI components
- **📱 Responsive Design**: Works seamlessly on desktop and mobile
- **🔍 Type Safety**: Full TypeScript support throughout
- **🛡️ Protected Routes**: Automatic authentication guards
- **🐛 Developer Tools**: React Query DevTools in development mode

## 🏗️ Architecture

### Project Structure

```
/Users/kamran/Downloads/code/
├── app/                      # Next.js app router
│   ├── movies/              # Movie pages
│   ├── design-system/       # Design system showcase
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Login page
├── components/
│   ├── providers/           # React context providers
│   │   ├── auth-provider.tsx       # Auth state management
│   │   ├── query-provider.tsx      # React Query setup
│   │   └── app-provider.tsx        # App-wide state
│   ├── ui/                  # Reusable UI components
│   └── movie-*.tsx          # Movie-specific components
├── lib/
│   ├── api/                 # API integration layer ⭐
│   │   ├── client.ts               # Axios client with interceptors
│   │   ├── token-storage.ts        # Secure token management
│   │   ├── types.ts                # TypeScript definitions
│   │   ├── services/               # API service layer
│   │   │   ├── auth.service.ts
│   │   │   ├── movies.service.ts
│   │   │   └── users.service.ts
│   │   └── hooks/                  # React Query hooks
│   │       ├── use-auth.ts
│   │       ├── use-movies.ts
│   │       └── use-users.ts
│   ├── config/              # Configuration
│   │   └── env.ts           # Environment variables
│   └── utils.ts             # Utility functions
├── hooks/                   # Custom React hooks
├── docs/                    # Documentation
│   ├── API_INTEGRATION.md   # API integration guide
│   └── SETUP.md             # Setup instructions
└── public/                  # Static assets
```

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm
- Backend API running (see backend setup)

### Quick Start

1. **Clone and navigate to the project:**

```bash
cd /Users/kamran/Downloads/code
```

2. **Install dependencies:**

```bash
pnpm install
```

3. **Create environment file:**

```bash
# Create .env.local file (see .env.example for reference)
cat > .env.local << EOF
NEXT_PUBLIC_API_BASE_URL=http://localhost:3025
NEXT_PUBLIC_API_VERSION=v1
NEXT_PUBLIC_API_DEBUG=false
EOF
```

4. **Start the development server:**

```bash
pnpm dev
```

The app will be available at `http://localhost:3001` (or the next available port).

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | `http://localhost:3025` | ✅ |
| `NEXT_PUBLIC_API_VERSION` | API version prefix | `v1` | ✅ |
| `NEXT_PUBLIC_API_DEBUG` | Enable API debug logging | `false` | ❌ |

### Backend Setup

The backend must be running for the frontend to work. See the backend README at:
`/Users/kamran/Work/NLabs/movie-be/README.md`

## 🎯 Usage

### Authentication

1. **Register**: Create a new account with email, password, and full name
2. **Login**: Sign in with your credentials
3. **Auto-redirect**: Authenticated users are redirected to movies page
4. **Auto-logout**: Invalid/expired tokens trigger automatic logout

### Movie Management

- **View Movies**: Browse all movies in a responsive grid
- **Add Movie**: Upload poster and enter movie details
- **Edit Movie**: Update title, year, or replace poster
- **Delete Movie**: Remove movies (with confirmation)

### API Integration

The app uses a robust API integration layer with:

- **Automatic Authentication**: Tokens are automatically added to requests
- **Error Handling**: User-friendly error messages
- **Caching**: Smart caching with React Query
- **Optimistic Updates**: UI updates immediately, rolls back on error
- **File Uploads**: Multipart form data for image uploads

Example usage:

```typescript
import { useMovies, useCreateMovieWithUpload } from '@/lib/api/hooks';

function MoviesPage() {
  const { data: movies, isLoading } = useMovies();
  const createMovie = useCreateMovieWithUpload();

  const handleCreate = async (file: File) => {
    await createMovie.mutateAsync({
      title: 'Inception',
      publishingYear: 2010,
      poster: file,
    });
  };

  // ...
}
```

## 🛠️ Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

### Code Quality

- **TypeScript**: Full type safety with strict mode
- **ESLint**: Linting with Next.js recommended rules
- **No Linter Errors**: Clean codebase with no errors

### Debugging

Enable debug mode to see API requests/responses:

```bash
# In .env.local
NEXT_PUBLIC_API_DEBUG=true
```

Open React Query DevTools (available in development mode) to inspect:
- Query cache
- Mutations
- Active queries
- Query invalidation

## 📚 Documentation

- **[API Integration Guide](./docs/API_INTEGRATION.md)**: Detailed API integration documentation
- **[Setup Guide](./docs/SETUP.md)**: Complete setup instructions with troubleshooting

## 🔒 Security Best Practices

✅ **Implemented:**

- JWT tokens stored in localStorage (secure for this use case)
- Automatic token expiration checking
- Auto-logout on 401 responses
- Protected routes with authentication guards
- CORS-enabled requests with credentials
- Input validation with Zod schemas
- XSS protection through React's built-in escaping
- Type-safe API calls preventing injection attacks

## 🎨 Design System

The app includes a comprehensive design system accessible at `/design-system`:

- **Colors**: Primary, success, error, and input colors
- **Typography**: Scale, weights, and font families
- **Components**: Reusable UI components built on Radix UI

## 🤝 Contributing

1. Follow the existing code style
2. Use TypeScript for all new files
3. Add proper error handling
4. Update documentation for new features
5. Test with the real backend API

## 📝 License

Private project - All rights reserved

## 🔗 Related Projects

- **Backend API**: `/Users/kamran/Work/NLabs/movie-be`

## 📞 Support

For issues or questions:
1. Check the documentation in `docs/`
2. Review backend API documentation
3. Enable debug mode and check console logs
4. Verify backend is running and accessible

## 🎉 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- State management with [TanStack Query](https://tanstack.com/query)

