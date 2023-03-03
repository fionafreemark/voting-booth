//modules
import {Link} from "react-router-dom";
//components
import ResultsBar from "../Components/ResultsBar";
//pages
import CreatePoll from "./CreatePoll";
import FindPoll from "./FindPoll";

const Results = () => {
  return (
    <section className ="results wrapper">
      <h2 className="results-h2">The Results Are In...</h2>
      <ResultsBar />
      <div className="results-buttons">
        <Link to={`/createpoll`} element={<CreatePoll />} className="button primary">Create A Poll</Link>
        <Link to={`/findpoll`} element={<FindPoll />} className="button secondary">Find Another Poll</Link>
      </div>
    </section>
  );
};

export default Results;