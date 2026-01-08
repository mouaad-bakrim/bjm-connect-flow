import { Link } from 'react-router-dom';
import { ShoppingBag, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <ShoppingBag className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">BJMLA.MA</span>
            </Link>
            <p className="text-sm text-secondary-foreground/70">
              La première plateforme B2B au Maroc qui connecte grossistes et vendeurs.
            </p>
            <div className="flex gap-3">
              <a href="#" className="rounded-full bg-secondary-foreground/10 p-2 transition-colors hover:bg-primary hover:text-primary-foreground">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-secondary-foreground/10 p-2 transition-colors hover:bg-primary hover:text-primary-foreground">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-secondary-foreground/10 p-2 transition-colors hover:bg-primary hover:text-primary-foreground">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="text-secondary-foreground/70 hover:text-primary">
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-secondary-foreground/70 hover:text-primary">
                  Devenir grossiste
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-secondary-foreground/70 hover:text-primary">
                  Créer un compte vendeur
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-foreground/70 hover:text-primary">
                  À propos de nous
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-secondary-foreground/70 hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-secondary-foreground/70 hover:text-primary">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-secondary-foreground/70 hover:text-primary">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-foreground/70 hover:text-primary">
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-secondary-foreground/70">
                <MapPin className="h-4 w-4 text-primary" />
                Casablanca, Maroc
              </li>
              <li className="flex items-center gap-2 text-secondary-foreground/70">
                <Phone className="h-4 w-4 text-primary" />
                +212 5 XX XX XX XX
              </li>
              <li className="flex items-center gap-2 text-secondary-foreground/70">
                <Mail className="h-4 w-4 text-primary" />
                contact@bjmla.ma
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-secondary-foreground/10 pt-8 text-center text-sm text-secondary-foreground/50">
          <p>© {new Date().getFullYear()} BJMLA.MA. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
