"use client";

import Link from 'next/link';
import Image from "next/image";
import { useQuery } from '@apollo/client';


export default function Home() {

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center py-12">Library</h1>
        <h2 className="text-3xl font-bold text-gray-900 text-center py-12 mt-2 text-gray-600"> Discover and manage your favorite books </h2>
      </div>

      <div className="items-center justify-items-center min-h-screen p-8 pb-2 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[1px] row-start-2 items-center sm:items-start">
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <div>
              <Link
                href={`/books`}
                className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                View Books
              </Link>
            </div>
            <div>
              <Link
                href={`/authors`}
                className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                View Authors
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

