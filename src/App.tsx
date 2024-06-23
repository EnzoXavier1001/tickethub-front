import './css/tailwind.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

import { GlobalStyles } from './css/globalStyles'

export const App = () => {
    return (
        <>
            <RouterProvider router={router} />
            <GlobalStyles />
        </>
    )
}