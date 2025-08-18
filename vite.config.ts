import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/TEX-NEXT-Edit/",
	server: {
		port: 2000,
	},
});
