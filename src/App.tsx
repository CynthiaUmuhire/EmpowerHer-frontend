import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Links from "./routes/Links"
import { Toaster } from "sonner"
import ErrorBoundary from "./components/errorBoundary/errorBoundary"
import Landing from "./pages/landingPage"
import MainLayout from "./layout/mainLayout"
import LoginAndSignUp from "./pages/loginAndSignUp"
import AuthLayout from "./layout/authLayout"
import UnprotectedLayout from "./layout/unprotectedLayout"
import NotFound from "./pages/notFound"
import Groups from "./pages/groups"

const Home = lazy(() => import('./pages/home'))

export default function App() {
  const routes = createBrowserRouter([
    {
      path: Links.protected.Home,
      element: <MainLayout />,
      children: [
        {
          path: Links.protected.Home,
          element: <Home />,
        },
        {
          path: Links.protected.Groups,
          element: <Groups />
        }
      ],
      errorElement: <NotFound />
    },
    {
      path: Links.public.Landing,
      element: <UnprotectedLayout />,
      children: [
        {
          path: Links.public.Landing,
          element: <Landing />
        }
      ],
      errorElement: <NotFound />
    },
    {
      path: Links.auth.auth,
      element: <AuthLayout />,
      children: [
        {
          path: Links.auth.Login,
          element: <LoginAndSignUp />
        },
        {
          path: Links.auth.Register,
          element: <LoginAndSignUp />
        }
      ],
      errorElement: <NotFound />
    }
  ])
  return (

    <ErrorBoundary>
      <Suspense fallback={<>Loading...</>}>
        <RouterProvider router={routes} />
      </Suspense>
      <Toaster richColors />
    </ErrorBoundary>

  )
}