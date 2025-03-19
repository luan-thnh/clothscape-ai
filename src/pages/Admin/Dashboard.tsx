
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getProducts, getOrders, getUsers } from '@/services/api';
import { Loader2, Package, Users, ShoppingBag, BarChart, Plus, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminDashboard = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  
  // Protect admin routes
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/admin' } } });
      return;
    }
    
    if (!isAdmin) {
      toast({
        title: 'Access denied',
        description: 'You do not have permission to access the admin dashboard',
        variant: 'destructive',
      });
      navigate('/');
      return;
    }
    
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          getProducts(),
          getOrders(),
          getUsers(),
        ]);
        
        const orders = ordersRes.data;
        const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.total, 0);
        
        setStats({
          totalOrders: orders.length,
          totalUsers: usersRes.data.length,
          totalProducts: productsRes.data.length,
          totalRevenue,
        });
        
        // Get 5 most recent orders
        const recent = [...orders].sort((a: any, b: any) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ).slice(0, 5);
        
        setRecentOrders(recent);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [isAdmin, isAuthenticated, navigate]);

  if (!isAdmin || !isAuthenticated) return null;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-secondary/30 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground">Total Orders</p>
                  <h2 className="text-3xl font-bold mt-2">{stats.totalOrders}</h2>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <Package className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
            
            <div className="bg-secondary/30 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground">Total Users</p>
                  <h2 className="text-3xl font-bold mt-2">{stats.totalUsers}</h2>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
            
            <div className="bg-secondary/30 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground">Total Products</p>
                  <h2 className="text-3xl font-bold mt-2">{stats.totalProducts}</h2>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
            
            <div className="bg-secondary/30 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground">Total Revenue</p>
                  <h2 className="text-3xl font-bold mt-2">${stats.totalRevenue.toFixed(2)}</h2>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Orders */}
          <div className="bg-secondary/30 p-6 rounded-lg mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <Link to="/admin/orders">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order: any) => (
                      <tr key={order.id} className="border-b border-border">
                        <td className="py-3 px-4">#{order.id}</td>
                        <td className="py-3 px-4">User #{order.user_id}</td>
                        <td className="py-3 px-4">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right">
                          <Link to={`/admin/orders/${order.id}`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-muted-foreground">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-secondary/30 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/admin/products/new">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Product
                </Button>
              </Link>
              
              <Link to="/admin/orders">
                <Button variant="outline" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Manage Orders
                </Button>
              </Link>
              
              <Link to="/admin/users">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
