import React from 'react';
import { Search, CheckCircle, XCircle, Clock, User, Shield, X } from 'lucide-react';

interface Task {
  id: string;
  requestId: string;
  requesterName: string;
  requesterEmail: string;
  identityName: string;
  identityNip: string;
  requestedPermissions: { permission: string; role: string; description: string }[];
  application: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  reviewDate?: string;
}

// Generate 50 mock permissions for demonstration
const generateMockPermissions = () => {
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

  for (let i = 0; i < 50; i++) {
    permissions.push({
      permission: `${permissionTypes[i % permissionTypes.length]} ${Math.floor(i / permissionTypes.length) + 1}`,
      role: roles[i % roles.length],
      description: descriptions[i % descriptions.length]
    });
  }
  return permissions;
};

const mockTasks: Task[] = [
  {
    id: '1',
    requestId: 'REQ-2024-001',
    requesterName: 'Sarah Johnson',
    requesterEmail: 'sarah.johnson@company.com',
    identityName: 'Michael Chen',
    identityNip: '02156',
    requestedPermissions: generateMockPermissions(),
    application: 'HR Management System',
    status: 'pending',
    requestDate: '2024-12-15T09:30:00Z'
  },
  {
    id: '2',
    requestId: 'REQ-2024-002',
    requesterName: 'David Wilson',
    requesterEmail: 'david.wilson@company.com',
    identityName: 'Emily Davis',
    identityNip: '02234',
    requestedPermissions: generateMockPermissions(),
    application: 'Project Management Tool',
    status: 'pending',
    requestDate: '2024-12-14T14:15:00Z'
  },
  {
    id: '3',
    requestId: 'REQ-2024-003',
    requesterName: 'Jennifer Brown',
    requesterEmail: 'jennifer.brown@company.com',
    identityName: 'Robert Taylor',
    identityNip: '02890',
    requestedPermissions: generateMockPermissions(),
    application: 'Document Management',
    status: 'approved',
    requestDate: '2024-12-13T11:20:00Z',
    reviewDate: '2024-12-14T08:45:00Z'
  },
  {
    id: '4',
    requestId: 'REQ-2024-004',
    requesterName: 'Lisa Rodriguez',
    requesterEmail: 'lisa.rodriguez@company.com',
    identityName: 'John Anderson',
    identityNip: '02001',
    requestedPermissions: generateMockPermissions(),
    application: 'Analytics Dashboard',
    status: 'rejected',
    requestDate: '2024-12-12T16:30:00Z',
    reviewDate: '2024-12-13T10:15:00Z'
  }
];

export default function Tasks() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [showDetailModal, setShowDetailModal] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [showApproveModal, setShowApproveModal] = React.useState(false);
  const [showRejectModal, setShowRejectModal] = React.useState(false);
  const [rejectionReason, setRejectionReason] = React.useState('');
  const [taskToProcess, setTaskToProcess] = React.useState<Task | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const permissionsPerPage = 20;

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = 
      task.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.identityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.application.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (taskId: string) => {
    const task = mockTasks.find(t => t.id === taskId);
    if (task) {
      setTaskToProcess(task);
      setShowApproveModal(true);
    }
  };

  const handleReject = (taskId: string) => {
    const task = mockTasks.find(t => t.id === taskId);
    if (task) {
      setTaskToProcess(task);
      setShowRejectModal(true);
    }
  };

  const handleShowDetail = (task: Task) => {
    setSelectedTask(task);
    setShowDetailModal(true);
  };

  const confirmApprove = () => {
    if (taskToProcess) {
      console.log('Approving task:', taskToProcess.id);
      setShowApproveModal(false);
      setTaskToProcess(null);
      alert('Task approved successfully!');
    }
  };

  const confirmReject = () => {
    if (taskToProcess && rejectionReason.trim()) {
      console.log('Rejecting task:', taskToProcess.id, 'Reason:', rejectionReason);
      setShowRejectModal(false);
      setTaskToProcess(null);
      setRejectionReason('');
      alert('Task rejected successfully!');
    } else {
      alert('Please provide a rejection reason');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">For administrator approve request penambahan permission terhadap user dari tim operational</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  {getStatusIcon(task.status)}
                  <h3 className="text-lg font-semibold text-gray-900">{task.requestId}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(task.status)}`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Requester:</span>
                    </div>
                    <p className="text-sm text-gray-900">{task.requesterName}</p>
                    <p className="text-sm text-gray-500">{task.requesterEmail}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Target User:</span>
                    </div>
                    <p className="text-sm text-gray-900">{task.identityName}</p>
                    <p className="text-sm text-gray-500">NIP: {task.identityNip}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Application:</p>
                  <p className="text-sm text-gray-900">{task.application}</p>
                </div>
                
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Requested Permissions & Roles:</p>
                    <p className="text-sm text-gray-500">{task.requestedPermissions.length} permissions requested</p>
                  </div>
                  <button
                    onClick={() => handleShowDetail(task)}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
                
                <div className="text-xs text-gray-500">
                  <p>Request Date: {new Date(task.requestDate).toLocaleString()}</p>
                  {task.reviewDate && (
                    <p>Review Date: {new Date(task.reviewDate).toLocaleString()}</p>
                  )}
                </div>
              </div>
              
              {task.status === 'pending' && (
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleApprove(task.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(task.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Requested Permissions & Roles - {selectedTask.requestId}
              </h3>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setCurrentPage(1);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="overflow-x-auto flex-1">
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
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedTask.requestedPermissions
                    .slice((currentPage - 1) * permissionsPerPage, currentPage * permissionsPerPage)
                    .map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.permission}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {item.role}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.description}
                      </td>
                    </tr>
                    ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {selectedTask.requestedPermissions.length > permissionsPerPage && (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 pt-4 border-t border-gray-200 space-y-3 md:space-y-0">
                <div className="text-sm text-gray-500">
                  Showing {((currentPage - 1) * permissionsPerPage) + 1} to {Math.min(currentPage * permissionsPerPage, selectedTask.requestedPermissions.length)} of {selectedTask.requestedPermissions.length} permissions
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, Math.ceil(selectedTask.requestedPermissions.length / permissionsPerPage)) }, (_, i) => {
                      const totalPages = Math.ceil(selectedTask.requestedPermissions.length / permissionsPerPage);
                      const startPage = Math.max(1, currentPage - 2);
                      const endPage = Math.min(totalPages, startPage + 4);
                      const page = startPage + i;
                      
                      if (page > endPage) return null;
                      
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
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(selectedTask.requestedPermissions.length / permissionsPerPage)))}
                    disabled={currentPage === Math.ceil(selectedTask.requestedPermissions.length / permissionsPerPage)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Approve Confirmation Modal */}
      {showApproveModal && taskToProcess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Approve Request</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to approve request <strong>{taskToProcess.requestId}</strong> for <strong>{taskToProcess.identityName}</strong>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowApproveModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmApprove}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Reject Confirmation Modal */}
      {showRejectModal && taskToProcess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <XCircle className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Reject Request</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Are you sure you want to reject request <strong>{taskToProcess.requestId}</strong> for <strong>{taskToProcess.identityName}</strong>?
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rejection Reason *
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Please provide a reason for rejection..."
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}