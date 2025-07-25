import { Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Links from "./routes/Links"
import ErrorBoundary from "./components/errorBoundary/errorBoundary"
import Landing from "./pages/landingPage"
import MainLayout from "./layout/mainLayout"
import LoginAndSignUp from "./pages/loginAndSignUp"
import AuthLayout from "./layout/authLayout"
import UnprotectedLayout from "./layout/unprotectedLayout"
import NotFound from "./pages/notFound"
import Groups from "./pages/groups"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "./api/queryClient"
import Profile from "./pages/profile"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Home from "./pages/home"
import GroupDetails from "./pages/groupDetails"
import Events from "./pages/events"
import { Toaster } from "./components/ui/sonner"
import Dashboard from "./pages/dashboard"
import DashboardLogin from "./pages/dashboardLogin"
import { MapProvider } from "@vis.gl/react-maplibre"

export default function App() {
  const routes = createBrowserRouter([
    {
      path: Links.protected.Home,
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: Links.protected.Groups,
          element: <Groups />,

        },
        {
          path: `${Links.protected.Groups}/:groupId`,
          element: <GroupDetails />
        },
        {
          path: Links.protected.Profile,
          element: <Profile />
        },
        {
          path: Links.protected.Events,
          element: <Events />
        },
        {
          path: Links.protected.Dashboard,
          element: <Dashboard />
        }
      ],
      errorElement: <NotFound />
    },
    {
      path: Links.public.Landing,
      element: <UnprotectedLayout />,
      children: [
        {
          index: true,
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
        },
        {
          path: Links.auth.analytics,
          element: <DashboardLogin />
        }
      ],
      errorElement: <NotFound />
    }
  ])
  return (
    <ErrorBoundary>
      <Suspense fallback={<>Loading...</>}>
        <QueryClientProvider client={queryClient}>
          <MapProvider>
            <RouterProvider router={routes} />
            <Toaster richColors />
            <ReactQueryDevtools initialIsOpen={false} />
          </MapProvider>
        </QueryClientProvider>
      </Suspense>

    </ErrorBoundary>

  )
}