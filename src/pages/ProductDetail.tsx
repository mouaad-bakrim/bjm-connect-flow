import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockProducts } from '@/lib/mockData';
import { 
  ArrowLeft, 
  CheckCircle2, 
  MapPin, 
  Package, 
  MessageCircle, 
  Phone,
  Share2,
  Heart
} from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16">
        <h1 className="mb-4 text-2xl font-bold">Produit non trouvé</h1>
        <Button asChild>
          <Link to="/products">Retour aux produits</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6 gap-2" asChild>
        <Link to="/products">
          <ArrowLeft className="h-4 w-4" />
          Retour aux produits
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
            <img
              src={product.images[0] || '/placeholder.svg'}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((image, i) => (
                <div
                  key={i}
                  className="aspect-square cursor-pointer overflow-hidden rounded-lg bg-muted"
                >
                  <img
                    src={image}
                    alt={`${product.title} ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="secondary">{product.category}</Badge>
              {product.wholesaler.verified && (
                <Badge className="bg-success text-success-foreground">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Fournisseur vérifié
                </Badge>
              )}
            </div>
            <h1 className="mb-2 text-3xl font-bold">{product.title}</h1>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">{product.price}</span>
              <span className="text-lg text-muted-foreground">MAD / unité</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 border-y border-border py-4">
            <div className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">MOQ:</span>
              <span className="font-medium">{product.moq} unités</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Stock:</span>
              <span className="font-medium">{product.stock} unités</span>
            </div>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Wholesaler Info */}
          <div className="rounded-xl border border-border bg-muted/50 p-4">
            <h3 className="mb-3 font-semibold">À propos du fournisseur</h3>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="text-xl font-bold">
                  {product.wholesaler.company_name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{product.wholesaler.company_name}</span>
                  {product.wholesaler.verified && (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {product.wholesaler.city}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="flex-1 gap-2">
              <Phone className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button size="lg" variant="outline" className="flex-1 gap-2">
              <MessageCircle className="h-4 w-4" />
              Envoyer un message
            </Button>
          </div>

          <div className="flex gap-3">
            <Button variant="ghost" size="sm" className="gap-2">
              <Heart className="h-4 w-4" />
              Ajouter aux favoris
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Partager
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
