import AdminSidebar from '@/components/admin/AdminSidebar';
import ToastNotification from '@/components/ui/ToastNotification';

type AdminLayoutProps = Readonly<{ children: React.ReactNode }>;

export default function AdminLayout({ children }: AdminLayoutProps) {
	return (
		<>
			<div className="md:flex">
				<aside className="md:w-72 md:h-screen bg-white">
					<AdminSidebar />
				</aside>

				<main className="md:flex-1 md:h-screen md:overflow-y-scroll bg-gray-100 p-5">
					{children}
				</main>
			</div>

			<ToastNotification />
		</>
	);
}
