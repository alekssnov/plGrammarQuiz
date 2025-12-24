import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../shared/ui/AppLayout";
import { CatalogPage } from "../pages/CatalogPage/CatalogPage";
import { TestIntroPage } from "../pages/TestIntroPage/TestIntroPage";
import { TestRunnerPage } from "../pages/TestRunnerPage/TestRunnerPage";
import { ResultsPage } from "../pages/ResultsPage/ResultsPage";
import { SettingsPage } from "../pages/SettingsPage/SettingsPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            { path: "/", element: <CatalogPage /> },
            { path: "/t/:testId", element: <TestIntroPage /> },
            { path: "/t/:testId/run", element: <TestRunnerPage /> },
            { path: "/t/:testId/results", element: <ResultsPage /> },
            { path: "/settings", element: <SettingsPage /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);
