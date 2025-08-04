'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>WELCOME</h1>
      <div>
          <Link href="/reservation">Make a reservation</Link>
      </div>
    </>
  );
}
