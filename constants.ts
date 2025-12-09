import { DashboardData, Project } from './types';

export const PROJECTS: Project[] = [
  { id: 'p1', name: 'WABAG', location: 'Chennai', status: 'Active' },
  { id: 'p2', name: 'SRM AP', location: 'Amaravati', status: 'Active' },
  { id: 'p3', name: 'Pune', location: 'Pune', status: 'Active' },
  { id: 'p4', name: 'Blue Star', location: 'Mumbai', status: 'Active' },
];

// Mock backend data generator
export const getProjectData = (projectId: string): DashboardData | null => {
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return null;

  // Simulate slightly different data per project for realism
  const multiplier = projectId === 'p1' ? 1 : projectId === 'p2' ? 0.8 : projectId === 'p3' ? 1.2 : 0.6;

  return {
    project,
    stats: {
      totalSiteExpenses: 12450000 * multiplier,
      wages: 3200000 * multiplier,
      pettyCash: 150000 * multiplier,
      materialUsed: 6500000 * multiplier,
      vendorPayments: 2600000 * multiplier,
      budget: 15000000 * multiplier,
      actual: 12450000 * multiplier,
      runningBalance: 2550000 * multiplier,
      approvalsPending: Math.floor(12 * multiplier),
      currency: 'INR',
      lastUpdated: new Date().toLocaleDateString(),
    },
    chartData: [
      { month: 'Jan', budget: 1000000 * multiplier, actual: 850000 * multiplier },
      { month: 'Feb', budget: 1200000 * multiplier, actual: 1100000 * multiplier },
      { month: 'Mar', budget: 1100000 * multiplier, actual: 1300000 * multiplier }, // Over budget
      { month: 'Apr', budget: 1400000 * multiplier, actual: 1250000 * multiplier },
      { month: 'May', budget: 1500000 * multiplier, actual: 1400000 * multiplier },
      { month: 'Jun', budget: 1300000 * multiplier, actual: 1100000 * multiplier },
    ],
    recentTransactions: [
      { id: 't1', vendor: 'Ultratech Cement', amount: 450000 * multiplier, date: '2023-10-25', category: 'Material', status: 'Approved' },
      { id: 't2', vendor: 'Local Labor Force', amount: 120000 * multiplier, date: '2023-10-24', category: 'Wages', status: 'Approved' },
      { id: 't3', vendor: 'JCB Rentals', amount: 35000 * multiplier, date: '2023-10-23', category: 'Equipment', status: 'Pending' },
      { id: 't4', vendor: 'Asian Paints', amount: 85000 * multiplier, date: '2023-10-22', category: 'Material', status: 'Approved' },
      { id: 't5', vendor: 'Site Office Supplies', amount: 5000 * multiplier, date: '2023-10-21', category: 'Petty Cash', status: 'Approved' },
    ]
  };
};