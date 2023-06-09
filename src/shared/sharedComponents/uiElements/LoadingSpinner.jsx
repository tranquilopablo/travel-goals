import css from './LoadingSpinner.module.css';

const LoadingSpinner = (props) => {
  return (
    <div className={`${props.asOverlay && css.overlay}`}>
      <div className={css.dualRing}></div>
    </div>
  );
};

export default LoadingSpinner;
