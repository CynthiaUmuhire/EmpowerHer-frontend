import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Links from "./routes/Links"
import { Toaster } from "sonner"
import ErrorBoundary from "./components/errorBoundary/errorBoundary"
import Landing from "./pages/landing/landingPage"
import MainLayout from "./layout/mainLayout"

const Home = lazy(() => import('./pages/home/home'))
const NotFound = lazy(() => import('./pages/notFound/notFound'))

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
    }
  ])
  return (

    <ErrorBoundary>
      <Suspense fallback={<>Carregando...</>}>
        <RouterProvider router={routes} />
      </Suspense>
      <Toaster richColors />
    </ErrorBoundary>

  )
}