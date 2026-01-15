export type RootStackParamList = {
  Login: undefined;
  LoginSuccess: undefined;
  OrganizationSelection: undefined;
  RoleSelection: { token: string; email?: string }; 
  Home: undefined;
  
  // Marketplace Screens
  Marketplace: undefined;
  ServiceCategories: undefined;
  ServiceDetails: { categoryId: string; serviceName: string };
  TaskUpload: { serviceId: string; serviceName: string };
  TaskDetails: { taskId: string };
  Payment: { taskId: string; amount: number };
  PaymentSuccess: { taskId: string; referenceId: string };
  
  // User Screens
  Profile: undefined;
  ClientProfile: { token: string; email?: string };
  OrderHistory: undefined;
  OrderDetails: { orderId: string };
  
  // Freelancer Screens
  FreelancerOnboarding: { token: string; email?: string };
  FreelancerDashboard: undefined;
  FreelancerTasks: undefined;
  FreelancerProfile: undefined;
  TaskWorkspace: { taskId: string };
  
  // Support & Communication
  Chat: { orderId: string; userId: string };
  Support: undefined;
  Help: undefined;
};
