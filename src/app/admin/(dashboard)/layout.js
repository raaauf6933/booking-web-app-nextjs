import dynamic from 'next/dynamic'
const DashboardLayout = dynamic(() => import('./../components/DashboardLayout'), { ssr: false })

export default async function RootLayout({ children }) {
  return (
    <main className="flex min-h-screen flex-col">
      <DashboardLayout>{children}</DashboardLayout>
    </main>
  );
}
