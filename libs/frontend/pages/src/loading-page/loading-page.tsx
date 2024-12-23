import './loader-page.css';

export function LoadingPage(): JSX.Element {
  return (
    <div className="loading-page">
      <p>Loading ...</p>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LoadingPage;
