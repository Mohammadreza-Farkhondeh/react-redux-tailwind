import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
<div className="relative min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
  <main className="flex-1">
    <div className="container relative flex min-h-[calc(100vh-8rem)] items-center justify-center mx-auto">
      <div className="w-full max-w-md space-y-6 bg-white dark:bg-slate-950">
        <Outlet />
      </div>
    </div>
  </main>
</div>
  );
}
