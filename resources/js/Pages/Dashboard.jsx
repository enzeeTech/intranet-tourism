// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';

// export default function Dashboard({ auth }) {
//     return (
//         <AuthenticatedLayout
//             user={auth.user}
//             header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
//         >
//             <Head title="Dashboard" />

//             <div className="py-12">
//                 <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
//                     <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
//                         <div className="p-6 text-gray-900">You're logged in!</div>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }


import React from 'react';
import Layout from '../Layouts/DashboardLayout';

const Dashboard = () => {
  return (
    <Layout>
      <div className="p-8">
        {/* Dashboard content goes here */}
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
    </Layout>
  );
};

export default Dashboard;


