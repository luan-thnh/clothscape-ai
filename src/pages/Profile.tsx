
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, User, Package } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { updateUser, getUserOrders } from '@/services/api';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

type FormValues = z.infer<typeof formSchema>;

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/profile' } } });
    }
  }, [isAuthenticated, navigate]);
  
  // Load user orders
  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          setIsLoadingOrders(true);
          const response = await getUserOrders(user.id);
          setOrders(response.data);
        } catch (error) {
          console.error('Failed to fetch orders', error);
        } finally {
          setIsLoadingOrders(false);
        }
      };
      
      fetchOrders();
    }
  }, [user]);

  const onSubmit = async (values: FormValues) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      await updateUser(user.id, values);
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Update failed',
        description: error.response?.data?.message || 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container-custom py-8">
          <h1 className="text-3xl font-medium mb-6">My Account</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-secondary/30 p-6 rounded-lg">
                <h2 className="text-xl font-medium mb-6 flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Profile Information
                </h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} readOnly />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="mt-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        'Update Profile'
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
              
              <div className="bg-secondary/30 p-6 rounded-lg">
                <h2 className="text-xl font-medium mb-6 flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  Order History
                </h2>
                
                {isLoadingOrders ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : orders.length > 0 ? (
                  <div className="divide-y divide-border">
                    {orders.map((order: any) => (
                      <div key={order.id} className="py-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">Order #{order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              Placed on {new Date(order.created_at).toLocaleDateString()}
                            </p>
                            <p className="text-sm mt-1">
                              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {order.items.map((item: any, index: number) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="h-14 w-12 flex-shrink-0 overflow-hidden rounded-md border border-border">
                                <img 
                                  src={`https://source.unsplash.com/random/100x100?${item.product_id}`}
                                  alt={`Product ${item.product_id}`}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Product #{item.product_id}</p>
                                <p className="text-xs text-muted-foreground">
                                  Qty: {item.quantity} • ${item.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                    <Button 
                      onClick={() => navigate('/shop')}
                      variant="outline"
                      className="mt-4"
                    >
                      Start Shopping
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <div className="bg-secondary/50 p-6 rounded-lg sticky top-24">
                <h2 className="text-lg font-medium mb-4">Account Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Name</span>
                    <span>{user.name}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Email</span>
                    <span>{user.email}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Account Type</span>
                    <span>{user.role === 'admin' ? 'Administrator' : 'Customer'}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Member Since</span>
                    <span>{new Date(user.created_at || Date.now()).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Total Orders</span>
                    <span>{orders.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
