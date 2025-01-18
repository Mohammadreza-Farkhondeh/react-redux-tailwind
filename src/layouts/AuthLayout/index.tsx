import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/navigation/footer';

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container relative flex min-h-[calc(100vh-8rem)] items-center justify-center">
          <div className="w-full max-w-md space-y-6">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
