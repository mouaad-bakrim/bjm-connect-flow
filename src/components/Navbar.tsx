import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import { auth } from '@/lib/auth';
import { Menu, X, Globe, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { t, language, setLanguage } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = auth.isAuthenticated();
  const user = auth.getUser();

  const handleLogout = () => {
    auth.logout();
    window.location.href = '/';
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'ar' : 'fr');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <ShoppingBag className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">BJMLA.MA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {t('nav.home')}
            </Link>
            <Link to="/products" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {t('nav.products')}
            </Link>
            <Link to="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {t('nav.about')}
            </Link>
            <Link to="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {t('nav.contact')}
            </Link>
          </div>

          {/* Right Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="text-muted-foreground"
            >
              <Globe className="h-5 w-5" />
              <span className="ml-1 text-xs">{language.toUpperCase()}</span>
            </Button>

            {isAuthenticated ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to={user ? auth.getRedirectPath(user) : '/dashboard/buyer'}>
                    {t('nav.dashboard')}
                  </Link>
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  {t('nav.logout')}
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">{t('nav.login')}</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">{t('nav.register')}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                {t('nav.home')}
              </Link>
              <Link to="/products" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                {t('nav.products')}
              </Link>
              <Link to="/about" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                {t('nav.about')}
              </Link>
              <Link to="/contact" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                {t('nav.contact')}
              </Link>
              
              <hr className="border-border" />
              
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-sm"
              >
                <Globe className="h-4 w-4" />
                {language === 'fr' ? 'العربية' : 'Français'}
              </button>

              {isAuthenticated ? (
                <>
                  <Link 
                    to={user ? auth.getRedirectPath(user) : '/dashboard/buyer'} 
                    className="text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.dashboard')}
                  </Link>
                  <button onClick={handleLogout} className="text-sm font-medium text-destructive">
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                    {t('nav.login')}
                  </Link>
                  <Button asChild className="w-full">
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      {t('nav.register')}
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
