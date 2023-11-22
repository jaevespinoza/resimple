import "./styles.scss";

/**
 * Spinner that will show whenever the page is loading
 * the data from the Modyo API
 */
const Spinner = () => {
  return (
    <div className="application-body application-body--loading">
      <div className="spinner-border application-body__spinner" role="status" />
    </div>
  );
};

export default Spinner;
