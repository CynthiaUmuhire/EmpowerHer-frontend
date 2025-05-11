import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Links from "./routes/Links"
import { Toaster } from "sonner"
import ErrorBoundary from "./components/errorBoundary/errorBoundary"
import Landing from "./pages/landingPage"
import MainLayout from "./layout/mainLayout"
import UnprotectedLayout from "./layout/unProtectedLayout"
import LoginAndSignUp from "./pages/loginAndSignUp"

const Home = lazy(() => import('./pages/home'))
const NotFound = lazy(() => import('./pages/notFound'))

export default function App() {
  const routes = createBrowserRouter([
    {
      path: Links.Home,
      element: <MainLayout />,
      children: [
        {
          path: Links.Home,
          element: <Home />,
        },
        {
          path: Links.NotFound,
          element: <NotFound />,
        },
        {
          path: Links.Landing,
          element: <Landing />
        }
      ]
    },
    {
      path: Links.app,
      element: <UnprotectedLayout />,
      children: [
        {
          path: Links.Login,
          element: <LoginAndSignUp />
        },
        {
          path: Links.Register,
          element: <LoginAndSignUp />
        }
      ]
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