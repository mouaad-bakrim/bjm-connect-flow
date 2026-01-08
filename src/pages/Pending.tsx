import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/lib/i18n';
import { Clock, Home, MessageCircle } from 'lucide-react';

export default function Pending() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
            <Clock className="h-8 w-8 text-accent" />
          </div>
          <CardTitle className="text-2xl">{t('pending.title')}</CardTitle>
          <CardDescription className="mt-2">
            {t('pending.message')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              Notre équipe vérifie les informations de votre entreprise. Vous recevrez un email de confirmation sous <strong>24 à 48 heures</strong>.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" className="flex-1 gap-2" asChild>
              <Link to="/">
                <Home className="h-4 w-4" />
                {t('pending.back')}
              </Link>
            </Button>
            <Button className="flex-1 gap-2" asChild>
              <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                {t('pending.contact')}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
