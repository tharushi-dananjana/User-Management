const UserNavBar = ({ user, onLogout, activeTab, setActiveTab }) => {
  return (
    <nav className="bg-green-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <User className="h-8 w-8 text-white" />
            <span className="text-white text-xl font-bold">HealthPortal</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setActiveTab('user-profile')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'user-profile' 
                  ? 'bg-green-700 text-white' 
                  : 'text-green-100 hover:bg-green-500'
              }`}
            >
              <User className="h-4 w-4" />
              <span>User Profile</span>
            </button>
            
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'profile' 
                  ? 'bg-green-700 text-white' 
                  : 'text-green-100 hover:bg-green-500'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Profile</span>
            </button>
            
            <div className="flex items-center space-x-3 text-white">
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=16a34a&color=fff`}
                alt={user.name}
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm">{user.name}</span>
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