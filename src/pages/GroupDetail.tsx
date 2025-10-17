import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Users, Calendar, Search, ChevronLeft, ChevronRight, UserMinus, UserPlus, Trash2, Shield, Save, Upload, X } from 'lucide-react';
import { identities, applications } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

interface GroupData {
  id: string;
  name: string;
  totalUsers: number;
  createdBy: string;
  status: 'active' | 'inactive';
  createdAt: string;
  description: string;
}

interface GroupMember {
  id: string;
  nip: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'active' | 'inactive';
}

const mockGroups: GroupData[] = [
  {
    id: '1',
    name: 'HR Department',
    totalUsers: 12,
    createdBy: 'John Anderson',
    status: 'active',
    createdAt: '2023-01-15',
    description: 'Human Resources team members'
  },
  {
    id: '2',
    name: 'Finance Team',
    totalUsers: 8,
    createdBy: 'Sarah Johnson',
    status: 'active',
    createdAt: '2023-02-20',
    description: 'Financial management and accounting team'
  },
  {
    id: '3',
    name: 'Project Managers',
    totalUsers: 15,
    createdBy: 'Michael Chen',
    status: 'active',
    createdAt: '2023-03-10',
    description: 'Project management team leads'
  },
  {
    id: '4',
    name: 'Developers',
    totalUsers: 25,
    createdBy: 'Emily Davis',
    status: 'active',
    createdAt: '2023-04-05',
    description: 'Software development team'
  },
  {
    id: '5',
    name: 'Analysts',
    totalUsers: 6,
    createdBy: 'David Wilson',
    status: 'inactive',
    createdAt: '2023-05-12',
    description: 'Data and business analysts'
  },
  {
    id: '6',
    name: 'Operations',
    totalUsers: 10,
    createdBy: 'Lisa Rodriguez',
    status: 'active',
    createdAt: '2023-06-18',
    description: 'Operations and maintenance team'
  }
];

