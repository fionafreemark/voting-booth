//Modules
import firebase from "./Firebase";
import { get, ref, getDatabase } from "firebase/database";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import Swal from "sweetalert2";

const ResultsBar = () => {
  //Firebase key:
  const { boothID } = useParams();
  //Initialize database content:
  const database = getDatabase(firebase);
  //Defining State:
  const [pollQuestion, setPollQuestion] = useState("");
  const [optionOneDescription, setOptionOneDescription] = useState("");
  const [votesOne, setVotesOne] = useState();
  const [optionTwoDescription, setOptionTwoDescription] = useState("");
  const [votesTwo, setVotesTwo] = useState();
  const [totalVotes, setTotalVotes] = useState();
  const [voteOnePercent, setVoteOnePercent] = useState(0);
  const [voteTwoPercent, setVoteTwoPercent] = useState(0);
  //Database reference:
  const dbRef = ref(database, `/${boothID}`);

  //Taking a snapshot of the database:
  get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      setPollQuestion(snapshot.val().pollQuestion);
      setOptionOneDescription(snapshot.val().pollOptionOne.optionOneDescription);
      setVotesOne(snapshot.val().pollOptionOne.votes);
      setOptionTwoDescription(snapshot.val().pollOptionTwo.optionTwoDescription);
      setVotesTwo(snapshot.val().pollOptionTwo.votes);
      setTotalVotes(snapshot.val().totalVotes);

      //Calculate % of votes:
      const voteCounting = function getPercentA(x, y) {
        if (!isNaN(x, y)) {
          return Math.round((x / (x + y)) * 100);
        }
      };
      //Ensuring vote one or two has data before passing into useState:
      const voteCalc = voteCounting(votesOne, votesTwo);
      const voteTwoCalc = voteCounting(votesTwo, votesOne);
      if (voteCalc >= 1 || voteTwoCalc >= 1) {
        setVoteOnePercent(voteCalc, voteTwoCalc);
        setVoteTwoPercent(voteTwoCalc, voteCalc);
      } else if (votesOne === 0 && votesTwo === 0) {
        //Error alert if total votes are 0:
        Swal.fire("No votes yet!");
      } else {
        setVoteOnePercent(0);
        setVoteTwoPercent(0);
      }

      //If snapshot does not exist:
    } else {
      Swal.fire("No data available");
    }
  }).catch(() => {
    Swal.fire("Sorry, an error has occurred.");
  });

  return (
    <div className="results-bar-section">
      <h2 className="h2-minor">{pollQuestion}</h2>
      <div className="results-bar result-one">
        <p>
          <span className="results-option">{optionOneDescription}</span> has {voteOnePercent}% of the vote.
        </p>
        <ProgressBar bgColor="#F18363" borderRadius="50px" height="30px" width="100%" completed={voteOnePercent} />
      </div>
      <div className="results-bar  result-two">
        <p>
          <span className="results-option">{optionTwoDescription}</span> has {voteTwoPercent}% of the vote.
        </p>
        <ProgressBar bgColor="#758FF0" borderRadius="50px" height="30px" width="100%" completed={voteTwoPercent} />
      </div>
      <h4>Total Votes: {totalVotes}</h4>
    </div>
  );
};

export default ResultsBar;