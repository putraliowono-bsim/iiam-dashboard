import React from 'react';
import { UserPlus, Upload, X, CheckCircle } from 'lucide-react';

interface InternTraineeData {
  nip: string;
  name: string;
  email: string;
  directLeaderNip: string;
  directLeaderName: string;
  directLeaderEmail: string;
  directLeaderPosition: string;
  organizationUnit: string;
  type: 'intern' | 'trainee';
}

// Mock data for direct leaders lookup (NIP without alphabet)
const mockDirectLeaders = [
  {
    nip: '001',
    name: 'John Anderson',
    email: 'john.anderson@banksinarmas.com',
    position: 'Department Head',
    organizationUnit: 'Software Development'
  },
  {
    nip: '002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@banksinarmas.com',
    position: 'Division Head',
    organizationUnit: 'Project Management'
  },
  {
    nip: '003',
    name: 'Michael Chen',
    email: 'michael.chen@banksinarmas.com',
    position: 'Section Head',
    organizationUnit: 'Quality Assurance'
  },
  {
    nip: '004',
    name: 'Emily Davis',
    email: 'emily.davis@banksinarmas.com',
    position: 'Team Lead',
    organizationUnit: 'Human Resources'
  },
  {
    nip: '005',
    name: 'David Wilson',
    email: 'david.wilson@banksinarmas.com',
    position: 'Manager',
    organizationUnit: 'Finance'
  }
];

export default function InternTrainee() {
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [formData, setFormData] = React.useState<InternTraineeData>({
    nip: '',
    name: '',
    email: '',
    directLeaderNip: '',
    directLeaderName: '',
    directLeaderEmail: '',
    directLeaderPosition: '',
    organizationUnit: '',
    type: 'intern'
  });
  const [errors, setErrors] = React.useState<Partial<InternTraineeData>>({});

  const handleInputChange = (field: keyof InternTraineeData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-fill direct leader information when NIP is entered
    if (field === 'directLeaderNip') {
      const leader = mockDirectLeaders.find(l => l.nip === value);
      if (leader) {
        setFormData(prev => ({
          ...prev,
          directLeaderNip: value,
          directLeaderName: leader.name,
          directLeaderEmail: leader.email,
          directLeaderPosition: leader.position,
          organizationUnit: leader.organizationUnit
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          directLeaderNip: value,
          directLeaderName: '',
          directLeaderEmail: '',
          directLeaderPosition: '',
          organizationUnit: ''
        }));
      }
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<InternTraineeData> = {};

    // NIP validation - must contain alphabet (for intern/trainee)
    if (!formData.nip) {
      newErrors.nip = 'NIP is required';
    } else if (!/[a-zA-Z]/.test(formData.nip)) {
      newErrors.nip = 'NIP must contain at least one alphabet character';
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation - must contain @banksinarmas.com
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@banksinarmas.com')) {
      newErrors.email = 'Email must contain @banksinarmas.com';
    }

    // Direct leader NIP validation - must NOT contain alphabet (for employee)
    if (!formData.directLeaderNip) {
      newErrors.directLeaderNip = 'Direct leader NIP is required';
    } else if (/[a-zA-Z]/.test(formData.directLeaderNip)) {
      newErrors.directLeaderNip = 'Direct leader NIP must not contain alphabet characters';
    }

    // Check if direct leader exists
    if (formData.directLeaderNip && !formData.directLeaderName) {
      newErrors.directLeaderNip = 'Direct leader not found';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const confirmSubmit = () => {
    console.log('Adding intern/trainee:', formData);
    setShowConfirmation(false);
    
    // Reset form
    setFormData({
      nip: '',
      name: '',
      email: '',
      directLeaderNip: '',
      directLeaderName: '',
      directLeaderEmail: '',
      directLeaderPosition: '',
      organizationUnit: '',
      type: 'intern'
    });
    setErrors({});
    alert(`${formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} added successfully!`);
  };

  const handleCancel = () => {
    setFormData({
      nip: '',
      name: '',
      email: '',
      directLeaderNip: '',
      directLeaderName: '',
      directLeaderEmail: '',
      directLeaderPosition: '',
      organizationUnit: '',
      type: 'intern'
    });
    setErrors({});
  };

  const downloadTemplate = () => {
    const csvContent = 'NIP,Name,Email,Direct Leader NIP,Type\nINT001,John Doe,john.doe@banksinarmas.com,001,intern\nTRN001,Jane Smith,jane.smith@banksinarmas.com,002,trainee';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'intern_trainee_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Intern/Trainee Registration</h1>
          <p className="text-gray-600 mt-1">Register new intern or trainee employees</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <UserPlus className="w-8 h-8 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Employee Registration Form</h2>
          </div>
          <p className="text-gray-600">Fill in the details below to register a new intern or trainee</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NIP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NIP *
              </label>
              <input
                type="text"
                required
                value={formData.nip}
                onChange={(e) => handleInputChange('nip', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.nip ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter NIP (must contain alphabet)"
              />
              {errors.nip && <p className="text-red-500 text-xs mt-1">{errors.nip}</p>}
              <p className="text-xs text-gray-500 mt-1">Example: INT001, TRN001</p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter full name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="name@banksinarmas.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="intern">Intern</option>
                <option value="trainee">Trainee</option>
              </select>
            </div>

            {/* Direct Leader NIP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Direct Leader NIP *
              </label>
              <input
                type="text"
                required
                value={formData.directLeaderNip}
                onChange={(e) => handleInputChange('directLeaderNip', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.directLeaderNip ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter direct leader NIP (numbers only)"
              />
              {errors.directLeaderNip && <p className="text-red-500 text-xs mt-1">{errors.directLeaderNip}</p>}
              <p className="text-xs text-gray-500 mt-1">Available NIPs: 001, 002, 003, 004, 005</p>
            </div>

            {/* Direct Leader Name (Auto-filled) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Direct Leader Name
              </label>
              <input
                type="text"
                value={formData.directLeaderName}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Auto-filled when NIP is entered"
              />
            </div>

            {/* Direct Leader Email (Auto-filled) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Direct Leader Email
              </label>
              <input
                type="email"
                value={formData.directLeaderEmail}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Auto-filled when NIP is entered"
              />
            </div>

            {/* Direct Leader Position (Auto-filled) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Direct Leader Position
              </label>
              <input
                type="text"
                value={formData.directLeaderPosition}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Auto-filled when NIP is entered"
              />
            </div>

            {/* Organization Unit (Auto-filled) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Unit
              </label>
              <input
                type="text"
                value={formData.organizationUnit}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Auto-filled when direct leader NIP is entered"
              />
            </div>
          </div>

          {/* CSV Upload Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Bulk Upload (Optional)</h3>
            <div className="mb-4">
              <button
                type="button"
                onClick={downloadTemplate}
                className="text-blue-600 hover:text-blue-500 text-sm underline"
              >
                Download CSV Template
              </button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
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
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              CSV should contain columns: NIP, Name, Email, Direct Leader NIP, Type
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Confirm Registration</h3>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to register this {formData.type}?
              </p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">NIP:</span>
                  <span className="text-sm font-medium text-gray-900">{formData.nip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Name:</span>
                  <span className="text-sm font-medium text-gray-900">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Email:</span>
                  <span className="text-sm font-medium text-gray-900">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Type:</span>
                  <span className="text-sm font-medium text-gray-900">{formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Direct Leader:</span>
                  <span className="text-sm font-medium text-gray-900">{formData.directLeaderName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Organization Unit:</span>
                  <span className="text-sm font-medium text-gray-900">{formData.organizationUnit}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Confirm Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}