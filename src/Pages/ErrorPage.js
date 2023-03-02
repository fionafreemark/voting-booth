//Modules
import { Link } from "react-router-dom";
//Assets
import ErrorGraphic from "../assets/error-page-graphic.svg";

const ErrorPage = () => {
  return (
    <section className="wrapper error-section">
      <div className="error-img">
        <img src={ErrorGraphic} alt="Illustration of person holding a hammer in front of a computer screen with a bug on it." />
      </div>
      <h2 className="h2-minor">Oh no! Page not found!</h2>
      <div className="error-btn">
        <Link to={`/`} className="button primary"> Home</Link>
      </div>
    </section>
  );
};

export default ErrorPage;