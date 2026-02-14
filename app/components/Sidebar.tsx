"use client";

import Link from "next/link";
import { useState, ReactNode, createContext, useContext } from "react";

// Context to share sidebar open state (for future extensibility)
export const SidebarContext = createContext<{ open: boolean; setOpen: (v: boolean) => void }>({ open: false, setOpen: () => {} });

export function SidebarProvider({ children }: { children: ReactNode }) {
	// For future extensibility, currently just renders children
	return <>{children}</>;
}

export function Sidebar() {
	const [open, setOpen] = useState(false);
	const [product, setProduct] = useState(false);
	const [books, setBooks] = useState(false);
	const [electronics, setElectronics] = useState(false);
	const [furniture, setFurniture] = useState(false);

	const book = [
		{ name: "History Books", path: "/Books/HistoryBooks" },
		{ name: "Science Books", path: "/Books/ScienceBooks" },
	];

	const furnitureList = [
		{ name: "Seating Furniture", path: "/Products/Furniture/SeatingFurniture" },
		{ name: "Sleeping Furniture", path: "/Products/Furniture/SleepingFurniture" },
	];

	return (
		<div className="flex">
			{/* 🔹 Mobile Button (vertically centered left) */}
			<button
				onClick={() => setOpen(!open)}
				className="md:hidden fixed top-1/2 left-3 z-50 bg-gray-900 text-white p-2 rounded -translate-y-1/2 shadow-lg"
				aria-label="Open sidebar menu"
			>
				☰
			</button>

			{/* 🔹 Overlay */}
			{open && (
				<div
					onClick={() => setOpen(false)}
					className="fixed inset-0 bg-black/50 md:hidden"
				></div>
			)}

			{/* 🔹 Sidebar */}
			<aside
				className={`
		fixed md:fixed
		top-14 md:top-0 left-0
		w-64 h-[calc(100vh-56px)] md:h-screen
		bg-gray-900 text-white p-5 z-50
		transform transition-transform duration-300
		${open ? "translate-x-0" : "-translate-x-full"}
		md:translate-x-0
	`}
			>
				<h2 className="text-xl font-bold mb-6">Menu</h2>
				<nav className="flex flex-col gap-3">
					{/* Home */}
					<Link href="/" className="hover:text-blue-400">
						Home
					</Link>
					{/* Products */}
					<button
						onClick={() => {
							setProduct(!product);
							setBooks(false);
						}}
						className="text-left hover:text-blue-400"
					>
						Products ▼
					</button>
					{product && (
						<div className="ml-4 flex flex-col gap-2">
							{/* Electronics */}
							<button
								onClick={() => {
									setElectronics(!electronics);
									setFurniture(false);
								}}
								className="text-left hover:text-blue-400"
							>
								Electronics
							</button>
							{electronics && (
								<div className="ml-4 flex flex-col gap-2">
									<Link href="/Products/Electronics/Mobile">Mobiles</Link>
									<Link href="/Products/Electronics/TV">TVs</Link>
								</div>
							)}
							{/* Furniture */}
							<button
								onClick={() => {
									setFurniture(!furniture);
									setElectronics(false);
								}}
								className="text-left hover:text-blue-400"
							>
								Furniture
							</button>
							{furniture && (
								<div className="ml-4 flex flex-col gap-2">
									{furnitureList.map((item, index) => (
										<Link key={index} href={item.path}>
											{item.name}
										</Link>
									))}
								</div>
							)}
						</div>
					)}
					{/* Books */}
					<button
						onClick={() => {
							setBooks(!books);
							setProduct(false);
						}}
						className="text-left hover:text-blue-400"
					>
						Books ▼
					</button>
					{books && (
						<div className="ml-4 flex flex-col gap-2">
							{book.map((item, index) => (
								<Link key={index} href={item.path}>
									{item.name}
								</Link>
							))}
						</div>
					)}
				</nav>
			</aside>
		</div>
	);
}
