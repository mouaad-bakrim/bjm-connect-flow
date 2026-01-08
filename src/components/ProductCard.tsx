import { Product } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MapPin, Package, CheckCircle2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.images[0] || '/placeholder.svg'}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.wholesaler.verified && (
          <Badge className="absolute right-2 top-2 bg-success text-success-foreground">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Vérifié
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
            {product.category}
          </span>
        </div>
        
        <h3 className="mb-2 line-clamp-2 font-semibold leading-tight">
          {product.title}
        </h3>
        
        <div className="mb-3 flex items-baseline gap-1">
          <span className="text-2xl font-bold text-primary">{product.price}</span>
          <span className="text-sm text-muted-foreground">MAD</span>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Package className="h-3 w-3" />
            <span>MOQ: {product.moq}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{product.wholesaler.city}</span>
          </div>
        </div>
        
        <div className="mt-3 border-t border-border pt-3">
          <p className="text-xs text-muted-foreground">
            Par <span className="font-medium text-foreground">{product.wholesaler.company_name}</span>
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="gap-2 border-t border-border p-3">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <Link to={`/products/${product.id}`}>
            Voir détails
          </Link>
        </Button>
        <Button size="sm" className="flex-1 gap-1">
          <MessageCircle className="h-3 w-3" />
          Contacter
        </Button>
      </CardFooter>
    </Card>
  );
}
