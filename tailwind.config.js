// import defaultTheme from 'tailwindcss/defaultTheme';
// import forms from '@tailwindcss/forms';

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
//     './storage/framework/views/*.php',
//     './resources/views/**/*.blade.php',
//     './resources/js/**/*.jsx',
//   ],

//   theme: {
//     extend: {
//       fontFamily: {
//         sans: ['Figtree', ...defaultTheme.fontFamily.sans],
//       },

//       boxShadow: {
//         'custom': '0px 0px 20px -10px rgba(0, 0, 0, 0.3)',
//       },
//     theme: {
//         extend: {
//             fontFamily: {
//                 sans: ['Figtree', ...defaultTheme.fontFamily.sans],
//             },
//             boxShadow: {
//                 custom: '0px 0px 20px -10px rgba(0, 0, 0, 0.3)',
//             },
//         },
//     },
//   },

//     plugins: [
//         forms,
//         require('@tailwindcss/aspect-ratio'),
//     ],
// }
// };

import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    safelist: [
        {
            pattern:
                /bg-(red|blue|green|yellow|indigo|purple|pink|amber|emerald|lime|teal|cyan)-(50|100|200|300|400|500|600|700|800|900)/,
            variants: ["hover", "focus"], // Optionally add variants like 'hover', 'focus'
        },
    ],
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            colors: {
                primary: {
                    50: "var(--theme-color-50)",
                    100: "var(--theme-color-100)",
                    200: "var(--theme-color-200)",
                    300: "var(--theme-color-300)",
                    400: "var(--theme-color-400)",
                    500: "var(--theme-color-500)",
                    600: "var(--theme-color-600)",
                    700: "var(--theme-color-700)",
                    800: "var(--theme-color-800)",
                    900: "var(--theme-color-900)",
                },
            },

            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },

            boxShadow: {
                custom: "0px 0px 20px -10px rgba(0, 0, 0, 0.3)",
            },

            dropShadow: {
                custom: "2px 2px 4px rgba(0, 0, 0, 0.5);",
            },

            width: {
                comment: "600px",
            },

            gridTemplateColumns: {
                layout: "1fr 3fr 1fr", // Custom grid template for layout
            },
        },
    },

    plugins: [forms, require("@tailwindcss/aspect-ratio")],
};
