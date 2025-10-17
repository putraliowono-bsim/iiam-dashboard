import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Server, Users, Globe, Calendar, Settings, Code, Layers, Plus, Upload, X, ChevronLeft, ChevronRight, Download, Search } from 'lucide-react';
import { applications } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

// Generate 100 mock permissions for the application
const generateMockPermissions = () => {
  const permissions = [];
  const permissionTypes = [
    'User Management', 'Report Generate', 'Project Management', 'Task Management',
    'File Management', 'File Upload', 'System Config', 'Security Config',
    'Analytics View', 'Data Export', 'Backup Create', 'Log Management',
    'Notification Send', 'API Access', 'Database View', 'Integration Management',
    'Workflow Management', 'Template Management', 'Audit View', 'Settings Management',
    'Dashboard Access', 'Profile Edit', 'Password Reset', 'Role Assignment',
    'Permission Grant', 'Group Management', 'Department Access', 'Finance View',
    'Budget Management', 'Invoice Create', 'Payment Process', 'Expense Track',
    'Calendar Access', 'Meeting Schedule', 'Resource Book', 'Time Track',
    'Document Create', 'Document Edit', 'Document Share', 'Document Archive',
    'Email Send', 'Message Broadcast', 'Chat Access', 'Forum Moderate',
    'Survey Create', 'Poll Manage', 'Feedback View', 'Rating Submit',
    'Inventory View', 'Stock Update', 'Order Process', 'Supplier Manage',
    'Customer View', 'Lead Track', 'Sales Report', 'Marketing Campaign'
  ];
  
  const roles = ['Administrator', 'Manager', 'User', 'Viewer', 'Editor', 'Analyst', 'Operator', 'Supervisor'];
  
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
    'Send notifications to users',
    'Access dashboard and overview',
    'Edit user profile information',
    'Reset user passwords',
    'Assign roles to users',
    'Grant permissions to users',
    'Manage user groups',
    'Access department information',
    'View financial data',
    'Manage budget allocations',
    'Create and process invoices',
    'Process payment transactions',
    'Track expenses and costs',
    'Access calendar system',
    'Schedule meetings and events',
    'Book resources and rooms',
    'Track time and attendance',
    'Create new documents',
    'Edit existing documents',
    'Share documents with others',
    'Archive old documents',
    'Send email messages',
    'Broadcast messages to groups',
    'Access chat functionality',
    'Moderate forum discussions',
    'Create surveys and forms',
    'Manage polls and voting',
    'View feedback and reviews',
    'Submit ratings and reviews',
    'View inventory levels',
    'Update stock quantities',
    'Process customer orders',
    'Manage supplier relationships',
    'View customer information',
    'Track sales leads',
    'Generate sales reports',
    'Manage marketing campaigns'
  ];

  for (let i = 0; i < 100; i++) {
    const hasRole = Math.random() > 0.3; // 70% chance of having a role
    const hasDescription = Math.random() > 0.2; // 80% chance of having a description
    
    permissions.push({
      id: `perm-${i + 1}`,
      name: `${permissionTypes[i % permissionTypes.length]} ${Math.floor(i / permissionTypes.length) + 1}`,
      role: hasRole ? roles[i % roles.length] : '',
      description: hasDescription ? descriptions[i % descriptions.length] : '',
      action: 'delete'
    });
  }
  return permissions;
};

