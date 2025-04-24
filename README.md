# React 19 + Vite + Tailwind CSS + shadcn/UI Boilerplate

This boilerplate provides a robust starting point for building modern web applications using React 19, Vite, Tailwind CSS, shadcn/UI, and includes lazy loading for pages.

## Features

- **React 19**: Leverage the latest features of React for building dynamic user interfaces.
- **Vite**: Experience a fast development environment with Vite's lightning-fast bundling and hot module replacement.
- **Tailwind CSS**: Utilize a utility-first CSS framework for rapid UI development.
- **shadcn/UI**: Incorporate a collection of accessible and customizable UI components.
- **Lazy Loading**: Implement lazy loading for pages to optimize performance and reduce initial load time.
- **Sonner for Toast Notifications**: Provides simple and customizable toast notifications.
- **Lucide-React for Icons**: Integrates a powerful icon library for React.

## Live Demo

Explore the live demo of this boilerplate: [react19-vite-tailwindcss-shadcn.onrender.com](https://react19-vite-tailwindcss-shadcn.onrender.com)

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/rafaellacerda/react19-vite-tailwindcss-shadcn-boilerplate.git
   cd react19-vite-tailwindcss-shadcn-boilerplate
   ```

   or

   **Create the project**.

   ```bash
   pnpm dlx degit rafaellacerda/react19-vite-tailwindcss-shadcn-boilerplate my-app
   cd my-app
   ```

3. **Install Dependencies**:

   Ensure you have [pnpm](https://pnpm.io/) installed, then run:

   ```bash
   pnpm install
   ```

4. **Start the Development Server**:

   ```bash
   pnpm dev
   ```

   Access the application at `http://localhost:5173`.

## Lazy Loading of Pages

This boilerplate includes an implementation of lazy loading for pages using React's `React.lazy` and `Suspense` to load page components on demand, improving application performance.

### Example Usage:

```javascript
import React, { Suspense } from "react";
const LazyPage = React.lazy(() => import("./pages/LazyPage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyPage />
    </Suspense>
  );
}
```

## Project Structure

The project's structure is organized as follows:

```sh
└── react19-vite-tailwindcss-shadcn-boilerplate/
    ├── LICENSE
    ├── README.md
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── pnpm-lock.yaml
    ├── postcss.config.js
    ├── public
    │   ├── logo.svg
    │   └── robots.txt
    ├── src
    │   ├── assets
    │   ├── components
    │   ├── index.tsx
    │   ├── lib
    │   ├── pages
    │   ├── routes
    │   ├── styles
    │   └── vite-env.d.ts
    ├── tailwind.config.js
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── tsconfig.tsbuildinfo
    └── vite.config.ts
```

## Available Scripts

- **`pnpm dev`**: Runs the application in development mode.
- **`pnpm build`**: Builds the application for production.
- **`pnpm preview`**: Previews the production build locally.
- **`pnpm lint`**: Lints the codebase using ESLint.

## Dependencies

Key dependencies used in this project include:

- **React**: Library for building user interfaces.
- **Vite**: Next-generation frontend tooling.
- **Tailwind CSS**: Utility-first CSS framework.
- **shadcn/UI**: Accessible and customizable UI components.
- **Sonner**: For toast notifications.
- **Lucide-React**: For icons.

For a complete list, refer to the `package.json` file.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to enhance this boilerplate.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/rafaellacerda/react19-vite-tailwindcss-shadcn-boilerplate/blob/main/LICENSE) file for details.
