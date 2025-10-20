import { useEffect, useState } from "react";

export default function Home() {
  const [apiStatus, setApiStatus] = useState<string>("Loading...");

  useEffect(() => {
    // Test API connection
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test`)
      .then((res) => res.json())
      .then((data) => {
        setApiStatus(`✅ Backend Connected: ${data.message}`);
      })
      .catch((err) => {
        setApiStatus(`❌ Backend Error: ${err.message}`);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-amber-900 mb-4">
            🍰 Bakery E-Commerce
          </h1>
          <p className="text-xl text-amber-800 mb-8">
            v2.0 - Next.js + Express.js + Stripe
          </p>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Frontend Status */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                ✅ Frontend
              </h2>
              <p className="text-gray-700">
                Next.js is running on port 3000
              </p>
              <p className="text-sm text-gray-500 mt-2">React 18 + TailwindCSS</p>
            </div>

            {/* Backend Status */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-2">Backend</h2>
              <p className="text-gray-700">{apiStatus}</p>
              <p className="text-sm text-gray-500 mt-2">Express.js + PostgreSQL</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-amber-900 mb-6">
              🚀 Getting Started
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/products"
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
              >
                🛍️ Browse Products
              </a>
              <a
                href="/admin"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                ⚙️ Admin Panel
              </a>
              <a
                href="/auth/login"
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
              >
                🔐 Login
              </a>
            </div>
          </div>

          {/* Dev Info */}
          <div className="mt-12 text-gray-600">
            <p className="text-sm mb-2">
              📚 Documentation: Check DEVELOPER_TASK_ASSIGNMENTS_v2.md
            </p>
            <p className="text-sm mb-2">
              🔗 GitHub: https://github.com/dungzum22/PRN232-FinalProject
            </p>
            <p className="text-sm">
              💬 Agents: @dev-lead-v2, @dev-backend-payments-v2,
              @dev-backend-services-v2, @dev-frontend-v2, @dev-devops-qa-v2
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
