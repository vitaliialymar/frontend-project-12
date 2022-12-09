import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt="Страница не найдена" className="img-fluid h-25" src="https://cdn2.hexlet.io/assets/error-pages/404-4b6ef16aba4c494d8101c104236304e640683fa9abdb3dd7a46cab7ad05d46e9.svg" width={226} height={226} />
      <h1 className="h4 text-muted">{t('errorPage.notFound')}</h1>
      <p className="text-muted">
        {t('errorPage.go')}
        {' '}
        <Link to="/">{t('errorPage.home')}</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
