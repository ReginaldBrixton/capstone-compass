export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Users</h2>
          <p>Total Users: 100</p>
          <p>New Users (last 30 days): 25</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Orders</h2>
          <p>Total Orders: 500</p>
          <p>Pending Orders: 10</p>
        </div>
      </div>
    </div>
  );
}
