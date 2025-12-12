import React from 'react';

const SettingsTab = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Configuración</h2>
      
      <div className="space-y-4">
        <div className="border-b border-gray-200 pb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Notificaciones</h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" defaultChecked />
            <span className="text-gray-700">Recibir notificaciones por email</span>
          </label>
        </div>
        
        <div className="border-b border-gray-200 pb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Privacidad</h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-gray-700">Perfil público</span>
          </label>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Tema</h3>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option>Claro</option>
            <option>Oscuro</option>
            <option>Automático</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;