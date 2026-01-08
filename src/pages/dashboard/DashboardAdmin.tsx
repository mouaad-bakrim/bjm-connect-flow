import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Package, 
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal
} from 'lucide-react';
import { mockPendingWholesalers } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function DashboardAdmin() {
  const { toast } = useToast();
  const [pendingWholesalers, setPendingWholesalers] = useState(mockPendingWholesalers);

  const handleApprove = (id: number) => {
    setPendingWholesalers((prev) => prev.filter((w) => w.id !== id));
    toast({
      title: 'Grossiste approuvé',
      description: 'Le grossiste a été approuvé avec succès.',
    });
  };

  const handleReject = (id: number) => {
    setPendingWholesalers((prev) => prev.filter((w) => w.id !== id));
    toast({
      variant: 'destructive',
      title: 'Grossiste rejeté',
      description: 'Le grossiste a été rejeté.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Administration</h1>
        <p className="text-muted-foreground">Gérez les utilisateurs et les grossistes en attente</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Utilisateurs totaux</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,456</div>
            <p className="text-xs text-success">+12% ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Grossistes actifs</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">5 nouveaux cette semaine</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">En attente</CardTitle>
            <Clock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingWholesalers.length}</div>
            <p className="text-xs text-muted-foreground">À vérifier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Produits</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,234</div>
            <p className="text-xs text-success">+8% ce mois</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Wholesalers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-accent" />
            Grossistes en attente de vérification
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingWholesalers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="mb-2 h-12 w-12 text-success" />
              <p className="text-muted-foreground">Aucun grossiste en attente</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Ville</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingWholesalers.map((wholesaler) => (
                  <TableRow key={wholesaler.id}>
                    <TableCell className="font-medium">{wholesaler.company_name}</TableCell>
                    <TableCell>{wholesaler.email}</TableCell>
                    <TableCell>{wholesaler.city}</TableCell>
                    <TableCell>{wholesaler.phone_business}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        En attente
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-success hover:bg-success hover:text-success-foreground"
                          onClick={() => handleApprove(wholesaler.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approuver
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => handleReject(wholesaler.id)}
                        >
                          <XCircle className="h-4 w-4" />
                          Rejeter
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
