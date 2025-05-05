import css from './ErrorMessage.module.css';

export default function ErrorMessage({ errorMessage }) {
  return (
    <div className={css.container}>
      <p className={css.message}>{errorMessage}</p>
    </div>
  );
}
