import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-screen h-screen flex gap-10 justify-center items-center">
        <Link href={'/play'} className="hover:underline text-sky-700">
          PLAY
        </Link>
        <Link href={'/crates'} className="hover:underline text-sky-700">
          CRATES
        </Link>
      </main>
    </>
  );
}
