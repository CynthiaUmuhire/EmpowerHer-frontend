import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"

const Home = lazy(() => import('../pages/home/home'))
const NotFound = lazy(() => import('../pages/notFound/notFound'))

export default function AppRoutes() {
    return (
        <Suspense fallback={<>Carregando...</>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/404" element={<NotFound />} />
            </Routes>
        </Suspense>
    )
}