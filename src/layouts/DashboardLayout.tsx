import { Link, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  Plus, 
  MessageCircle, 
  Settings, 
  User,
  LogOut,
  Menu,
  X,
  ShoppingBag
} from 'lucide-react';
import { useState } from 'react';

const buyerLinks = [
  { to: '/dashboard/buyer', icon: LayoutDashboard, label: 'Explorer' },
  { to: '/dashboard/buyer/favorites', icon: Package, label: 'Favoris' },
  { to: '/messages', icon: MessageCircle, label: 'Messages' },
  { to: '/dashboard/buyer/settings', icon: Settings, label: 'Paramètres' },
];

const wholesalerLinks = [
  { to: '/dashboard/wholesaler', icon: LayoutDashboard, label: 'Tableau de bord' },
  { to: '/dashboard/wholesaler/products', icon: Package, label: 'Mes produits' },
  { to: '/dashboard/wholesaler/add-product', icon: Plus, label: 'Ajouter produit' },
  { to: '/messages', icon: MessageCircle, label: 'Messages' },
  { to: '/dashboard/wholesaler/profile', icon: User, label: 'Mon profil' },
  { to: '/dashboard/wholesaler/settings', icon: Settings, label: 'Paramètres' },
];

const adminLinks = [
  { to: '/dashboard/admin', icon: LayoutDashboard, label: 'Vue d\'ensemble' },
  { to: '/dashboard/admin/pending', icon: User, label: 'Grossistes en attente' },
  { to: '/dashboard/admin/users', icon: User, label: 'Utilisateurs' },
  { to: '/dashboard/admin/settings', icon: Settings, label: 'Paramètres' },
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const user = auth.getUser();

  const links = user?.role === 'ADMIN' 
    ? adminLinks 
    : user?.role === 'WHOLESALER' 
    ? wholesalerLinks 
    : buyerLinks;

  const handleLogout = () => {
    auth.logout();
    window.location.href = '/';
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card transition-transform duration-200 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <ShoppingBag className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold">BJMLA.MA</span>
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              onClick={() => setSidebarOpen(false)}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user?.email}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role?.toLowerCase()}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <header className="flex h-16 items-center gap-4 border-b border-border bg-card px-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-semibold">Dashboard</span>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
