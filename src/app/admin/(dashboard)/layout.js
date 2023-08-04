import AuthProvider from './../context/AuthProvider';
import DashboardLayout from './../components/DashboardLayout';

export default async function RootLayout({ children }) {
  return (
    <main className="flex min-h-screen flex-col">
      <AuthProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </AuthProvider>
    </main>
  );
}
