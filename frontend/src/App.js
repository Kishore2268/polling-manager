import VoteForm from './components/VoteForm';
import VoteTable from './components/VoteTable';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import { useState } from 'react';

function App() {
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-black text-gray-900">
              Polling Station
            </h1>
            <div className="mt-2 h-1 w-24 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-gray-600">
              Cast your vote and watch the trends unfold
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-8">
            {/* Vote Form Section */}
            <section className="group relative border border-gray-200 rounded-2xl">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-0 group-hover:opacity-75"></div>
              <div className="relative">
                <VoteForm onSuccess={triggerRefresh} />
              </div>
            </section>

            {/* Vote Table Section */}
            <section className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-0 group-hover:opacity-75"></div>
              <div className="relative">
                <div className="bg-white shadow-xl rounded-2xl p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Votes</h2>
                  <VoteTable key={refresh} />
                </div>
              </div>
            </section>

            {/* Charts Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-0 group-hover:opacity-75"></div>
                <div className="relative">
                  <div className="bg-white shadow-xl rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Vote Trends</h2>
                    <LineChart key={refresh} />
                  </div>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-0 group-hover:opacity-75"></div>
                <div className="relative">
                  <div className="bg-white shadow-xl rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Overall Results</h2>
                    <BarChart key={refresh} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 shadow-2xl mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-purple-200 text-sm">
            © {new Date().getFullYear()} Polling Station. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
