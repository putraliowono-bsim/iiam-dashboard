export interface Identity {
  id: string;
  nip: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'suspended';
  applications: Application[];
  roles: Role[];
  permissions: Permission[];
  lastLogin: string;
  createdAt: string;
}

export interface Application {
  id: string;
  name: string;
  url: string;
  description: string;
  status: 'active' | 'inactive' | 'maintenance';
  components: Component[];
  assignedUsers: number;
  createdAt: string;
  lastUpdated: string;
}

export interface Component {
  id: string;
  name: string;
  type: 'module' | 'feature' | 'service';
  description: string;
  permissions: Permission[];
  status: 'active' | 'inactive';
}

export interface Role {
  id: string;
  name: string;
  description: string;
  level: 'admin' | 'manager' | 'user' | 'viewer';
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'execute';
  resource: string;
  description: string;
}