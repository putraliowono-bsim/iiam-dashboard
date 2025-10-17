import React from 'react';
import { Users, TrendingUp, AlertCircle, UserCheck } from 'lucide-react';
import { identities } from '../data/mockData';

// Mock groups data for dashboard stats
const mockGroups = [
  { id: '1', status: 'active' },
  { id: '2', status: 'active' },
  { id: '3', status: 'active' },
  { id: '4', status: 'active' },
  { id: '5', status: 'inactive' },
  { id: '6', status: 'active' }
];

export default function Dashboard() {
  const stats = {
    totalUsers: identities.length,
    activeUsers: identities.filter(i => i.status === 'active').length,
    inactiveUsers: identities.filter(i => i.status === 'inactive').length,
    activeUsersWithoutPermissions: identities.filter(i => i.status === 'active' && i.permissions.length === 0).length,
    totalGroups: mockGroups.length,
    activeGroups: mockGroups.filter(g => g.status === 'active').length,
    inactiveGroups: mockGroups.filter(g => g.status === 'inactive').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="w-8 h-8 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Inactive Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inactiveUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Users Without Permissions</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeUsersWithoutPermissions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserCheck className="w-8 h-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Groups</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalGroups}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Group Active</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeGroups}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserCheck className="w-8 h-8 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Group Inactive</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inactiveGroups}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}