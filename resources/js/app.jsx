import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { PrimeReactProvider } from "primereact/api";

// const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const appName = import.meta.env.VITE_APP_NAME;

createInertiaApp({
    // title: (title) => `${title} - ${appName}`,

    title: () => `${appName}`,

    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),

    async setup({ el, App, props }) {
        const root = createRoot(el);
        const selectedTheme = await localStorage.getItem("theme");
        document.documentElement.classList.add(selectedTheme);
        root.render(
            <PrimeReactProvider>
                <App {...props} />
            </PrimeReactProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
