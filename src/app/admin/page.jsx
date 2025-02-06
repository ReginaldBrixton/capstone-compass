export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8" data-oid="nvg_:k1">
      <h1 className="mb-4 text-3xl font-bold" data-oid="8lyb5mo">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2" data-oid="5z9me7w">
        <div className="rounded-lg bg-white p-6 shadow" data-oid="v9q8aco">
          <h2 className="mb-4 text-xl font-semibold" data-oid="uykx8-r">
            Users
          </h2>
          <p data-oid="x_cp7z1">Total Users: 100</p>
          <p data-oid="nm:2cv4">New Users (last 30 days): 25</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow" data-oid="hs-n3s-">
          <h2 className="mb-4 text-xl font-semibold" data-oid="9ayya3p">
            Orders
          </h2>
          <p data-oid="m2lsog2">Total Orders: 500</p>
          <p data-oid="bx4.jrn">Pending Orders: 10</p>
        </div>
      </div>
    </div>
  );
}
