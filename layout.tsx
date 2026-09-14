import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title:"Nasrin A — Python Developer & Software Engineer", description:"Portfolio of Nasrin A — Python, backend, data engineering, AI/ML and IoT projects." };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