export default function GroupDetail() {
  const { id } = useParams();
  const group = mockGroups.find(g => g.id === id);

  // Group Members State
  const [memberSearchTerm, setMemberSearchTerm] = React.useState('');
  const [memberStatusFilter, setMemberStatusFilter] = React.useState('all');
  const [memberCurrentPage, setMemberCurrentPage] = React.useState(1);

  // Add Member State
  const [addMemberSearchTerm, setAddMemberSearchTerm] = React.useState('');
  const [addMemberStatusFilter, setAddMemberStatusFilter] = React.useState('all');
  const [addMemberCurrentPage, setAddMemberCurrentPage] = React.useState(1);
  const [selectedMembers, setSelectedMembers] = React.useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = React.useState(false);
  const [uploadFile, setUploadFile] = React.useState<File | null>(null);

  // Permissions state
  const [assignedCurrentPage, setAssignedCurrentPage] = React.useState(1);
  const [assignedFilterType, setAssignedFilterType] = React.useState('all');
  const [assignedApplicationFilter, setAssignedApplicationFilter] = React.useState('all');
  const [assignedRoleFilter, setAssignedRoleFilter] = React.useState('all');
  const [assignedSearchTerm, setAssignedSearchTerm] = React.useState('');

  const [unassignedCurrentPage, setUnassignedCurrentPage] = React.useState(1);
  const [unassignedFilterType, setUnassignedFilterType] = React.useState('application');
  const [unassignedApplicationFilter, setUnassignedApplicationFilter] = React.useState('select');
  const [unassignedRoleFilter, setUnassignedRoleFilter] = React.useState('select');
  const [unassignedSearchTerm, setUnassignedSearchTerm] = React.useState('');
  const [selectedPermissions, setSelectedPermissions] = React.useState<string[]>([]);

  const membersPerPage = 10;

  // Mock group members (first 12 identities)
  const mockGroupMembers: GroupMember[] = identities.slice(0, 12).map(identity => ({
    id: identity.id,
    nip: identity.nip,
    name: identity.name,
    email: identity.email,
    department: identity.department,
    position: identity.position,
    status: identity.status
  }));

  // Mock non-group members (remaining identities)
  const mockNonGroupMembers: GroupMember[] = [
    // Additional sample users not in any group
    {
      id: 'user-101',
      nip: '03001',
      name: 'Alice Thompson',
      email: 'alice.thompson@company.com',
      department: 'Marketing',
      position: 'Marketing Specialist',
      status: 'active'
    },
    {
      id: 'user-102',
      nip: '03002',
      name: 'Bob Martinez',
      email: 'bob.martinez@company.com',
      department: 'Sales',
      position: 'Sales Representative',
      status: 'active'
    },
    {
      id: 'user-103',
      nip: '03003',
      name: 'Carol White',
      email: 'carol.white@company.com',
      department: 'IT',
      position: 'System Administrator',
      status: 'active'
    },
    {
      id: 'user-104',
      nip: '03004',
      name: 'Daniel Kim',
      email: 'daniel.kim@company.com',
      department: 'Engineering',
      position: 'Software Engineer',
      status: 'active'
    },
    {
      id: 'user-105',
      nip: '03005',
      name: 'Emma Garcia',
      email: 'emma.garcia@company.com',
      department: 'Design',
      position: 'UI/UX Designer',
      status: 'active'
    },
    {
      id: 'user-106',
      nip: '03006',
      name: 'Frank Miller',
      email: 'frank.miller@company.com',
      department: 'Operations',
      position: 'Operations Manager',
      status: 'inactive'
    },
    {
      id: 'user-107',
      nip: '03007',
      name: 'Grace Lee',
      email: 'grace.lee@company.com',
      department: 'Legal',
      position: 'Legal Counsel',
      status: 'active'
    },
    {
      id: 'user-108',
      nip: '03008',
      name: 'Henry Davis',
      email: 'henry.davis@company.com',
      department: 'Finance',
      position: 'Financial Analyst',
      status: 'active'
    },
    {
      id: 'user-109',
      nip: '03009',
      name: 'Iris Chen',
      email: 'iris.chen@company.com',
      department: 'Research',
      position: 'Research Scientist',
      status: 'active'
    },
    {
      id: 'user-110',
      nip: '03010',
      name: 'Jack Wilson',
      email: 'jack.wilson@company.com',
      department: 'Support',
      position: 'Customer Support',
      status: 'active'
    },
    {
      id: 'user-111',
      nip: '03011',
      name: 'Kate Brown',
      email: 'kate.brown@company.com',
      department: 'Training',
      position: 'Training Coordinator',
      status: 'active'
    },
    {
      id: 'user-112',
      nip: '03012',
      name: 'Leo Rodriguez',
      email: 'leo.rodriguez@company.com',
      department: 'Quality',
      position: 'Quality Assurance',
      status: 'inactive'
    },
    {
      id: 'user-113',
      nip: '03013',
      name: 'Maya Patel',
      email: 'maya.patel@company.com',
      department: 'Product',
      position: 'Product Manager',
      status: 'active'
    },
    {
      id: 'user-114',
      nip: '03014',
      name: 'Nathan Clark',
      email: 'nathan.clark@company.com',
      department: 'Security',
      position: 'Security Analyst',
      status: 'active'
    },
    {
      id: 'user-115',
      nip: '03015',
      name: 'Olivia Johnson',
      email: 'olivia.johnson@company.com',
      department: 'Communications',
      position: 'Communications Manager',
      status: 'active'
    }
  ].concat(identities.slice(8).map(identity => ({
    id: identity.id,
    nip: identity.nip,
    name: identity.name,
    email: identity.email,
    department: identity.department,
    position: identity.position,
    status: identity.status
  })));

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
        application: applications[i % applications.length].name
      });
    }
    return permissions;
  };

  const [mockAssignedPermissions] = React.useState(generateMockPermissions(30));
  const [mockUnassignedPermissions] = React.useState(generateMockPermissions(50));

  if (!group) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Group not found</h2>
        <Link to="/group" className="text-blue-600 hover:text-blue-500 mt-2 inline-block">
          ← Back to Groups
        </Link>
      </div>
    );
  }

  // Filter group members
  const filteredGroupMembers = mockGroupMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(memberSearchTerm.toLowerCase());
    const matchesStatus = memberStatusFilter === 'all' || member.status === memberStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter non-group members
  const filteredNonGroupMembers = mockNonGroupMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(addMemberSearchTerm.toLowerCase());
    const matchesStatus = addMemberStatusFilter === 'all' || member.status === addMemberStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination for group members
  const memberTotalPages = Math.ceil(filteredGroupMembers.length / membersPerPage);
  const memberStartIndex = (memberCurrentPage - 1) * membersPerPage;
  const memberEndIndex = memberStartIndex + membersPerPage;
  const currentGroupMembers = filteredGroupMembers.slice(memberStartIndex, memberEndIndex);

  // Pagination for non-group members
  const addMemberTotalPages = Math.ceil(filteredNonGroupMembers.length / membersPerPage);
  const addMemberStartIndex = (addMemberCurrentPage - 1) * membersPerPage;
  const addMemberEndIndex = addMemberStartIndex + membersPerPage;
  const currentNonGroupMembers = filteredNonGroupMembers.slice(addMemberStartIndex, addMemberEndIndex);

  // Filter assigned permissions
  const filteredAssignedPermissions = mockAssignedPermissions.filter(permission => {
    const matchesSearch = permission.name.toLowerCase().includes(assignedSearchTerm.toLowerCase());
    
    if (assignedFilterType === 'all') return matchesSearch;
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
  const assignedTotalPages = Math.ceil(filteredAssignedPermissions.length / membersPerPage);
  const assignedStartIndex = (assignedCurrentPage - 1) * membersPerPage;
  const assignedEndIndex = assignedStartIndex + membersPerPage;
  const currentAssignedPermissions = filteredAssignedPermissions.slice(assignedStartIndex, assignedEndIndex);

  // Pagination for unassigned permissions
  const unassignedTotalPages = Math.ceil(filteredUnassignedPermissions.length / membersPerPage);
  const unassignedStartIndex = (unassignedCurrentPage - 1) * membersPerPage;
  const unassignedEndIndex = unassignedStartIndex + membersPerPage;
  const currentUnassignedPermissions = filteredUnassignedPermissions.slice(unassignedStartIndex, unassignedEndIndex);

  // Handle member selection
  const handleMemberSelect = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSelectCurrentPage = () => {
    const currentPageIds = currentNonGroupMembers.map(m => m.id);
    const allSelected = currentPageIds.every(id => selectedMembers.includes(id));
    
    if (allSelected) {
      setSelectedMembers(prev => prev.filter(id => !currentPageIds.includes(id)));
    } else {
      setSelectedMembers(prev => [...new Set([...prev, ...currentPageIds])]);
    }
  };

  const handleSelectAll = () => {
    if (selectedMembers.length === filteredNonGroupMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredNonGroupMembers.map(m => m.id));
    }
  };

  const handleRemoveMember = (memberId: string, memberName: string) => {
    if (confirm(`Are you sure you want to remove ${memberName} from this group?`)) {
      console.log('Removing member:', memberId);
      alert(`${memberName} has been removed from the group.`);
    }
  };

  const handleAddMembers = () => {
    if (selectedMembers.length === 0) {
      alert('Please select at least one member to add.');
      return;
    }
    
    console.log('Adding members:', selectedMembers);
    alert(`${selectedMembers.length} member(s) have been added to the group.`);
    setSelectedMembers([]);
  };

  // Handle permission selection
  const handlePermissionSelect = (permissionId: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId) 
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSelectAllPermissions = () => {
    if (selectedPermissions.length === filteredUnassignedPermissions.length) {
      setSelectedPermissions([]);
    } else {
      setSelectedPermissions(filteredUnassignedPermissions.map(p => p.id));
    }
  };

  const handleSavePermissions = () => {
    console.log('Saving selected permissions:', selectedPermissions);
    alert(`Added ${selectedPermissions.length} permissions to group`);
    setSelectedPermissions([]);
  };

  // Handle filter type changes
  const handleAssignedFilterTypeChange = (type: string) => {
    setAssignedFilterType(type);
    setAssignedApplicationFilter('all');
    setAssignedRoleFilter('all');
    setAssignedCurrentPage(1);
  };

  const handleUnassignedFilterTypeChange = (type: string) => {
    setUnassignedFilterType(type);
    setUnassignedApplicationFilter('select');
    setUnassignedRoleFilter('select');
    setUnassignedCurrentPage(1);
  };

  // Check if unassigned permissions should be shown
  const shouldShowUnassignedPermissions = () => {
    if (unassignedFilterType === 'application') return unassignedApplicationFilter !== 'select';
    if (unassignedFilterType === 'application-roles') {
      return unassignedApplicationFilter !== 'select' && unassignedRoleFilter !== 'select';
    }
    return false;
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
    setUploadFile(null);
    setShowUploadModal(false);
    alert('CSV file uploaded successfully! Permissions have been added to the group.');
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

  // Reset to first page when filters change
  React.useEffect(() => {
    setMemberCurrentPage(1);
  }, [memberSearchTerm, memberStatusFilter]);

  React.useEffect(() => {
    setAddMemberCurrentPage(1);
  }, [addMemberSearchTerm, addMemberStatusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/group"
            className="inline-flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Groups
          </Link>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Edit Group
        </button>
      </div>

      {/* Group Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{group.name}</h1>
              <p className="text-gray-600 mt-1">{group.description}</p>
              <div className="flex items-center mt-2">
                <StatusBadge status={group.status} size="md" />
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Created by</p>
            <p className="font-medium text-gray-900">{group.createdBy}</p>
            <p className="text-sm text-gray-500 mt-1">{new Date(group.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Group Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Group Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Total Members</p>
              <p className="font-medium text-gray-900">{group.totalUsers}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Created By</p>
              <p className="font-medium text-gray-900">{group.createdBy}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Created Date</p>
              <p className="font-medium text-gray-900">{new Date(group.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Group Members Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Group Members ({filteredGroupMembers.length})
          </h2>
        </div>

        {/* Group Members Filters */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search members by name..."
                value={memberSearchTerm}
                onChange={(e) => setMemberSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={memberStatusFilter}
              onChange={(e) => setMemberStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Group Members Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NIP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentGroupMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.nip}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={member.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleRemoveMember(member.id, member.name)}
                      className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                    >
                      <UserMinus className="w-4 h-4 mr-1" />
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Group Members Pagination */}
        {memberTotalPages > 1 && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 pt-4 border-t border-gray-200 space-y-3 md:space-y-0">
            <div className="text-sm text-gray-500">
              Showing {memberStartIndex + 1} to {Math.min(memberEndIndex, filteredGroupMembers.length)} of {filteredGroupMembers.length} members
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMemberCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={memberCurrentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, memberTotalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setMemberCurrentPage(page)}
                      className={`px-3 py-1 text-sm rounded-md ${
                        memberCurrentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setMemberCurrentPage(prev => Math.min(prev + 1, memberTotalPages))}
                disabled={memberCurrentPage === memberTotalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Member Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Add Members ({filteredNonGroupMembers.length} available)
          </h2>
          {selectedMembers.length > 0 && (
            <button
              onClick={handleAddMembers}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Selected ({selectedMembers.length})
            </button>
          )}
        </div>

        {/* Add Member Filters */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users by name..."
                value={addMemberSearchTerm}
                onChange={(e) => setAddMemberSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={addMemberStatusFilter}
              onChange={(e) => setAddMemberStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            
            <button
              onClick={handleSelectCurrentPage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Select Page
            </button>
            
            <button
              onClick={handleSelectAll}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {selectedMembers.length === filteredNonGroupMembers.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        </div>

        {/* Add Member Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Select
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NIP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentNonGroupMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => handleMemberSelect(member.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.nip}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={member.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Member Pagination */}
        {addMemberTotalPages > 1 && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 pt-4 border-t border-gray-200 space-y-3 md:space-y-0">
            <div className="text-sm text-gray-500">
              Showing {addMemberStartIndex + 1} to {Math.min(addMemberEndIndex, filteredNonGroupMembers.length)} of {filteredNonGroupMembers.length} users
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAddMemberCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={addMemberCurrentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, addMemberTotalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setAddMemberCurrentPage(page)}
                      className={`px-3 py-1 text-sm rounded-md ${
                        addMemberCurrentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setAddMemberCurrentPage(prev => Math.min(prev + 1, addMemberTotalPages))}
                disabled={addMemberCurrentPage === addMemberTotalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter By</label>
              <select
                value={assignedFilterType}
                onChange={(e) => handleAssignedFilterTypeChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="application">Application</option>
                <option value="application-roles">Application & Roles</option>
              </select>
            </div>

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
          <div className="flex items-center space-x-3">
            {selectedPermissions.length > 0 && (
              <button
                onClick={handleSavePermissions}
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
                onClick={handleSelectAllPermissions}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {selectedPermissions.length === filteredUnassignedPermissions.length ? 'Deselect All' : 'Select All'}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter By</label>
              <select
                value={unassignedFilterType}
                onChange={(e) => handleUnassignedFilterTypeChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="application">Application</option>
                <option value="application-roles">Application & Roles</option>
              </select>
            </div>

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
              Please select an application or application & role to view available permissions.
            </p>
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
              CSV should contain columns: Application Name, Permission Name, Role Name (optional)
            </p>
            
            <div className="mb-4">
              <button
                onClick={downloadTemplate}
                className="text-blue-600 hover:text-blue-500 text-sm underline"
              >
                Download CSV Template
              </button>
            </div>
            
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