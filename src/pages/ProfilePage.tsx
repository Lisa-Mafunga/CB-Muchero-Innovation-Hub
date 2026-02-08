import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileEditor } from '@/app/components/ProfileEditor';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) return <Navigate to="/signin" />;
  if (!user?.id) return <Navigate to="/signin" />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-purple-100 mt-1">Create or update your mentorship profile</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="p-6 bg-white rounded shadow text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : (
          <ProfileEditor
            userId={user.id}
            userName={user?.name || ''}
            userRole={(user?.role as 'mentor' | 'mentee') || 'mentee'}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

