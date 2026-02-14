import "./globals.css";
import Sidebar from "./components/Sidebar";
import type{ Metadata } from "next";
export const metadata: Metadata = {
  title: "Sales Company",
  description: "Sales and Marketing Company",
};
export default function RootLayout({  children,}: { children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1 className="text-xl font-bold">Sales Company</h1>
        </header>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
// import "./globals.css";
// import Sidebar from "./components/Sidebar";
// import type { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Sales Company",
//   description: "Sales and Marketing Company",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-100">
        
//         {/* Header */}
//         <header className="bg-gray-800 text-white p-4 flex items-center justify-center md:justify-start md:pl-72">
//           <h1 className="text-xl font-bold">Sales Company</h1>
//         </header>

//         {/* Layout */}
//         <div className="flex min-h-screen">
          
//           {/* Sidebar */}
//           <Sidebar />

//           {/* Main Content */}
//           <main className="flex-1 p-6 mt-4 md:ml-64">
//             {children}
//           </main>

//         </div>
//       </body>
//     </html>
//   );
// }
