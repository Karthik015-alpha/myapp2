import "./globals.css";
import { Sidebar, SidebarProvider } from "./components/Sidebar";
import { ReactNode, useContext } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className="bg-black text-white">
                 <header className="bg-gray-800 text-white p-4 flex items-center justify-center md:justify-start md:pl-72">
          <h1 className="text-xl font-bold">Sales Company</h1>
         </header>
				<SidebarProvider>
					<div className="flex">
						<Sidebar />
						<SidebarContent>{children}</SidebarContent>
					</div>
				</SidebarProvider>
			</body>
		</html>
	);
}

// Responsive main content that shifts when sidebar is open (for future extensibility)
function SidebarContent({ children }: { children: ReactNode }) {
	// If you later add SidebarContext logic, you can use it here for shifting
	return (
		<div className="flex flex-col flex-1 md:ml-64 transition-all duration-300">
			<main className="p-6 mt-14 md:mt-0">{children}</main>
		</div>
	);
}
