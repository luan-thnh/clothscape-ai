
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { createOrder } from '@/services/api';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  street: z.string().min(5, 'Street address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  zip: z.string().min(5, 'ZIP code must be at least 5 characters'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  paymentMethod: z.enum(['credit_card', 'paypal'], {
    required_error: 'Please select a payment method',
  }),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const shippingEstimate = totalPrice > 100 ? 0 : 10;
  const taxEstimate = totalPrice * 0.1;
  const orderTotal = totalPrice + shippingEstimate + taxEstimate;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      paymentMethod: 'credit_card',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    },
  });
  
  const paymentMethod = form.watch('paymentMethod');

  const onSubmit = async (values: FormValues) => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to complete your purchase',
        variant: 'destructive',
      });
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    
    if (items.length === 0) {
      toast({
        title: 'Empty cart',
        description: 'Your cart is empty. Add some items before checkout.',
        variant: 'destructive',
      });
      navigate('/shop');
      return;
    }
    
    try {
      setIsLoading(true);
      
      const orderData = {
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        shipping_address: {
          name: values.name,
          street: values.street,
          city: values.city,
          state: values.state,
          zip: values.zip,
          country: values.country,
        },
        payment_method: values.paymentMethod,
      };
      
      const response = await createOrder(orderData);
      
      // Clear cart after successful order
      clearCart();
      
      toast({
        title: 'Order placed successfully',
        description: `Your order #${response.data.id} has been placed.`,
      });
      
      // Redirect to order success page
      navigate(`/order-success/${response.data.id}`);
    } catch (error: any) {
      toast({
        title: 'Failed to place order',
        description: error.response?.data?.message || 'An error occurred while processing your order.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container-custom py-8">
          <h1 className="text-3xl font-medium mb-6">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="bg-secondary/30 p-6 rounded-lg">
                <h2 className="text-xl font-medium mb-6">Shipping Information</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State/Province</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="zip"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP/Postal Code</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-medium mb-4 pt-4 border-t border-border">Payment Information</h2>
                    
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Payment Method</FormLabel>
                            <FormControl>
                              <div className="flex flex-col space-y-2">
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    value="credit_card"
                                    checked={field.value === 'credit_card'}
                                    onChange={() => field.onChange('credit_card')}
                                    className="h-4 w-4 text-primary"
                                  />
                                  <span>Credit Card</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    value="paypal"
                                    checked={field.value === 'paypal'}
                                    onChange={() => field.onChange('paypal')}
                                    className="h-4 w-4 text-primary"
                                  />
                                  <span>PayPal</span>
                                </label>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {paymentMethod === 'credit_card' && (
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="4242 4242 4242 4242" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="cardExpiry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiration Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="MM/YY" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="cardCvc"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVC</FormLabel>
                                  <FormControl>
                                    <Input placeholder="123" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full mt-6"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Complete Order • $${orderTotal.toFixed(2)}`
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
            
            <div>
              <div className="bg-secondary/50 p-6 rounded-lg">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded-md">
                        <img 
                          src={item.images[0]} 
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between text-sm font-medium">
                          <h3 className="text-sm">{item.name}</h3>
                          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Qty {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t border-border pt-4 mt-4">
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">Subtotal</p>
                      <p>${totalPrice.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex justify-between text-sm mt-2">
                      <p className="text-muted-foreground">Shipping estimate</p>
                      <p>{shippingEstimate === 0 ? 'Free' : `$${shippingEstimate.toFixed(2)}`}</p>
                    </div>
                    
                    <div className="flex justify-between text-sm mt-2">
                      <p className="text-muted-foreground">Tax estimate</p>
                      <p>${taxEstimate.toFixed(2)}</p>
                    </div>
                    
                    <div className="border-t border-border pt-3 mt-3">
                      <div className="flex justify-between font-medium">
                        <p>Order total</p>
                        <p>${orderTotal.toFixed(2)}</p>
                      </div>
                    </div>
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

export default Checkout;
