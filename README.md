# DocuLaw Insights Hub

A modern legal document management system with secure storage, retrieval, and management capabilities.

## Project Structure

```
docu-law-insights-hub/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── hooks/          # Custom React hooks
│   │   ├── contexts/       # React contexts
│   │   ├── types/          # TypeScript type definitions
│   │   ├── assets/         # Static assets
│   │   └── styles/         # Global styles
│   └── public/             # Public assets
│
├── backend/                 # Node.js Express backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── config/         # Configuration files
│   └── tests/              # Backend tests
│
└── infrastructure/         # Infrastructure as Code
    ├── docker/            # Docker configurations
    ├── kubernetes/        # Kubernetes manifests
    └── terraform/         # Terraform configurations
```

## Features

- Secure document storage and management
- User authentication and authorization
- Document version control
- Search functionality
- Audit logging
- Role-based access control
- Document encryption

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Docker (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/docu-law-insights-hub.git
cd docu-law-insights-hub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:3000/api

# Backend (.env)
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the development servers:
```bash
npm run dev
```

### Development

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Building for Production

```bash
npm run build
```

### Running in Production

```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/94bc4149-4bc6-4d19-b432-8c4a86b4b2ed

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/94bc4149-4bc6-4d19-b432-8c4a86b4b2ed) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/94bc4149-4bc6-4d19-b432-8c4a86b4b2ed) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## CI/CD Status

## CI/CD Status

[![Frontend CI](https://github.com/aditimahajan04/docu-law-insights-hub/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/aditimahajan04/docu-law-insights-hub/actions/workflows/frontend-ci.yml)

This project uses GitHub Actions for continuous integration. Every push to the main branch and pull request triggers:
- Dependency installation
- Linting check
- Build process
- Deployment to GitHub Pages