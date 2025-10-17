import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, CheckCircle } from 'lucide-react';

export default function AddApplication() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: '',
    url: '',
    description: ''
  });
  const [csvFile, setCsvFile] = React.useState<File | null>(null);
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.url) {
      alert('Please fill in all required fields');
      return;
    }
    setShowConfirmation(true);
  };

  const confirmSubmit = () => {
    console.log('Adding application:', formData);
    console.log('CSV file:', csvFile);
    
    setShowConfirmation(false);
    alert('Application added successfully!');
    navigate('/setup/applications');
  };

  const handleCancel = () => {
    navigate('/setup/applications');
  };

  const downloadTemplate = () => {
    const csvContent = 'Permission,Roles\nUser Management,Administrator\nReport Generate,\nTask Management,Manager';
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
            to="/setup/applications"
            className="inline-flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Applications
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add New Application</h1>
          <p className="text-gray-600 mt-1">Create a new application and configure its permissions and roles</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Application Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter application name"
            />
          </div>

          {/* Application URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application URL *
            </label>
            <input
              type="url"
              required
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter application description"
            />
          </div>

          {/* CSV Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bulk Upload Permissions & Roles (CSV)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <button
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
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
                </div>
                {csvFile && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      Selected: {csvFile.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              CSV should contain columns: Permission, and Roles (optional)
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
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
              <h3 className="text-lg font-semibold text-gray-900">Confirm Application Creation</h3>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to create this application?
              </p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Name:</span>
                  <span className="text-sm font-medium text-gray-900">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">URL:</span>
                  <span className="text-sm font-medium text-gray-900">{formData.url}</span>
                </div>
                {csvFile && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">CSV File:</span>
                    <span className="text-sm font-medium text-gray-900">{csvFile.name}</span>
                  </div>
                )}
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
                Create Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}