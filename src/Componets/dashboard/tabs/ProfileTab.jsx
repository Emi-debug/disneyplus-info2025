import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';

const ProfileTab = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');

  const handleUpdateName = () => {
    updateUser({ name: editName });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Mi Perfil</h2>
      
      <div className="flex items-start gap-6">
        <img 
          src={user?.avatar} 
          alt={user?.name}
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        
        <div className="flex-1">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            {isEditing ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button
                  onClick={handleUpdateName}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Guardar
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditName(user?.name);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-gray-900 font-semibold">{user?.name}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-500 hover:text-blue-600 text-sm"
                >
                  Editar
                </button>
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <p className="text-gray-900">{user?.email}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol
            </label>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {user?.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;