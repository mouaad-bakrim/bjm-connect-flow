import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useI18n } from '@/lib/i18n';
import { api, RegisterData } from '@/lib/api';
import { auth } from '@/lib/auth';
import { moroccanCities } from '@/lib/mockData';
import { ShoppingBag, Loader2, Store, Package, ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type AccountType = 'BUYER' | 'WHOLESALER';

export default function Register() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  const [step, setStep] = useState<1 | 2>(searchParams.get('type') ? 2 : 1);
  const [accountType, setAccountType] = useState<AccountType | null>(
    (searchParams.get('type')?.toUpperCase() as AccountType) || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  const handleTypeSelect = (type: AccountType) => {
    setAccountType(type);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas',
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Veuillez accepter les conditions d\'utilisation',
      });
      return;
    }

    setIsLoading(true);

    try {
      const data: RegisterData = {
        email,
        password,
        account_type: accountType!,
      };

      if (accountType === 'WHOLESALER') {
        data.company_name = companyName;
        data.city = city;
        data.phone_business = phone;
      }

      await api.register(data);

      if (accountType === 'BUYER') {
        // Auto-login for buyers
        try {
          const user = await auth.login(email, password);
          toast({
            title: 'Compte créé avec succès',
            description: 'Bienvenue sur BJMLA!',
          });
          navigate(auth.getRedirectPath(user));
        } catch {
          navigate('/login');
        }
      } else {
        // Redirect wholesalers to pending page
        toast({
          title: 'Compte créé avec succès',
          description: 'Votre compte est en cours de vérification.',
        });
        navigate('/pending');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur d\'inscription',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <ShoppingBag className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">{t('auth.register.title')}</CardTitle>
          <CardDescription>
            {step === 1 ? t('auth.register.choose_type') : `Créer un compte ${accountType === 'BUYER' ? 'vendeur' : 'grossiste'}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <div className="space-y-4">
              {/* Buyer Card */}
              <button
                onClick={() => handleTypeSelect('BUYER')}
                className="group flex w-full items-center gap-4 rounded-xl border-2 border-border p-4 text-left transition-all hover:border-primary hover:bg-primary/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Store className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{t('auth.register.buyer')}</div>
                  <div className="text-sm text-muted-foreground">{t('auth.register.buyer.desc')}</div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </button>

              {/* Wholesaler Card */}
              <button
                onClick={() => handleTypeSelect('WHOLESALER')}
                className="group flex w-full items-center gap-4 rounded-xl border-2 border-border p-4 text-left transition-all hover:border-primary hover:bg-primary/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Package className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{t('auth.register.wholesaler')}</div>
                  <div className="text-sm text-muted-foreground">{t('auth.register.wholesaler.desc')}</div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mb-2 gap-1"
                onClick={() => setStep(1)}
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>

              {accountType === 'WHOLESALER' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="company">{t('auth.register.company_name')}</Label>
                    <Input
                      id="company"
                      placeholder="Nom de votre entreprise"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>{t('auth.register.city')}</Label>
                      <Select value={city} onValueChange={setCity} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une ville" />
                        </SelectTrigger>
                        <SelectContent>
                          {moroccanCities.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('auth.register.phone')}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+212 6 XX XX XX XX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.register.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">{t('auth.register.password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t('auth.register.confirm_password')}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm">
                  {t('auth.register.terms')}
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Création...
                  </>
                ) : (
                  t('auth.register.submit')
                )}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">{t('auth.register.have_account')} </span>
            <Link to="/login" className="font-medium text-primary hover:underline">
              {t('auth.register.login')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
