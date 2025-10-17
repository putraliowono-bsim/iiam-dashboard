import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Building, Briefcase, Calendar, Shield, Users, Server, Search, ChevronLeft, ChevronRight, Save, Plus, Upload, X } from 'lucide-react';
import { identities, applications } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

// Mock groups data
const mockGroups = [
  { id: '1', name: 'HR Department', status: 'active' },
  { id: '2', name: 'Finance Team', status: 'active' },
  { id: '3', name: 'Project Managers', status: 'active' },
  { id: '4', name: 'Developers', status: 'active' },
  { id: '6', name: 'Operations', status: 'active' }
];

// Generate mock permissions for demonstration
const generateMockPermissions = (count: number) => {
  const permissions = [];
  const permissionTypes = [
    'User Management', 'Report Generate', 'Project Management', 'Task Management',
    'File Management', 'File Upload', 'System Config', 'Security Config',
    'Analytics View', 'Data Export', 'Backup Create', 'Log Management',
    'Notification Send', 'API Access', 'Database View', 'Integration Management',
    'Workflow Management', 'Template Management', 'Audit View', 'Settings Management'
  ];
  const roles = ['Administrator', 'Manager', 'User', 'Viewer', 'Analyst', 'Operator'];
  const descriptions = [
    'Create and manage user accounts',
    'Generate various system reports',
    'Manage project workflows and tasks',
    'Access and modify system files',
    'Configure system settings',
    'View analytics and dashboards',
    'Export data in various formats',
    'Manage system backups',
    'Access system logs',
    'Send notifications to users'
  ];

  for (let i = 0; i < count; i++) {
    permissions.push({
      id: `perm-${i + 1}`,
      name: `${permissionTypes[i % permissionTypes.length]} ${Math.floor(i / permissionTypes.length) + 1}`,
      role: roles[i % roles.length],
      description: descriptions[i % descriptions.length],
      application: applications[i % applications.length].name,
      group: mockGroups[i % mockGroups.length].name
    });
  }
  return permissions;
};

