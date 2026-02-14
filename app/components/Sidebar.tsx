"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [product, setProduct] = useState(false);
  const [books, setBooks] = useState(false);
  const[electronics,setelectronics]=useState(false);
  const[furniture,setfurniture]=useState(false);
  const book=[
    { name:"History Books",path:"/Books/HistoryBooks"},
    { name:"Science Books",path:"/Books/ScienceBooks"}
  ]
  const furnitureList=[
    {name:"Seating Furniture",path:"/Products/Furniture/SeatingFurniture"},
    {name:"Sleeping Furniture",path:"/Products/Furniture/SleepingFurniture"}
  ]
  return (
  <aside className="
  fixed md:sticky
  top-0 left-0
  w-64 h-screen
  bg-gray-900 text-white p-5
  transform -translate-x-full md:translate-x-0
  transition-transform duration-300
">

      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <nav className="flex flex-col gap-3">
        <Link href="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link href="/Products"
          onClick={() => setProduct(!product)}
          className="hover:text-blue-400 text-left"
        >
          Products
        </Link>
        {product && (
          <div className="ml-4 flex flex-col gap-2">
            <Link href="/Products/Electronics" className="hover:text-blue-400" onClick={()=>setelectronics(!electronics)}>
              Electronics
            </Link>
            {electronics && (
              <div className="ml-4 flex flex-col gap-2">
                <Link href="/Products/Electronics/Mobile">Mobiles</Link>
                <Link href="/Products/Electronics/TV">TVs</Link>
              </div>
            )
            }
            <Link href="/Products/Furniture" className="hover:text-blue-400" onClick={()=>setfurniture(!furniture)}>
              Furniture
            </Link>
            {furniture && (
              <div className="ml-4 flex flex-col gap-2">
                {/* <Link href="/Products/Furniture/SeatingFurniture">Seating Furniture</Link>
                <Link href="/Products/Furniture/SleepingFurniture">Sleeping Furniture</Link> */}
                {furnitureList.map((furniture,index)=>(
                    <Link key={index} href={furniture.path}>{furniture.name}</Link>
                ))}
              </div>
            )}
            </div>
        )}
        <Link href="/Books"
          onClick={() => setBooks(!books)}
          className="hover:text-blue-400 text-left"
        >
          Books
        </Link>

        {/* {books && (
          <div className="ml-4 flex flex-col gap-2">
            <Link href="/Books/HistoryBooks">History Books</Link>
            <Link href="/Books/ScienceBooks">Science Books</Link>
          </div>
        )} */}
        {books&&(
            <div className="ml-4 flex flex-col gap-2">
                {book.map((books,index)=>(
                    <Link key={index} href={books.path}>{books.name}</Link>
                ))}
            </div>
        )
        }
      </nav>
    </aside>
  );
}
// "use client";

// import Link from "next/link";
// import { useState } from "react";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const [product, setProduct] = useState(false);
//   const [books, setBooks] = useState(false);
//   const [electronics, setelectronics] = useState(false);
//   const [furniture, setfurniture] = useState(false);

//   const book = [
//     { name: "History Books", path: "/Books/HistoryBooks" },
//     { name: "Science Books", path: "/Books/ScienceBooks" }
//   ];

//   const furnitureList = [
//     { name: "Seating Furniture", path: "/Products/Furniture/SeatingFurniture" },
//     { name: "Sleeping Furniture", path: "/Products/Furniture/SleepingFurniture" }
//   ];

//   return (
//     <>
//       {/* Menu Button */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded"
//         onClick={() => setIsOpen(true)}
//       >
//         ☰
//       </button>

//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed md:static top-0 left-0 h-screen w-64 bg-gray-900 text-white p-5 transform transition-transform duration-300 z-40
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
//       >
//         {/* Close Button */}
//         <button
//           className="md:hidden mb-4 text-right w-full"
//           onClick={() => setIsOpen(false)}
//         >
//           ❌
//         </button>

//         <h2 className="text-xl font-bold mb-6">Menu</h2>

//         <nav className="flex flex-col gap-3">
//           <Link href="/">Home</Link>

//           {/* Products */}
//           <Link href="/Products" onClick={() => setProduct(!product)}>
//             Products
//           </Link>

//           {product && (
//             <div className="ml-4 flex flex-col gap-2">
//               <Link
//                 href="/Products/Electronics"
//                 onClick={() => setelectronics(!electronics)}
//               >
//                 Electronics
//               </Link>

//               {electronics && (
//                 <div className="ml-4 flex flex-col gap-2">
//                   <Link href="/Products/Electronics/Mobile">Mobiles</Link>
//                   <Link href="/Products/Electronics/TV">TVs</Link>
//                 </div>
//               )}

//               <Link
//                 href="/Products/Furniture"
//                 onClick={() => setfurniture(!furniture)}
//               >
//                 Furniture
//               </Link>

//               {furniture && (
//                 <div className="ml-4 flex flex-col gap-2">
//                   {furnitureList.map((item, index) => (
//                     <Link key={index} href={item.path}>
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Books */}
//           <Link href="/Books" onClick={() => setBooks(!books)}>
//             Books
//           </Link>

//           {books && (
//             <div className="ml-4 flex flex-col gap-2">
//               {book.map((item, index) => (
//                 <Link key={index} href={item.path}>
//                   {item.name}
//                 </Link>
//               ))}
//             </div>
//           )}
//         </nav>
//       </aside>
//     </>
//   );
// }
