import { create } from 'zustand';

type Language = 'fr' | 'ar';

interface I18nState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: () => 'ltr' | 'rtl';
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.products': 'Produits',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.login': 'Se connecter',
    'nav.register': 'Créer un compte',
    'nav.dashboard': 'Tableau de bord',
    'nav.logout': 'Déconnexion',

    // Hero
    'hero.title': 'Trouvez des fournisseurs vérifiés',
    'hero.subtitle': 'Négociez directement, développez votre commerce',
    'hero.description': 'BJMLA.MA connecte les grossistes marocains avec les vendeurs et e-commerçants. Accédez à des milliers de produits en gros.',
    'hero.cta.buyer': 'Je suis vendeur',
    'hero.cta.wholesaler': 'Je suis grossiste',

    // Features
    'features.title': 'Pourquoi choisir BJMLA?',
    'features.verified.title': 'Grossistes vérifiés',
    'features.verified.desc': 'Tous nos fournisseurs sont vérifiés et certifiés pour votre sécurité.',
    'features.direct.title': 'Contact direct',
    'features.direct.desc': 'Négociez directement avec les grossistes sans intermédiaire.',
    'features.secure.title': 'Transactions sécurisées',
    'features.secure.desc': 'Paiements protégés et suivi des commandes en temps réel.',
    'features.support.title': 'Support 24/7',
    'features.support.desc': 'Notre équipe est disponible pour vous accompagner à tout moment.',

    // How it works
    'how.title': 'Comment ça marche?',
    'how.step1.title': 'Créez votre compte',
    'how.step1.desc': 'Inscrivez-vous en tant que vendeur ou grossiste en quelques clics.',
    'how.step2.title': 'Explorez les produits',
    'how.step2.desc': 'Parcourez des milliers de produits de grossistes vérifiés.',
    'how.step3.title': 'Contactez et négociez',
    'how.step3.desc': 'Discutez directement avec les fournisseurs via WhatsApp ou chat.',
    'how.step4.title': 'Développez votre business',
    'how.step4.desc': 'Passez vos commandes et faites croître votre commerce.',

    // Auth
    'auth.login.title': 'Connexion',
    'auth.login.email': 'Email',
    'auth.login.password': 'Mot de passe',
    'auth.login.submit': 'Se connecter',
    'auth.login.no_account': 'Pas de compte?',
    'auth.login.register': 'Créer un compte',
    
    'auth.register.title': 'Créer un compte',
    'auth.register.choose_type': 'Choisissez votre type de compte',
    'auth.register.buyer': 'Vendeur / E-commerçant',
    'auth.register.buyer.desc': 'Accédez aux produits de nos grossistes vérifiés',
    'auth.register.wholesaler': 'Grossiste',
    'auth.register.wholesaler.desc': 'Vendez vos produits à des milliers de revendeurs',
    'auth.register.company_name': 'Nom de l\'entreprise',
    'auth.register.city': 'Ville',
    'auth.register.phone': 'Téléphone WhatsApp',
    'auth.register.email': 'Email',
    'auth.register.password': 'Mot de passe',
    'auth.register.confirm_password': 'Confirmer le mot de passe',
    'auth.register.terms': 'J\'accepte les conditions d\'utilisation',
    'auth.register.submit': 'Créer mon compte',
    'auth.register.have_account': 'Déjà un compte?',
    'auth.register.login': 'Se connecter',

    // Pending
    'pending.title': 'Compte en attente de vérification',
    'pending.message': 'Votre compte grossiste est en cours de vérification par notre équipe. Vous recevrez un email une fois votre compte approuvé.',
    'pending.back': 'Retour à l\'accueil',
    'pending.contact': 'Contacter le support',

    // Dashboard
    'dashboard.buyer.title': 'Tableau de bord vendeur',
    'dashboard.buyer.explore': 'Explorer les produits',
    'dashboard.wholesaler.title': 'Tableau de bord grossiste',
    'dashboard.wholesaler.products': 'Mes produits',
    'dashboard.wholesaler.add_product': 'Ajouter un produit',
    'dashboard.admin.title': 'Administration',
    'dashboard.admin.pending': 'Grossistes en attente',

    // Products
    'products.title': 'Produits',
    'products.filter': 'Filtrer',
    'products.category': 'Catégorie',
    'products.city': 'Ville',
    'products.price': 'Prix',
    'products.search': 'Rechercher...',
    'products.moq': 'MOQ',
    'products.verified': 'Vérifié',
    'products.contact': 'Contacter',
    'products.whatsapp': 'WhatsApp',
    'products.chat': 'Chat',

    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Une erreur est survenue',
    'common.success': 'Succès',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.back': 'Retour',
    'common.next': 'Suivant',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'إنشاء حساب',
    'nav.dashboard': 'لوحة التحكم',
    'nav.logout': 'تسجيل الخروج',

    // Hero
    'hero.title': 'ابحث عن موردين موثوقين',
    'hero.subtitle': 'تفاوض مباشرة، طور تجارتك',
    'hero.description': 'BJMLA.MA يربط تجار الجملة المغاربة بالبائعين وأصحاب المتاجر الإلكترونية. احصل على آلاف المنتجات بالجملة.',
    'hero.cta.buyer': 'أنا بائع',
    'hero.cta.wholesaler': 'أنا تاجر جملة',

    // Features
    'features.title': 'لماذا تختار BJMLA؟',
    'features.verified.title': 'تجار جملة موثوقون',
    'features.verified.desc': 'جميع موردينا موثقون ومعتمدون لضمان سلامتك.',
    'features.direct.title': 'تواصل مباشر',
    'features.direct.desc': 'تفاوض مباشرة مع تجار الجملة بدون وسيط.',
    'features.secure.title': 'معاملات آمنة',
    'features.secure.desc': 'مدفوعات محمية وتتبع الطلبات في الوقت الفعلي.',
    'features.support.title': 'دعم 24/7',
    'features.support.desc': 'فريقنا متاح لمساعدتك في أي وقت.',

    // Auth
    'auth.login.title': 'تسجيل الدخول',
    'auth.login.email': 'البريد الإلكتروني',
    'auth.login.password': 'كلمة المرور',
    'auth.login.submit': 'دخول',
    'auth.login.no_account': 'ليس لديك حساب؟',
    'auth.login.register': 'إنشاء حساب',

    'auth.register.title': 'إنشاء حساب',
    'auth.register.choose_type': 'اختر نوع حسابك',
    'auth.register.buyer': 'بائع / متجر إلكتروني',
    'auth.register.buyer.desc': 'احصل على منتجات من تجار الجملة الموثوقين',
    'auth.register.wholesaler': 'تاجر جملة',
    'auth.register.wholesaler.desc': 'بع منتجاتك لآلاف الموزعين',

    // Pending
    'pending.title': 'الحساب قيد التحقق',
    'pending.message': 'حساب تاجر الجملة الخاص بك قيد المراجعة من فريقنا. ستتلقى بريدًا إلكترونيًا بمجرد الموافقة على حسابك.',
    'pending.back': 'العودة للرئيسية',
    'pending.contact': 'تواصل مع الدعم',

    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'نجاح',
  },
};

export const useI18n = create<I18nState>((set, get) => ({
  language: 'fr',
  setLanguage: (lang) => {
    set({ language: lang });
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  },
  t: (key) => {
    const { language } = get();
    return translations[language][key] || translations.fr[key] || key;
  },
  dir: () => (get().language === 'ar' ? 'rtl' : 'ltr'),
}));
