import React from 'react';
import { RefreshCw, Clock, CheckCircle, XCircle, AlertTriangle, Users, Calendar, Play } from 'lucide-react';

interface SyncHistory {
  id: string;
  date: string;
  status: 'success' | 'failed' | 'partial';
  totalIdentities: number;
  syncedIdentities: number;
  failedIdentities: number;
  duration: string;
  source: 'scheduled' | 'manual';
  details: string;
}

const mockSyncHistory: SyncHistory[] = [
  {
    id: '1',
    date: '2024-12-15T02:00:00Z',
    status: 'success',
    totalIdentities: 1250,
    syncedIdentities: 1250,
    failedIdentities: 0,
    duration: '2m 45s',
    source: 'scheduled',
    details: 'All identities synchronized successfully'
  },
  {
    id: '2',
    date: '2024-12-14T02:00:00Z',
    status: 'partial',
    totalIdentities: 1248,
    syncedIdentities: 1245,
    failedIdentities: 3,
    duration: '3m 12s',
    source: 'scheduled',
    details: '3 identities failed due to invalid email format'
  },
  {
    id: '3',
    date: '2024-12-13T14:30:00Z',
    status: 'success',
    totalIdentities: 1248,
    syncedIdentities: 1248,
    failedIdentities: 0,
    duration: '2m 38s',
    source: 'manual',
    details: 'Manual sync completed successfully'
  },
  {
    id: '4',
    date: '2024-12-13T02:00:00Z',
    status: 'failed',
    totalIdentities: 1248,
    syncedIdentities: 0,
    failedIdentities: 1248,
    duration: '0m 15s',
    source: 'scheduled',
    details: 'Connection to Active Directory failed'
  },
  {
    id: '5',
    date: '2024-12-12T02:00:00Z',
    status: 'success',
    totalIdentities: 1246,
    syncedIdentities: 1246,
    failedIdentities: 0,
    duration: '2m 52s',
    source: 'scheduled',
    details: 'All identities synchronized successfully'
  },
  {
    id: '6',
    date: '2024-12-11T02:00:00Z',
    status: 'success',
    totalIdentities: 1244,
    syncedIdentities: 1244,
    failedIdentities: 0,
    duration: '2m 41s',
    source: 'scheduled',
    details: 'All identities synchronized successfully'
  },
  {
    id: '7',
    date: '2024-12-10T02:00:00Z',
    status: 'partial',
    totalIdentities: 1242,
    syncedIdentities: 1240,
    failedIdentities: 2,
    duration: '3m 05s',
    source: 'scheduled',
    details: '2 identities failed due to duplicate NIP'
  }
];

export default function IdentitySync() {
  const [isRunning, setIsRunning] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'partial':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceBadge = (source: string) => {
    return source === 'manual' ? (
      <span className="px-2 py-1 text-xs rounded-full font-medium bg-blue-100 text-blue-800">
        Manual
      </span>
    ) : (
      <span className="px-2 py-1 text-xs rounded-full font-medium bg-gray-100 text-gray-800">
        Scheduled
      </span>
    );
  };

  const handleManualSync = () => {
    setShowConfirmModal(true);
  };

  const confirmManualSync = () => {
    setIsRunning(true);
    setShowConfirmModal(false);
    
    // Simulate sync process
    setTimeout(() => {
      setIsRunning(false);
      alert('Manual identity sync completed successfully!');
    }, 5000);
  };

  // Calculate statistics
  const totalSyncs = mockSyncHistory.length;
  const successfulSyncs = mockSyncHistory.filter(h => h.status === 'success').length;
  const failedSyncs = mockSyncHistory.filter(h => h.status === 'failed').length;
  const partialSyncs = mockSyncHistory.filter(h => h.status === 'partial').length;
  const lastSync = mockSyncHistory[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Sync</h1>
          <p className="text-gray-600 mt-1">Manage user synchronization between HCMS and Active Directory</p>
        </div>
        <button
          onClick={handleManualSync}
          disabled={isRunning}
          className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
            isRunning
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Syncing...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Run Manual Sync
            </>
          )}
        </button>
      </div>

      {/* Sync Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <RefreshCw className="w-8 h-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Syncs</p>
              <p className="text-2xl font-bold text-gray-900">{totalSyncs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Successful</p>
              <p className="text-2xl font-bold text-gray-900">{successfulSyncs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Partial</p>
              <p className="text-2xl font-bold text-gray-900">{partialSyncs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Failed</p>
              <p className="text-2xl font-bold text-gray-900">{failedSyncs}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Last Sync Total</p>
              <p className="text-2xl font-bold text-gray-900">{lastSync.totalIdentities}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Last Sync Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Last Sync Status</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getStatusIcon(lastSync.status)}
            <div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(lastSync.status)}`}>
                  {lastSync.status.charAt(0).toUpperCase() + lastSync.status.slice(1)}
                </span>
                {getSourceBadge(lastSync.source)}
              </div>
              <p className="text-sm text-gray-600 mt-1">{lastSync.details}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {lastSync.syncedIdentities} / {lastSync.totalIdentities} synced
            </p>
            <p className="text-sm text-gray-500">
              {new Date(lastSync.date).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Sync History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Sync History</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Identities
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Synced
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Failed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockSyncHistory.map((sync) => (
                <tr key={sync.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(sync.status)}
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(sync.status)}`}>
                        {sync.status.charAt(0).toUpperCase() + sync.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      {new Date(sync.date).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getSourceBadge(sync.source)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{sync.totalIdentities}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-green-600 font-medium">{sync.syncedIdentities}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${sync.failedIdentities > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                      {sync.failedIdentities}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{sync.duration}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs truncate">{sync.details}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Sync Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <Play className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Confirm Manual Sync</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to run a manual user synchronization? This will sync all users between HCMS and Active Directory.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                <p className="text-sm text-yellow-800">
                  This process may take several minutes to complete and will update existing user data.
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmManualSync}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Start Sync
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}