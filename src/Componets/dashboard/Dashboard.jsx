import React, { useState } from 'react';

import ProfileTab from './tabs/ProfileTab';
import SettingsTab from './tabs/SettingsTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gray-100">
      
      
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </main>
    </div>
  );
};

export default Dashboard;