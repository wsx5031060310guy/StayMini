import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "PingFang TC",
          "Noto Sans TC",
          "Microsoft JhengHei",
          "sans-serif",
        ],
      },
      colors: {
        border: "hsl(30 20% 88%)",
        input: "hsl(30 20% 88%)",
        ring: "hsl(28 60% 45%)",
        background: "hsl(40 35% 98%)",
        foreground: "hsl(28 30% 15%)",
        primary: {
          DEFAULT: "hsl(28 60% 45%)",
          foreground: "hsl(40 35% 98%)",
        },
        secondary: {
          DEFAULT: "hsl(35 30% 92%)",
          foreground: "hsl(28 30% 18%)",
        },
        muted: {
          DEFAULT: "hsl(35 25% 94%)",
          foreground: "hsl(28 15% 40%)",
        },
        accent: {
          DEFAULT: "hsl(38 70% 90%)",
          foreground: "hsl(28 30% 18%)",
        },
        destructive: {
          DEFAULT: "hsl(0 70% 50%)",
          foreground: "hsl(40 35% 98%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(28 30% 15%)",
        },
        stone: {
          ink: "hsl(28 30% 15%)",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "calc(0.75rem - 2px)",
        sm: "calc(0.75rem - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
