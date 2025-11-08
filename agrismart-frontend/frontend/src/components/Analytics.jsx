import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Package, Users, ShoppingCart } from "lucide-react";

// Sample data for charts
const revenueData = [
  { month: 'Jan', revenue: 12000, transactions: 45 },
  { month: 'Feb', revenue: 15000, transactions: 52 },
  { month: 'Mar', revenue: 18000, transactions: 63 },
  { month: 'Apr', revenue: 22000, transactions: 78 },
  { month: 'May', revenue: 26000, transactions: 89 },
  { month: 'Jun', revenue: 31000, transactions: 95 },
];

const cropDistribution = [
  { name: 'Vegetables', value: 35, color: '#10b981' },
  { name: 'Fruits', value: 28, color: '#3b82f6' },
  { name: 'Cash Crops', value: 22, color: '#8b5cf6' },
  { name: 'Livestock', value: 15, color: '#f59e0b' },
];

const topProducts = [
  { name: 'Tomatoes', sales: 450 },
  { name: 'Avocados', sales: 380 },
  { name: 'Maize', sales: 320 },
  { name: 'Beans', sales: 280 },
  { name: 'Kales', sales: 250 },
];

// Stat Card Component
function StatCard({ title, value, change, icon: Icon, trend, color = "green" }) {
  const isPositive = trend === 'up';
  const colorClasses = {
    green: 'bg-green-50 text-green-600 border-green-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            {change && (
              <div className="flex items-center gap-1 mt-2">
                {isPositive ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {change}
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            )}
          </div>
          <div className={`p-4 rounded-full ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Analytics({ userRole = "farmer" }) {
  // Customize stats based on user role
  const farmerStats = [
    { title: "Total Revenue", value: "KES 156,000", change: "+12.5%", icon: DollarSign, trend: "up", color: "green" },
    { title: "Active Listings", value: "24", change: "+3", icon: Package, trend: "up", color: "blue" },
    { title: "Total Sales", value: "89", change: "+15.8%", icon: ShoppingCart, trend: "up", color: "purple" },
    { title: "Avg. Rating", value: "4.8/5", change: "+0.2", icon: TrendingUp, trend: "up", color: "amber" },
  ];

  const buyerStats = [
    { title: "Total Purchases", value: "KES 245,000", change: "+8.3%", icon: DollarSign, trend: "up", color: "green" },
    { title: "Orders Placed", value: "67", change: "+12", icon: ShoppingCart, trend: "up", color: "blue" },
    { title: "Favorite Vendors", value: "18", change: "+5", icon: Users, trend: "up", color: "purple" },
    { title: "Savings", value: "KES 45,000", change: "+22%", icon: TrendingUp, trend: "up", color: "amber" },
  ];

  const stats = userRole === "farmer" ? farmerStats : buyerStats;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>
              {userRole === "farmer" ? "Revenue Trend" : "Purchase Trend"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 5 }}
                  activeDot={{ r: 7 }}
                  name={userRole === "farmer" ? "Revenue (KES)" : "Spending (KES)"}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>
              {userRole === "farmer" ? "Product Mix" : "Purchase Categories"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cropDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {cropDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>
            {userRole === "farmer" ? "Top Selling Products" : "Most Purchased Items"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Transaction Volume */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Transaction Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="transactions" fill="#10b981" radius={[8, 8, 0, 0]} name="Transactions" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
