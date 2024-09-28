"use client";

import Link from 'next/link';
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex space-x-4">
        <Link href="/" className="hover:underline">Home</Link>
        {isSignedIn && (
            <>
          <Link href="/chat" className="hover:underline">Chat</Link>
          <Link href="/chat2" className="hover:underline">Chat2</Link>
          </>

        )}
      </div>
      <div className="flex items-center space-x-4">
        {isSignedIn ? (
          <>
            <span>Welcome, {user?.firstName || 'User'}!</span>
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <SignInButton mode="modal">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
}