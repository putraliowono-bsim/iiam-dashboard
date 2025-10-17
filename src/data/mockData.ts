import { Identity, Application, Component, Role, Permission } from '../types';

export const permissions: Permission[] = [
  { id: '1', name: 'User Management', action: 'create', resource: 'users', description: 'Create new users' },
  { id: '2', name: 'User View', action: 'read', resource: 'users', description: 'View user information' },
  { id: '3', name: 'User Edit', action: 'update', resource: 'users', description: 'Edit user information' },
  { id: '4', name: 'User Delete', action: 'delete', resource: 'users', description: 'Delete users' },
  { id: '5', name: 'Report Generate', action: 'execute', resource: 'reports', description: 'Generate reports' },
  { id: '6', name: 'System Config', action: 'update', resource: 'system', description: 'Modify system configuration' },
  { id: '7', name: 'Audit View', action: 'read', resource: 'audit', description: 'View audit logs' },
  { id: '8', name: 'Application Management', action: 'create', resource: 'applications', description: 'Manage applications' },
  { id: '9', name: 'Role Management', action: 'create', resource: 'roles', description: 'Create and manage user roles' },
  { id: '10', name: 'Role View', action: 'read', resource: 'roles', description: 'View role information' },
  { id: '11', name: 'Role Edit', action: 'update', resource: 'roles', description: 'Edit role permissions' },
  { id: '12', name: 'Role Delete', action: 'delete', resource: 'roles', description: 'Delete user roles' },
  { id: '13', name: 'Department Management', action: 'create', resource: 'departments', description: 'Manage departments' },
  { id: '14', name: 'Department View', action: 'read', resource: 'departments', description: 'View department information' },
  { id: '15', name: 'Department Edit', action: 'update', resource: 'departments', description: 'Edit department details' },
  { id: '16', name: 'Department Delete', action: 'delete', resource: 'departments', description: 'Delete departments' },
  { id: '17', name: 'Project Management', action: 'create', resource: 'projects', description: 'Create and manage projects' },
  { id: '18', name: 'Project View', action: 'read', resource: 'projects', description: 'View project information' },
  { id: '19', name: 'Project Edit', action: 'update', resource: 'projects', description: 'Edit project details' },
  { id: '20', name: 'Project Delete', action: 'delete', resource: 'projects', description: 'Delete projects' },
  { id: '21', name: 'Task Management', action: 'create', resource: 'tasks', description: 'Create and assign tasks' },
  { id: '22', name: 'Task View', action: 'read', resource: 'tasks', description: 'View task information' },
  { id: '23', name: 'Task Edit', action: 'update', resource: 'tasks', description: 'Edit task details' },
  { id: '24', name: 'Task Delete', action: 'delete', resource: 'tasks', description: 'Delete tasks' },
  { id: '25', name: 'File Upload', action: 'create', resource: 'files', description: 'Upload files to system' },
  { id: '26', name: 'File View', action: 'read', resource: 'files', description: 'View and download files' },
  { id: '27', name: 'File Edit', action: 'update', resource: 'files', description: 'Edit file metadata' },
  { id: '28', name: 'File Delete', action: 'delete', resource: 'files', description: 'Delete files from system' },
  { id: '29', name: 'Settings Management', action: 'update', resource: 'settings', description: 'Modify system settings' },
  { id: '30', name: 'Settings View', action: 'read', resource: 'settings', description: 'View system settings' },
  { id: '31', name: 'Backup Create', action: 'execute', resource: 'backup', description: 'Create system backups' },
  { id: '32', name: 'Backup Restore', action: 'execute', resource: 'backup', description: 'Restore from backups' },
  { id: '33', name: 'Log Management', action: 'read', resource: 'logs', description: 'View system logs' },
  { id: '34', name: 'Log Export', action: 'execute', resource: 'logs', description: 'Export log files' },
  { id: '35', name: 'Notification Send', action: 'create', resource: 'notifications', description: 'Send notifications to users' },
  { id: '36', name: 'Notification View', action: 'read', resource: 'notifications', description: 'View notification history' },
  { id: '37', name: 'Analytics View', action: 'read', resource: 'analytics', description: 'View analytics dashboard' },
  { id: '38', name: 'Analytics Export', action: 'execute', resource: 'analytics', description: 'Export analytics data' },
  { id: '39', name: 'Security Audit', action: 'read', resource: 'security', description: 'View security audit logs' },
  { id: '40', name: 'Security Config', action: 'update', resource: 'security', description: 'Configure security settings' },
  { id: '41', name: 'API Access', action: 'execute', resource: 'api', description: 'Access system APIs' },
  { id: '42', name: 'API Management', action: 'create', resource: 'api', description: 'Manage API endpoints' },
  { id: '43', name: 'Database View', action: 'read', resource: 'database', description: 'View database information' },
  { id: '44', name: 'Database Backup', action: 'execute', resource: 'database', description: 'Create database backups' },
  { id: '45', name: 'Integration Management', action: 'create', resource: 'integrations', description: 'Manage third-party integrations' },
  { id: '46', name: 'Integration View', action: 'read', resource: 'integrations', description: 'View integration status' },
  { id: '47', name: 'Workflow Management', action: 'create', resource: 'workflows', description: 'Create and manage workflows' },
  { id: '48', name: 'Workflow Execute', action: 'execute', resource: 'workflows', description: 'Execute workflow processes' },
  { id: '49', name: 'Template Management', action: 'create', resource: 'templates', description: 'Manage document templates' },
  { id: '50', name: 'Template View', action: 'read', resource: 'templates', description: 'View available templates' },
];

