export interface Project {
  id: string;
  name: string;
  location: string;
  status: 'Active' | 'Completed' | 'On Hold';
}

export interface FinancialStats {
  totalSiteExpenses: number;
  wages: number;
  pettyCash: number;
  materialUsed: number;
  vendorPayments: number;
  budget: number;
  actual: number;
  runningBalance: number;
  approvalsPending: number;
  currency: string;
  lastUpdated: string;
}

export interface MonthlyData {
  month: string;
  budget: number;
  actual: number;
}

export interface DashboardData {
  project: Project;
  stats: FinancialStats;
  chartData: MonthlyData[];
  recentTransactions: Transaction[];
}

export interface Transaction {
  id: string;
  vendor: string;
  amount: number;
  date: string;
  category: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}
