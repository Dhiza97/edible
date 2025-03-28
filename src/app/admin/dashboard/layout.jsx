import Sidebar from "@/src/components/Sidebar";
import AdminNavbar from "@/src/components/AdminNavbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <AdminNavbar />
      <hr />
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1 p-4 ml-[18%] mt-[60px]">{children}</div>
      </div>
    </>
  );
}
