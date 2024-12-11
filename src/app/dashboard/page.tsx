"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/utils/supabase';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';

interface Product {
  id: string;
  name: string;
  purchase_date: string;
  status: string;
  price: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPurchasedProducts() {
      try {
        if (!user) return;
        
        const { data, error } = await supabase
          .from('purchases')
          .select(`
            id,
            name,
            purchase_date,
            status,
            price
          `)
          .eq('user_id', user.id)
          .order('purchase_date', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load your purchased products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchPurchasedProducts();
  }, [user]);

  if (!user) {
    return (
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Alert severity="warning">
            Please sign in to view your dashboard.
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" gutterBottom>
          Your Products
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        ) : products.length === 0 ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            You haven't purchased any products yet.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease-in-out',
                  }
                }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                      Status: {product.status}
                    </Typography>
                    <Typography variant="body2">
                      Purchase Date: {new Date(product.purchase_date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      ${product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}