export const roles: Role[] = [
  {
    id: '1',
    name: 'System Administrator',
    description: 'Full system access and control',
    level: 'admin',
    permissions: permissions
  },
  {
    id: '2',
    name: 'HR Manager',
    description: 'Human resources management access',
    level: 'manager',
    permissions: permissions.slice(0, 5)
  },
  {
    id: '3',
    name: 'Department Manager',
    description: 'Department-level management access',
    level: 'manager',
    permissions: permissions.slice(1, 6)
  },
  {
    id: '4',
    name: 'Regular User',
    description: 'Standard user access',
    level: 'user',
    permissions: permissions.slice(1, 3)
  },
  {
    id: '5',
    name: 'Viewer',
    description: 'Read-only access',
    level: 'viewer',
    permissions: [permissions[1], permissions[6]]
  }
];

export const components: Component[] = [
  {
    id: '1',
    name: 'User Profile Management',
    type: 'module',
    description: 'Manage user profiles and personal information',
    permissions: permissions.slice(0, 4),
    status: 'active'
  },
  {
    id: '2',
    name: 'Reporting Dashboard',
    type: 'feature',
    description: 'Generate and view various reports',
    permissions: [permissions[4], permissions[6]],
    status: 'active'
  },
  {
    id: '3',
    name: 'Authentication Service',
    type: 'service',
    description: 'Handle user authentication and authorization',
    permissions: permissions.slice(0, 2),
    status: 'active'
  },
  {
    id: '4',
    name: 'Notification System',
    type: 'service',
    description: 'Send notifications to users',
    permissions: [permissions[1]],
    status: 'inactive'
  },
  {
    id: '5',
    name: 'File Management',
    type: 'module',
    description: 'Upload and manage files',
    permissions: permissions.slice(0, 4),
    status: 'active'
  }
];

