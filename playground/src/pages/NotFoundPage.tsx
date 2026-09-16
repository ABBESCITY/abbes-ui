import { Link } from 'react-router';

import './NotFoundPage.scss';

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <p className="eyebrow">404</p>
      <h2>Page not found</h2>
      <p className="not-found-copy">The playground page you are looking for does not exist.</p>
      <Link className="not-found-link" to="/">
        Back to preview
      </Link>
    </div>
  );
}
