// "use client";

// import Link from "next/link";
// import { useState } from "react";

// export default function Sidebar() {
//   const [product, setProduct] = useState(false);
//   const [books, setBooks] = useState(false);
//   const[electronics,setelectronics]=useState(false);
//   const[furniture,setfurniture]=useState(false);
//   const book=[
//     { name:"History Books",path:"/Books/HistoryBooks"},
//     { name:"Science Books",path:"/Books/ScienceBooks"}
//   ]
//   const furnitureList=[
//     {name:"Seating Furniture",path:"/Products/Furniture/SeatingFurniture"},
//     {name:"Sleeping Furniture",path:"/Products/Furniture/SleepingFurniture"}
//   ]
//   return (
//   <aside className="
//   fixed md:sticky
//   top-0 left-0
//   w-64 h-screen
//   bg-gray-900 text-white p-5
//   transform -translate-x-full md:translate-x-0
//   transition-transform duration-300
// ">

//       <h2 className="text-xl font-bold mb-6">Menu</h2>
//       <nav className="flex flex-col gap-3">
//         <Link href="/" className="hover:text-blue-400">
//           Home
//         </Link>
//         <Link href="/Products"
//           onClick={() => setProduct(!product)}
//           className="hover:text-blue-400 text-left"
//         >
//           Products
//         </Link>
//         {product && (
//           <div className="ml-4 flex flex-col gap-2">
//             <Link href="/Products/Electronics" className="hover:text-blue-400" onClick={()=>setelectronics(!electronics)}>
//               Electronics
//             </Link>
//             {electronics && (
//               <div className="ml-4 flex flex-col gap-2">
//                 <Link href="/Products/Electronics/Mobile">Mobiles</Link>
//                 <Link href="/Products/Electronics/TV">TVs</Link>
//               </div>
//             )
//             }
//             <Link href="/Products/Furniture" className="hover:text-blue-400" onClick={()=>setfurniture(!furniture)}>
//               Furniture
//             </Link>
//             {furniture && (
//               <div className="ml-4 flex flex-col gap-2">
//                 {/* <Link href="/Products/Furniture/SeatingFurniture">Seating Furniture</Link>
//                 <Link href="/Products/Furniture/SleepingFurniture">Sleeping Furniture</Link> */}
//                 {furnitureList.map((furniture,index)=>(
//                     <Link key={index} href={furniture.path}>{furniture.name}</Link>
//                 ))}
//               </div>
//             )}
//             </div>
//         )}
//         <Link href="/Books"
//           onClick={() => setBooks(!books)}
//           className="hover:text-blue-400 text-left"
//         >
//           Books
//         </Link>

//         {/* {books && (
//           <div className="ml-4 flex flex-col gap-2">
//             <Link href="/Books/HistoryBooks">History Books</Link>
//             <Link href="/Books/ScienceBooks">Science Books</Link>
//           </div>
//         )} */}
//         {books&&(
//             <div className="ml-4 flex flex-col gap-2">
//                 {book.map((books,index)=>(
//                     <Link key={index} href={books.path}>{books.name}</Link>
//                 ))}
//             </div>
//         )
//         }
//       </nav>
//     </aside>
//   );
// }

// 2

"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const [books, setBooks] = useState(false);
  const [electronics, setElectronics] = useState(false);
  const [furniture, setFurniture] = useState(false);

  return (
    <div className="flex">
      
      {/* 🔹 Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded"
      >
        ☰
      </button>

      {/* 🔹 Overlay (Mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden"
        ></div>
      )}

      {/* 🔹 Sidebar */}
      <aside
        className={`
        fixed md:sticky top-0 left-0 z-50
        w-64 h-screen bg-gray-900 text-white p-5
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        `}
      >
        <h1 className="text-xl font-bold mb-5">Menu</h1>

        {/* 🔹 Home */}
        <Link href="/" className="block py-2 hover:text-gray-400">
          Home
        </Link>

        {/* 🔹 Books */}
        <button
          onClick={() => setBooks(!books)}
          className="w-full text-left py-2 hover:text-gray-400"
        >
          Books ▼
        </button>

        {books && (
          <div className="ml-4 flex flex-col gap-1">
            <Link href="/books/history" className="hover:text-gray-400">
              History
            </Link>
            <Link href="/books/science" className="hover:text-gray-400">
              Science
            </Link>
          </div>
        )}

        {/* 🔹 Electronics */}
        <button
          onClick={() => setElectronics(!electronics)}
          className="w-full text-left py-2 hover:text-gray-400"
        >
          Electronics ▼
        </button>

        {electronics && (
          <div className="ml-4 flex flex-col gap-1">
            <Link href="/electronics/mobile" className="hover:text-gray-400">
              Mobile
            </Link>
            <Link href="/electronics/laptop" className="hover:text-gray-400">
              Laptop
            </Link>
          </div>
        )}

        {/* 🔹 Furniture */}
        <button
          onClick={() => setFurniture(!furniture)}
          className="w-full text-left py-2 hover:text-gray-400"
        >
          Furniture ▼
        </button>

        {furniture && (
          <div className="ml-4 flex flex-col gap-1">
            <Link href="/furniture/chair" className="hover:text-gray-400">
              Chair
            </Link>
            <Link href="/furniture/table" className="hover:text-gray-400">
              Table
            </Link>
          </div>
        )}
      </aside>

      {/* 🔹 Main Content */}
      <main className="flex-1 p-6 md:ml-0">
        <h1 className="text-2xl font-bold">Main Content</h1>
      </main>

    </div>
  );
}
