import { ArrowDown, Linkedin, Mail, Globe, Globe as GlobeIcon, FileText, Share2, X, Copy, Check, MessageCircle } from 'lucide-react';
import QRCode from 'react-qr-code';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import '../i18n'; // Import the i18n configuration
import { APP_CONFIG } from '../config';

export default function Hero() {
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const GithubIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
      <path d="M12 .5a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.35-1.77-1.35-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.84 1.32 3.53 1.01.11-.78.42-1.32.76-1.62-2.66-.3-5.46-1.33-5.46-5.92 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.6-2.81 5.61-5.49 5.91.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0012 .5z" />
    </svg>
  );

  const StackOverflowIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
      <path d="M17.5 20.5h-11v-3h11v3zm-8.9-4.2l7.6 1.7.6-3-7.6-1.7-.6 3zm1.3-5.3l6.9 3 1.2-2.9-6.9-3-1.2 2.9zm2.9-5.3l5.5 4.2 1.8-2.4-5.5-4.2-1.8 2.4zM6.2 17.8H4v-11h2.2v11z" />
    </svg>
  );

  const CredlyIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );

  const MicrosoftLearnIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
      <path d="M22 12.6001H12.5999V23.0001H22V12.6001ZM11.3999 23.0001H1.99988V12.6001H11.3999V23.0001ZM11.3999 1.00012H1.99988V11.4001H11.3999V1.00012ZM22 1.00012H12.5999V11.4001H22V1.00012Z" />
    </svg>
  );

  const handleShare = async () => {
    const shareData = {
      title: 'Guillermo Ortiz - Head of Engineering',
      text: 'Check out this portfolio!',
      url: APP_CONFIG.websiteUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
        setIsShareModalOpen(true);
      }
    } else {
      setIsShareModalOpen(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(APP_CONFIG.websiteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this portfolio: ${APP_CONFIG.websiteUrl}`)}`;
  const mailtoUrl = `mailto:?subject=${encodeURIComponent('Guillermo Ortiz Portfolio')}&body=${encodeURIComponent(`Check out this portfolio: ${APP_CONFIG.websiteUrl}`)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(APP_CONFIG.websiteUrl)}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      {/* Language Dropdown */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 px-3 py-2 sm:px-4 text-xs sm:text-sm bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 font-medium"
        >
          <GlobeIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">{i18n.language.toUpperCase()}</span>
          <span className="sm:hidden">{i18n.language === 'en' ? 'EN' : 'ES'}</span>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-slate-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 overflow-hidden min-w-28 sm:min-w-32 text-xs sm:text-sm">
            <button
              onClick={() => changeLanguage('en')}
              className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 font-medium text-left transition-all duration-200 ${i18n.language === 'en'
                ? 'bg-emerald-500/30 text-emerald-100 border-l-2 border-emerald-500'
                : 'text-slate-300 hover:bg-white/10'
                }`}
            >
              🇬🇧 English
            </button>
            <button
              onClick={() => changeLanguage('es')}
              className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 font-medium text-left transition-all duration-200 border-t border-white/10 ${i18n.language === 'es'
                ? 'bg-emerald-500/30 text-emerald-100 border-l-2 border-emerald-500'
                : 'text-slate-300 hover:bg-white/10'
                }`}
            >
              🇪🇸 Español
            </button>
          </div>
        )}
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 py-12 sm:py-20 flex items-center justify-center min-h-screen">
        <div className="max-w-5xl mx-auto text-center w-full">
          <div className="animate-fade-in">
            {/* Profile Picture */}
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-2 sm:border-4 border-white/30 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src="/images/profile_pic.jpg"
                  alt={t('hero.name')}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
              {t('hero.name')}
            </h1>
            <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-slate-300 mb-3 sm:mb-4">
              {t('hero.title')}
            </p>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
              {t('hero.description')}
            </p>
            <p className="text-xs xs:text-sm sm:text-base text-slate-400 mb-8 sm:mb-12">{t('hero.location')}</p>

            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
              <a
                href="https://www.linkedin.com/in/guillermoortizfigueroa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label={t('hero.linkedin')}
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="/Guillermo%20Ortiz%20-%20CV%202025_eng.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label={t('hero.cv')}
              >
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href={APP_CONFIG.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label={t('hero.website')}
              >
                <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="mailto:guillermo@guillermoortiz.es"
                className="p-2.5 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label={t('hero.email')}
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>

              <a
                href="https://github.com/gortizfigueroa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label={t('hero.github')}
              >
                <GithubIcon />
              </a>

              <a
                href="https://stackoverflow.com/users/159218/guillermo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label={t('hero.stackoverflow')}
              >
                <StackOverflowIcon />
              </a>

              <a
                href="https://www.credly.com/users/guillermo-ortiz-figueroa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label={t('hero.credly')}
              >
                <CredlyIcon />
              </a>

              <a
                href="https://learn.microsoft.com/users/guillermoortizfigueroa-1988/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label={t('hero.microsoftlearn')}
              >
                <MicrosoftLearnIcon />
              </a>

              <button
                onClick={handleShare}
                className="p-2.5 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 cursor-pointer"
                aria-label={t('hero.share')}
              >
                <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
      </div>


      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsShareModalOpen(false)}>
          <div className="relative bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full animate-scale-up" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">{t('hero.share_via')}</h3>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs text-slate-600">WhatsApp</span>
              </a>

              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                  <Linkedin className="w-6 h-6 text-blue-700" />
                </div>
                <span className="text-xs text-slate-600">LinkedIn</span>
              </a>

              <a href={mailtoUrl} className="flex flex-col items-center gap-2 group">
                <div className="p-3 bg-slate-100 rounded-full group-hover:bg-slate-200 transition-colors">
                  <Mail className="w-6 h-6 text-slate-700" />
                </div>
                <span className="text-xs text-slate-600">Email</span>
              </a>

              <button onClick={copyToClipboard} className="flex flex-col items-center gap-2 group">
                <div className="p-3 bg-slate-100 rounded-full group-hover:bg-slate-200 transition-colors relative">
                  {copied ? <Check className="w-6 h-6 text-green-600" /> : <Copy className="w-6 h-6 text-slate-700" />}
                </div>
                <span className="text-xs text-slate-600">{copied ? t('hero.copied') : t('hero.copy_link')}</span>
              </button>
            </div>

            <div className="border-t border-slate-100 pt-6 flex flex-col items-center">
              <p className="text-sm font-medium text-slate-500 mb-4">{t('hero.scan_to_visit')}</p>
              <div className="p-3 bg-white rounded-xl shadow-inner border border-slate-100">
                <QRCode
                  value={APP_CONFIG.websiteUrl}
                  size={120}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <p className="mt-6 text-slate-500 text-sm font-medium">{APP_CONFIG.websiteDisplay}</p>
            </div>
          </div>
        </div>
      )}
    </section >
  );
}