export default function IdentityDetail() {
  const { id } = useParams();
  const identity = identities.find(i => i.id === id);

  // Assigned permissions state
  const [assignedCurrentPage, setAssignedCurrentPage] = React.useState(1);
  const [assignedFilterType, setAssignedFilterType] = React.useState('all');
  const [assignedGroupFilter, setAssignedGroupFilter] = React.useState('all');
  const [assignedApplicationFilter, setAssignedApplicationFilter] = React.useState('all');
  const [assignedRoleFilter, setAssignedRoleFilter] = React.useState('all');
  const [assignedSearchTerm, setAssignedSearchTerm] = React.useState('');

  // Unassigned permissions state
  const [unassignedCurrentPage, setUnassignedCurrentPage] = React.useState(1);
  const [unassignedFilterType, setUnassignedFilterType] = React.useState('group');
  const [unassignedGroupFilter, setUnassignedGroupFilter] = React.useState('select');
  const [unassignedApplicationFilter, setUnassignedApplicationFilter] = React.useState('select');
  const [unassignedRoleFilter, setUnassignedRoleFilter] = React.useState('select');
  const [unassignedSearchTerm, setUnassignedSearchTerm] = React.useState('');
  const [selectedPermissions, setSelectedPermissions] = React.useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = React.useState(false);
  const [uploadFile, setUploadFile] = React.useState<File | null>(null);

  const [mockAssignedPermissions] = React.useState(generateMockPermissions(50));
  const [mockUnassignedPermissions] = React.useState(generateMockPermissions(100));

  const permissionsPerPage = 20;

  if (!identity) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">User not found</h2>
        <Link to="/identity" className="text-blue-600 hover:text-blue-500 mt-2 inline-block">
          ← Back to Users
        </Link>
      </div>
    );
  }

  // Filter assigned permissions
  const filteredAssignedPermissions = mockAssignedPermissions.filter(permission => {
    const matchesSearch = permission.name.toLowerCase().includes(assignedSearchTerm.toLowerCase());
    
    if (assignedFilterType === 'all') return matchesSearch;
    if (assignedFilterType === 'group' && assignedGroupFilter !== 'all') {
      return matchesSearch && permission.group === mockGroups.find(g => g.id === assignedGroupFilter)?.name;
    }
    if (assignedFilterType === 'application' && assignedApplicationFilter !== 'all') {
      return matchesSearch && permission.application === applications.find(a => a.id === assignedApplicationFilter)?.name;
    }
    if (assignedFilterType === 'application-roles' && assignedApplicationFilter !== 'all') {
      const appMatch = permission.application === applications.find(a => a.id === assignedApplicationFilter)?.name;
      if (assignedRoleFilter !== 'all') {
        return matchesSearch && appMatch && permission.role === assignedRoleFilter;
      }
      return matchesSearch && appMatch;
    }
    
    return matchesSearch;
  });

  // Filter unassigned permissions
  const filteredUnassignedPermissions = mockUnassignedPermissions.filter(permission => {
    const matchesSearch = permission.name.toLowerCase().includes(unassignedSearchTerm.toLowerCase());
    
    if (unassignedFilterType === 'group' && unassignedGroupFilter !== 'select') {
      return matchesSearch && permission.group === mockGroups.find(g => g.id === unassignedGroupFilter)?.name;
    }
    if (unassignedFilterType === 'application' && unassignedApplicationFilter !== 'select') {
      return matchesSearch && permission.application === applications.find(a => a.id === unassignedApplicationFilter)?.name;
    }
    if (unassignedFilterType === 'application-roles' && unassignedApplicationFilter !== 'select') {
      const appMatch = permission.application === applications.find(a => a.id === unassignedApplicationFilter)?.name;
      if (unassignedRoleFilter !== 'select') {
        return matchesSearch && appMatch && permission.role === unassignedRoleFilter;
      }
      return matchesSearch && appMatch;
    }
    
    return [];
  });

  // Pagination for assigned permissions
  const assignedTotalPages = Math.ceil(filteredAssignedPermissions.length / permissionsPerPage);
  const assignedStartIndex = (assignedCurrentPage - 1) * permissionsPerPage;
  const assignedEndIndex = assignedStartIndex + permissionsPerPage;
  const currentAssignedPermissions = filteredAssignedPermissions.slice(assignedStartIndex, assignedEndIndex);

  // Pagination for unassigned permissions
  const unassignedTotalPages = Math.ceil(filteredUnassignedPermissions.length / permissionsPerPage);
  const unassignedStartIndex = (unassignedCurrentPage - 1) * permissionsPerPage;
  const unassignedEndIndex = unassignedStartIndex + permissionsPerPage;
  const currentUnassignedPermissions = filteredUnassignedPermissions.slice(unassignedStartIndex, unassignedEndIndex);

  // Check if unassigned permissions should be shown
  const shouldShowUnassignedPermissions = () => {
    if (unassignedFilterType === 'group') return unassignedGroupFilter !== 'select';
    if (unassignedFilterType === 'application') return unassignedApplicationFilter !== 'select';
    if (unassignedFilterType === 'application-roles') {
      return unassignedApplicationFilter !== 'select' && unassignedRoleFilter !== 'select';
    }
    return false;
  };

  // Handle filter type changes
  const handleAssignedFilterTypeChange = (type: string) => {
    setAssignedFilterType(type);
    setAssignedGroupFilter('all');
    setAssignedApplicationFilter('all');
    setAssignedRoleFilter('all');
    setAssignedCurrentPage(1);
  };

  const handleUnassignedFilterTypeChange = (type: string) => {
    setUnassignedFilterType(type);
    setUnassignedGroupFilter('select');
    setUnassignedApplicationFilter('select');
    setUnassignedRoleFilter('select');
    setUnassignedCurrentPage(1);
  };

  // Handle permission selection
  const handlePermissionSelect = (permissionId: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId) 
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPermissions.length === filteredUnassignedPermissions.length) {
      setSelectedPermissions([]);
    } else {
      setSelectedPermissions(filteredUnassignedPermissions.map(p => p.id));
    }
  };

  const handleSaveChanges = () => {
    console.log('Saving selected permissions:', selectedPermissions);
    alert(`Added ${selectedPermissions.length} permissions to user`);
    setSelectedPermissions([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setUploadFile(file);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const handleUploadSubmit = () => {
    if (!uploadFile) return;
    
    console.log('Uploading CSV file:', uploadFile.name);
    // Implementation for CSV upload
    setUploadFile(null);
    setShowUploadModal(false);
    alert('CSV file uploaded successfully! Permissions have been added to the user.');
  };

  const downloadTemplate = () => {
    const csvContent = 'Application Name,Permission Name,Role Name\nHR Management System,User Management,Administrator\nFinance Portal,Report Generate,\nProject Management Tool,Task Management,Manager';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'permission_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/identity"
            className="inline-flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Users
          </Link>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Edit User
        </button>
      </div>

      {/* User Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{identity.name}</h1>
              <p className="text-gray-600 mt-1">NIP: {identity.nip}</p>
              <div className="flex items-center mt-2">
                <StatusBadge status={identity.status} size="md" />
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Last Login</p>
            <p className="font-medium text-gray-900">{new Date(identity.lastLogin).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">User Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{identity.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Building className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium text-gray-900">{identity.department}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Briefcase className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Position</p>
              <p className="font-medium text-gray-900">{identity.position}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Created</p>
              <p className="font-medium text-gray-900">{new Date(identity.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Assigned Permissions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Assigned Permissions ({filteredAssignedPermissions.length})
          </h2>
        </div>

        {/* Assigned Permissions Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search assigned permissions..."
                  value={assignedSearchTerm}
                  onChange={(e) => setAssignedSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter By</label>
              <select
                value={assignedFilterType}
                onChange={(e) => handleAssignedFilterTypeChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="group">Group</option>
                <option value="application">Application</option>
                <option value="application-roles">Application & Roles</option>
              </select>
            </div>

            {assignedFilterType === 'group' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group</label>
                <select
                  value={assignedGroupFilter}
                  onChange={(e) => setAssignedGroupFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Groups</option>
                  {mockGroups.filter(g => g.status === 'active').map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </select>
              </div>
            )}

            {(assignedFilterType === 'application' || assignedFilterType === 'application-roles') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application</label>
                <select
                  value={assignedApplicationFilter}
                  onChange={(e) => {
                    setAssignedApplicationFilter(e.target.value);
                    setAssignedRoleFilter('all');
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Applications</option>
                  {applications.filter(a => a.status === 'active').map(app => (
                    <option key={app.id} value={app.id}>{app.name}</option>
                  ))}
                </select>
              </div>
            )}

            {assignedFilterType === 'application-roles' && assignedApplicationFilter !== 'all' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={assignedRoleFilter}
                  onChange={(e) => setAssignedRoleFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Roles</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Manager">Manager</option>
                  <option value="User">User</option>
                  <option value="Viewer">Viewer</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Operator">Operator</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Assigned Permissions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentAssignedPermissions.map((permission) => (
                <tr key={permission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full font-medium bg-blue-100 text-blue-800">
                      {permission.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{permission.application}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{permission.description}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Assigned Permissions Pagination */}
        {assignedTotalPages > 1 && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 pt-4 border-t border-gray-200 space-y-3 md:space-y-0">
            <div className="text-sm text-gray-500">
              Showing {assignedStartIndex + 1} to {Math.min(assignedEndIndex, filteredAssignedPermissions.length)} of {filteredAssignedPermissions.length} permissions
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAssignedCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={assignedCurrentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, assignedTotalPages) }, (_, i) => {
                  const startPage = Math.max(1, assignedCurrentPage - 2);
                  const page = startPage + i;
                  if (page > assignedTotalPages) return null;
                  
                  return (
                    <button
                      key={page}
                      onClick={() => setAssignedCurrentPage(page)}
                      className={`px-3 py-1 text-sm rounded-md ${
                        assignedCurrentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                }).filter(Boolean)}
              </div>
              
              <button
                onClick={() => setAssignedCurrentPage(prev => Math.min(prev + 1, assignedTotalPages))}
                disabled={assignedCurrentPage === assignedTotalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Unassigned Permissions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Unassigned Permissions
          </h2>
          {selectedPermissions.length > 0 && (
            <button
              onClick={handleSaveChanges}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes ({selectedPermissions.length})
            </button>
          )}
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </button>
        </div>

        {/* Unassigned Permissions Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search unassigned permissions..."
                  value={unassignedSearchTerm}
                  onChange={(e) => setUnassignedSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            {shouldShowUnassignedPermissions() && (
              <button
                onClick={handleSelectAll}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {selectedPermissions.length === filteredUnassignedPermissions.length ? 'Deselect All' : 'Select All'}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter By</label>
              <select
                value={unassignedFilterType}
                onChange={(e) => handleUnassignedFilterTypeChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="group">Group</option>
                <option value="application">Application</option>
                <option value="application-roles">Application & Roles</option>
              </select>
            </div>

            {unassignedFilterType === 'group' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group</label>
                <select
                  value={unassignedGroupFilter}
                  onChange={(e) => setUnassignedGroupFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="select">Select Group</option>
                  {mockGroups.filter(g => g.status === 'active').map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </select>
              </div>
            )}

            {(unassignedFilterType === 'application' || unassignedFilterType === 'application-roles') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application</label>
                <select
                  value={unassignedApplicationFilter}
                  onChange={(e) => {
                    setUnassignedApplicationFilter(e.target.value);
                    setUnassignedRoleFilter('select');
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="select">Select Application</option>
                  {applications.filter(a => a.status === 'active').map(app => (
                    <option key={app.id} value={app.id}>{app.name}</option>
                  ))}
                </select>
              </div>
            )}

            {unassignedFilterType === 'application-roles' && unassignedApplicationFilter !== 'select' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={unassignedRoleFilter}
                  onChange={(e) => setUnassignedRoleFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="select">Select Role</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Manager">Manager</option>
                  <option value="User">User</option>
                  <option value="Viewer">Viewer</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Operator">Operator</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Unassigned Permissions Content */}
        {shouldShowUnassignedPermissions() ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Select
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Permission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Application
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentUnassignedPermissions.map((permission) => (
                    <tr key={permission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(permission.id)}
                          onChange={() => handlePermissionSelect(permission.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full font-medium bg-blue-100 text-blue-800">
                          {permission.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{permission.application}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{permission.description}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Unassigned Permissions Pagination */}
            {unassignedTotalPages > 1 && (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 pt-4 border-t border-gray-200 space-y-3 md:space-y-0">
                <div className="text-sm text-gray-500">
                  Showing {unassignedStartIndex + 1} to {Math.min(unassignedEndIndex, filteredUnassignedPermissions.length)} of {filteredUnassignedPermissions.length} permissions
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setUnassignedCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={unassignedCurrentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, unassignedTotalPages) }, (_, i) => {
                      const startPage = Math.max(1, unassignedCurrentPage - 2);
                      const page = startPage + i;
                      if (page > unassignedTotalPages) return null;
                      
                      return (
                        <button
                          key={page}
                          onClick={() => setUnassignedCurrentPage(page)}
                          className={`px-3 py-1 text-sm rounded-md ${
                            unassignedCurrentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }).filter(Boolean)}
                  </div>
                  
                  <button
                    onClick={() => setUnassignedCurrentPage(prev => Math.min(prev + 1, unassignedTotalPages))}
                    disabled={unassignedCurrentPage === unassignedTotalPages}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select Filter to View Permissions</h3>
            <p className="text-gray-600">
              Please select a group, application, or application & role to view available permissions.
            </p>
          </div>
        )}
      </div>

      {/* Applications & Roles */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Applications & Roles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {identity.applications.map((app) => (
            <div key={app.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Server className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium text-gray-900">{app.name}</h3>
                <StatusBadge status={app.status} />
              </div>
              <p className="text-sm text-gray-600 mb-3">{app.description}</p>
              <div className="space-y-2">
                <p className="text-xs text-gray-500">Roles:</p>
                <div className="flex flex-wrap gap-1">
                  {identity.roles.map((role) => (
                    <span key={role.id} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {role.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assigned Groups */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Assigned Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockGroups.slice(0, 3).map((group) => (
            <div key={group.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-purple-600" />
                <div>
                  <h3 className="font-medium text-gray-900">{group.name}</h3>
                  <StatusBadge status={group.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}