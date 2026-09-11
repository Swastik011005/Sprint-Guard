import { Construction } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import './PlaceholderPage.css';

// Used for every sidebar destination that isn't built yet. Keeps the shell
// (sidebar + top navbar) consistent while each developer builds their
// feature out on their own branch.
function PlaceholderPage({ title }) {
  return (
    <div className="placeholder-page">
      <h1 className="placeholder-page__title">{title}</h1>
      <Card className="placeholder-page__card">
        <Construction size={32} className="placeholder-page__icon" />
        <p className="placeholder-page__text">
          The {title} page is under construction and will be built out in a future update.
        </p>
      </Card>
    </div>
  );
}

export default PlaceholderPage;
