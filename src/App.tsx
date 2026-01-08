import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

// Pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Pending from "@/pages/Pending";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Messages from "@/pages/Messages";
import NotFound from "@/pages/NotFound";

// Dashboard Pages
import DashboardBuyer from "@/pages/dashboard/DashboardBuyer";
import DashboardWholesaler from "@/pages/dashboard/DashboardWholesaler";
import DashboardAdmin from "@/pages/dashboard/DashboardAdmin";
import AddProduct from "@/pages/dashboard/AddProduct";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes with main layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pending" element={<Pending />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Route>

          {/* Protected Buyer Dashboard */}
          <Route
            element={
              <ProtectedRoute allowedRoles={['BUYER']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard/buyer" element={<DashboardBuyer />} />
            <Route path="/messages" element={<Messages />} />
          </Route>

          {/* Protected Wholesaler Dashboard */}
          <Route
            element={
              <ProtectedRoute allowedRoles={['WHOLESALER']} requireApproved>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard/wholesaler" element={<DashboardWholesaler />} />
            <Route path="/dashboard/wholesaler/add-product" element={<AddProduct />} />
          </Route>

          {/* Protected Admin Dashboard */}
          <Route
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard/admin" element={<DashboardAdmin />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
