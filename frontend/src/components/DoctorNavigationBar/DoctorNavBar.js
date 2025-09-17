import React, { useState } from 'react';
import { User, LogOut, Settings, Stethoscope, Calendar, FileText, Award } from 'lucide-react';

const DoctorNavBar = ({ doctor, onLogout, activeTab, setActiveTab }) => {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Stethoscope className="h-8 w-8 text-white" />
            <span className="text-white text-xl font-bold">MedPortal</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setActiveTab('doctor-profile')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'doctor-profile' 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:bg-blue-500'
              }`}
            >
              <Stethoscope className="h-4 w-4" />
              <span>Doctor Profile</span>
            </button>
            
            <button
              onClick={() => setActiveTab('personal-profile')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'personal-profile' 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:bg-blue-500'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Personal Profile</span>
            </button>
            
            <div className="flex items-center space-x-3 text-white">
              <img
                src={doctor.avatar || `https://ui-avatars.com/api/?name=${doctor.name}&background=3b82f6&color=fff`}
                alt={doctor.name}
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm">Dr. {doctor.name}</span>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};