export default function SetupDetail() {
  const { id } = useParams();
  const app = applications.find(a => a.id === id);
  const [showUploadModal, setShowUploadModal] = React.useState(false);
  const [uploadFile, setUploadFile] = React.useState<File | null>(null);
  const [mockPermissions] = React.useState(generateMockPermissions());
  const [currentPage, setCurrentPage] = React.useState(1);
  const permissionsPerPage = 20;
  const [selectedPermissions, setSelectedPermissions] = React.useState<string[]>([]);
  const [exportMode, setExportMode] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState('all');

  // Pagination logic - moved here to ensure proper initialization order
  const filteredPermissions = mockPermissions.filter(permission => {
    const matchesSearch = permission.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || permission.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredPermissions.length / permissionsPerPage);
  const startIndex = (currentPage - 1) * permissionsPerPage;
  const endIndex = startIndex + permissionsPerPage;
  const currentPermissions = filteredPermissions.slice(startIndex, endIndex);
  const currentPagePermissions = currentPermissions.map(p => p.id);
  const allCurrentSelected = currentPagePermissions.every(id => selectedPermissions.includes(id));

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter]);

  if (!app) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Application not found</h2>
        <Link to="/setup" className="text-blue-600 hover:text-blue-500 mt-2 inline-block">
          ← Back to Setup
        </Link>
      </div>
    );
  }

  const getComponentIcon = (type: string) => {
    switch (type) {
      case 'module':
        return <Layers className="w-5 h-5 text-blue-600" />;
      case 'feature':
        return <Settings className="w-5 h-5 text-green-600" />;
      case 'service':
        return <Code className="w-5 h-5 text-purple-600" />;
      default:
        return <Server className="w-5 h-5 text-gray-600" />;
    }
  };

  const getComponentTypeColor = (type: string) => {
    switch (type) {
      case 'module':
        return 'bg-blue-100 text-blue-800';
      case 'feature':
        return 'bg-green-100 text-green-800';
      case 'service':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
    alert('CSV file uploaded successfully!');
  };

  const handleExportClick = () => {
    setExportMode(true);
  };

  const handlePermissionSelect = (permissionId: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId) 
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSelectAll = () => {
    if (allCurrentSelected) {
      setSelectedPermissions(prev => prev.filter(id => !currentPagePermissions.includes(id)));
    } else {
      setSelectedPermissions(prev => [...new Set([...prev, ...currentPagePermissions])]);
    }
  };

  const handleSelectAllPermissions = () => {
    if (selectedPermissions.length === filteredPermissions.length) {
      setSelectedPermissions([]);
    } else {
      setSelectedPermissions(filteredPermissions.map(p => p.id));
    }
  };

  const handleExportConfirm = () => {
    const permissionsToExport = selectedPermissions.length > 0 
      ? filteredPermissions.filter(p => selectedPermissions.includes(p.id))
      : filteredPermissions;

    // Create CSV content
    const csvHeader = 'application_name,permission_name,role_name\n';
    const csvContent = permissionsToExport.map(permission => 
      `"${app.name}","${permission.name}","${permission.role || ''}"`
    ).join('\n');
    
    const fullCsvContent = csvHeader + csvContent;
    
    // Download CSV file
    const blob = new Blob([fullCsvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${app.name.toLowerCase().replace(/\s+/g, '_')}_permissions.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    setExportMode(false);
    setSelectedPermissions([]);
    alert(`Exported ${permissionsToExport.length} permissions successfully!`);
  };

  const handleCancelExport = () => {
    setExportMode(false);
    setSelectedPermissions([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/setup"
            className="inline-flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Applications
          </Link>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Edit Application
        </button>
      </div>

      {/* Application Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <Server className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{app.name}</h1>
              <p className="text-gray-600 mt-1">{app.description}</p>
              <div className="flex items-center mt-2">
                <StatusBadge status={app.status} size="md" />
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Created: {new Date(app.createdAt).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Last Updated: {new Date(app.lastUpdated).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Application Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">URL</p>
              <a 
                href={app.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:text-blue-500 break-all"
              >
                {app.url}
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Assigned Users</p>
              <p className="font-medium text-gray-900">{app.assignedUsers}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Layers className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Permissions</p>
              <p className="font-medium text-gray-900">{app.components.length}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <StatusBadge status={app.status} />
            </div>
          </div>
        </div>
      </div>

      {/* Permissions & Roles */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Permissions & Roles ({filteredPermissions.length})
          </h2>
          <div className="flex items-center space-x-3">
            {!exportMode ? (
              <>
                <button 
                  onClick={handleExportClick}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={handleCancelExport}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleExportConfirm}
                  disabled={selectedPermissions.length === 0}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Confirm Export ({selectedPermissions.length})
                </button>
              </>
            )}
            <button 
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </button>
          </div>
        </div>
        
        {exportMode && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-blue-900">Export Mode</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSelectAllPermissions}
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                >
                  {selectedPermissions.length === mockPermissions.length ? 'Deselect All' : 'Select All'}
                </button>
                <span className="text-sm text-blue-700">
                  {selectedPermissions.length} of {filteredPermissions.length} permissions selected
                </span>
              </div>
            </div>
            <p className="text-sm text-blue-800">Select the permissions you want to export. The CSV file will contain: <strong>application_name, permission_name, role_name</strong></p>
          </div>
        )}
        
        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search permissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="Administrator">Administrator</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
                <option value="Viewer">Viewer</option>
                <option value="Editor">Editor</option>
                <option value="Analyst">Analyst</option>
                <option value="Operator">Operator</option>
                <option value="Supervisor">Supervisor</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {exportMode && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={allCurrentSelected && currentPagePermissions.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentPermissions.map((permission) => (
                <tr key={permission.id} className="hover:bg-gray-50">
                  {exportMode && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(permission.id)}
                        onChange={() => handlePermissionSelect(permission.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {permission.role ? (
                      <span className="px-2 py-1 text-xs rounded-full font-medium bg-blue-100 text-blue-800">
                        {permission.role}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">No Role</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      {permission.description || <span className="text-gray-400">No description</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {!exportMode && (
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 pt-4 border-t border-gray-200 space-y-3 md:space-y-0">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredPermissions.length)} of {filteredPermissions.length} permissions
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const startPage = Math.max(1, currentPage - 2);
                  const page = startPage + i;
                  if (page > totalPages) return null;
                  
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 text-sm rounded-md ${
                        currentPage === page
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
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Upload CSV Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload CSV File</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="flex flex-col items-center">
                  <label className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-500 font-medium">
                      Click to upload CSV file
                    </span>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
                </div>
                {uploadFile && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      Selected: {uploadFile.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-2 mb-4">
              CSV should contain columns: Permission Name, Role Name (optional), Description (Optional)
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadSubmit}
                disabled={!uploadFile}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}