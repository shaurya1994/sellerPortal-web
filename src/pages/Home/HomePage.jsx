import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h4" gutterBottom>Welcome to Seller Portal</Typography>
      <Typography variant="subtitle1" gutterBottom>
        Manage your products and orders easily.
      </Typography>

      <Button 
        component={Link} 
        to="/add-product" 
        variant="contained" 
        color="primary"
        sx={{ mt: 3 }}
      >
        Add New Product
      </Button>
    </Box>
  );
}