export const applications: Application[] = [
  {
    id: '1',
    name: 'HR Management System',
    url: 'https://hr.company.com',
    description: 'Human resources management application',
    status: 'active',
    components: components.slice(0, 3),
    assignedUsers: 45,
    createdAt: '2023-01-15',
    lastUpdated: '2024-12-15'
  },
  {
    id: '2',
    name: 'Finance Portal',
    url: 'https://finance.company.com',
    description: 'Financial management and reporting system',
    status: 'active',
    components: components.slice(1, 4),
    assignedUsers: 28,
    createdAt: '2023-03-20',
    lastUpdated: '2024-11-30'
  },
  {
    id: '3',
    name: 'Project Management Tool',
    url: 'https://projects.company.com',
    description: 'Collaborative project management platform',
    status: 'active',
    components: [components[0], components[2], components[4]],
    assignedUsers: 67,
    createdAt: '2023-06-10',
    lastUpdated: '2024-12-10'
  },
  {
    id: '4',
    name: 'Document Management',
    url: 'https://docs.company.com',
    description: 'Document storage and collaboration system',
    status: 'active',
    components: [components[0], components[4]],
    assignedUsers: 89,
    createdAt: '2023-08-05',
    lastUpdated: '2024-12-12'
  },
  {
    id: '5',
    name: 'Analytics Dashboard',
    url: 'https://analytics.company.com',
    description: 'Business intelligence and analytics platform',
    status: 'inactive',
    components: [components[1], components[2]],
    assignedUsers: 15,
    createdAt: '2023-11-12',
    lastUpdated: '2024-10-20'
  }
];

export const identities: Identity[] = [
  {
    id: '1',
    nip: '02001',
    name: 'John Anderson',
    email: 'john.anderson@company.com',
    department: 'SDE',
    position: 'department head',
    status: 'active',
    applications: applications.slice(0, 4),
    roles: [roles[0]],
    permissions: permissions,
    lastLogin: '2024-12-15T10:30:00Z',
    createdAt: '2023-01-15'
  },
  {
    id: '2',
    nip: '02045',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'PM',
    position: 'division head',
    status: 'active',
    applications: applications.slice(0, 2),
    roles: [roles[1]],
    permissions: permissions.slice(0, 5),
    lastLogin: '2024-12-15T09:15:00Z',
    createdAt: '2023-02-01'
  },
  {
    id: '3',
    nip: '02156',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    department: 'SDE',
    position: 'section head',
    status: 'active',
    applications: [applications[1], applications[4]],
    roles: [roles[2]],
    permissions: permissions.slice(1, 6),
    lastLogin: '2024-12-14T16:45:00Z',
    createdAt: '2023-03-10'
  },
  {
    id: '4',
    nip: '02234',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    department: 'PM',
    position: 'staff',
    status: 'active',
    applications: [applications[2], applications[3]],
    roles: [roles[3]],
    permissions: permissions.slice(1, 3),
    lastLogin: '2024-12-15T11:20:00Z',
    createdAt: '2023-04-05'
  },
  {
    id: '5',
    nip: '02567',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    department: 'SDE',
    position: 'section head',
    status: 'active',
    applications: applications.slice(2, 5),
    roles: [roles[2]],
    permissions: permissions.slice(1, 6),
    lastLogin: '2024-12-13T14:30:00Z',
    createdAt: '2023-05-20'
  },
  {
    id: '6',
    nip: '02789',
    name: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@company.com',
    department: 'PM',
    position: 'staff',
    status: 'inactive',
    applications: [applications[3]],
    roles: [roles[4]],
    permissions: [permissions[1], permissions[6]],
    lastLogin: '2024-12-01T08:15:00Z',
    createdAt: '2023-07-15'
  },
  {
    id: '7',
    nip: '02890',
    name: 'Robert Taylor',
    email: 'robert.taylor@company.com',
    department: 'SDE',
    position: 'staff',
    status: 'active',
    applications: [applications[0], applications[2], applications[3]],
    roles: [roles[2]],
    permissions: permissions.slice(1, 6),
    lastLogin: '2024-12-15T13:10:00Z',
    createdAt: '2023-08-30'
  },
  {
    id: '8',
    nip: '02945',
    name: 'Jennifer Brown',
    email: 'jennifer.brown@company.com',
    department: 'PM',
    position: 'section head',
    status: 'active',
    applications: applications.slice(0, 3),
    roles: [roles[3]],
    permissions: permissions.slice(1, 4),
    lastLogin: '2024-12-15T12:00:00Z',
    createdAt: '2023-09-12'
  }
];