import { PrivateRoute } from "./PrivateRoute.tsx";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { CartPage, ErrorInvalidTokenPage, HomePage, LoginPage, ProductInfoPage, RecoveryPassPage, RegisterPage, RestorePassPage, TableSectionsVisitedPage } from "../pages";
import { getProductsAPI, getProductsByIdAPI, getProductsBySectionAPI } from "../API";
import { GridCardsProduct } from "../components"


export const router = createBrowserRouter([
    {
        path: '/',
        loader: async () => {
            const products = await getProductsAPI()
            return products
        },
        element: <PrivateRoute>
            <HomePage />
        </PrivateRoute>,
        children: [
            {
                index: true,
                element: <GridCardsProduct />,
                loader: async () => {
                    const products = await getProductsAPI()
                    return {
                        products,
                        idSection: ``
                    }
                }
            },
            {
                path: 'products/:section',
                element: <GridCardsProduct />,
                loader: async ({ params }) => {
                    const { section } = params as { section: string }
                    const products = await getProductsBySectionAPI({ nameSection: section })

                    const idSection = products[0].section.id
                    return {
                        products,
                        idSection
                    }
                },

            },
            {
                path: `products/*`,
                element: <Navigate to={`/`} />
            }
        ]

    },
    {
        path: `/product/:id`,
        loader: async ({ params }) => {
            const { id } = params as { id: string }
            const product = await getProductsByIdAPI({ id })
            return product
        },
        element: <PrivateRoute>
            <ProductInfoPage />
        </PrivateRoute>
    },
    {
        path: '/auth/*',
        element: <LoginPage />
    },
    {
        path: '/auth/login',
        element: <LoginPage />
    },
    {
        path: '/auth/register',
        element: <RegisterPage />
    },
    {
        path: '/auth/recovery-password',
        element: <RecoveryPassPage />
    },
    {
        path: '/auth/restore-password',
        element: <RestorePassPage />
    },
    {
        path: '/auth/error-invalid-token',
        element: <ErrorInvalidTokenPage />
    },

    {
        path: `/cart`,
        element: <PrivateRoute>
            <CartPage />
        </PrivateRoute>
    },
    {
        path: '/sections-visited',
        element: <PrivateRoute>
            <TableSectionsVisitedPage />
        </PrivateRoute>
    }

])