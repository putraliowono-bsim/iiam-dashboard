import React from 'react';
import { Save, Shield, Clock, Key, AlertTriangle } from 'lucide-react';

interface PolicySettings {
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireLowercase: boolean;
  passwordRequireNumbers: boolean;
  passwordRequireSpecialChars: boolean;
  passwordExpiryDays: number;
  sessionTimeoutMinutes: number;
  maxLoginAttempts: number;
  lockoutDurationMinutes: number;
}

export default function Policies() {
  const [settings, setSettings] = React.useState<PolicySettings>({
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecialChars: false,
    passwordExpiryDays: 90,
    sessionTimeoutMinutes: 30,
    maxLoginAttempts: 5,
    lockoutDurationMinutes: 15,
  });

  const [hasChanges, setHasChanges] = React.useState(false);

  const handleInputChange = (field: keyof PolicySettings, value: number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving policy settings:', settings);
    setHasChanges(false);
    // Implementation for saving settings
    alert('Policy settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Policies</h1>
          <p className="text-gray-600 mt-1">Manage password policies, expired session and security settings</p>
        </div>
        {hasChanges && (
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        )}
      </div>

      {/* Policy Summary - Moved to Top with Enhanced Design */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm border border-blue-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Current Policy Configuration</h2>
            <p className="text-gray-600">Overview of your current security settings</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{settings.passwordMinLength}</div>
            <div className="text-sm text-gray-600">Min Password Length</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
            <div className="text-2xl font-bold text-green-600">{settings.passwordExpiryDays}</div>
            <div className="text-sm text-gray-600">Password Expiry (days)</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">{settings.sessionTimeoutMinutes}</div>
            <div className="text-sm text-gray-600">Session Timeout (min)</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
            <div className="text-2xl font-bold text-red-600">{settings.maxLoginAttempts}</div>
            <div className="text-sm text-gray-600">Max Login Attempts</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{settings.lockoutDurationMinutes}</div>
            <div className="text-sm text-gray-600">Lockout Duration (min)</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Password Policies */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Password Policies</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Password Length
              </label>
              <input
                type="number"
                min="6"
                max="32"
                value={settings.passwordMinLength}
                onChange={(e) => handleInputChange('passwordMinLength', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Password Requirements
              </label>
              
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.passwordRequireUppercase}
                    onChange={(e) => handleInputChange('passwordRequireUppercase', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Require uppercase letters (A-Z)</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.passwordRequireLowercase}
                    onChange={(e) => handleInputChange('passwordRequireLowercase', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Require lowercase letters (a-z)</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.passwordRequireNumbers}
                    onChange={(e) => handleInputChange('passwordRequireNumbers', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Require numbers (0-9)</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.passwordRequireSpecialChars}
                    onChange={(e) => handleInputChange('passwordRequireSpecialChars', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Require special characters (!@#$%^&*)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password Expiry (days)
              </label>
              <input
                type="number"
                min="30"
                max="365"
                value={settings.passwordExpiryDays}
                onChange={(e) => handleInputChange('passwordExpiryDays', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Users will be required to change their password after this period</p>
            </div>
          </div>
        </div>

        {/* Session Policies */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Session Policies</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                min="5"
                max="480"
                value={settings.sessionTimeoutMinutes}
                onChange={(e) => handleInputChange('sessionTimeoutMinutes', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Users will be automatically logged out after this period of inactivity</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Login Attempts
              </label>
              <input
                type="number"
                min="3"
                max="10"
                value={settings.maxLoginAttempts}
                onChange={(e) => handleInputChange('maxLoginAttempts', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Lockout Duration (minutes)
              </label>
              <input
                type="number"
                min="5"
                max="60"
                value={settings.lockoutDurationMinutes}
                onChange={(e) => handleInputChange('lockoutDurationMinutes', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Account will be locked for this duration after exceeding maximum login attempts</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}