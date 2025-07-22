# EmpowerHer

EmpowerHer-frontend is a React web application that brings together support groups registered on the platform and facilitates the registration and participation of adolescent mothers in various support group activities.

---

## Table of Contents

- [EmpowerHer](#empowerher)
  - [Table of Contents](#table-of-contents)
  - [Demo Video](#demo-video)
  - [Live Demo / Download](#live-demo--download)
  - [Installation \& Running the App](#installation--running-the-app)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Project Structure \& Related Files](#project-structure--related-files)
  - [Figma Designs](#figma-designs)
  - [Use Case Diagram](#use-case-diagram)
  - [Deployment Plan](#deployment-plan)
  - [Backend Repository](#backend-repository)

---

## Demo Video

[![Watch the Demo](https://img.youtube.com/vi/your-demo-video-id/0.jpg)](https://www.youtube.com/watch?v=your-demo-video-id)

> **Note:** The demo focuses on the core functionalities:  
> - Browsing and searching support groups  
> - Viewing group details and events  
> - Registering for activities  
> - Viewing success stories  
> - District-based group distribution  
> - User profile and group participation overview  
> (Sign-up and sign-in are not the main focus.)

---

## Live Demo / Download

- **Live App:** [empower-her-frontend-omega.vercel.app
](empower-her-frontend-omega.vercel.app
)  
 

- **Backend Repo:** [EmpowerHer-Backend](https://github.com/CynthiaUmuhire/EmpowerHer-Backend.git)


---

## Installation & Running the App

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/)

### Steps

1. **Clone the repository:**
   ```sh
   git clone https://github.com/CynthiaUmuhire/EmpowerHer-frontend.git
   cd EmpowerHer-frontend
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values.

3. **Install dependencies:**
   ```sh
   pnpm install
   ```

4. **Run the development server:**
   ```sh
   pnpm dev
   ```
   - The app will be available at [http://localhost:5173/](http://localhost:5173/)

5. **(Optional) Run tests:**
   ```sh
   pnpm test
   ```

---

## Project Structure & Related Files

```
EmpowerHer-frontend/
├── src/
│   ├── api/                # API calls and services
│   ├── components/         # Reusable UI components
│   ├── pages/              # Main screens (Dashboard, Groups, Profile, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Helper functions
│   ├── styles/             # CSS and Tailwind config
│   ├── assets/             # Images and static files
│   └── ...                 # Other app files
├── tests/                  # Unit  tests
├── public/                 # Static public files
├── .env.example            # Example environment variables
├── package.json            # Project metadata and scripts
├── README.md               # This file
└── ...
```

---

## Figma Designs

![Figma Screenshot](<Screenshot 2025-06-07 at 00.22.50.png>)

---

## Use Case Diagram

![Use Case Diagram](image.png)

---

## Deployment Plan


1. **Version Control:** GitHub for tracking code changes.
2. **Hosting:** Vercel for fast and reliable deployment.
3. **CI/CD:** Github action 
 
---

## Backend Repository

- [EmpowerHer-Backend](https://github.com/CynthiaUmuhire/EmpowerHer-Backend.git)

---


