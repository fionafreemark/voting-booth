//Modules
import { useParams, Link } from "react-router-dom";
//Assets
import votingConfirmationImg from "../assets/voting-confirmation.svg";

const VotingConfirmation = () => {
  const { boothID } = useParams();

  return (
    <section className="vote-confirmation-container">
      <img src={votingConfirmationImg} alt="Person holding a tablet with a confirmation on their screen." />
      <h2 className="h2-minor">Your vote has been recorded!</h2>
      <div className="button-container">
        <Link className="button primary" to={`/results/${boothID}`}>View Results</Link>
      </div>
    </section>
  );
};

export default VotingConfirmation;