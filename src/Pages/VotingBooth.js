// Modules
import * as React from "react"
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
//Components
import firebase from "../Components/Firebase";
import VotingConfirmation from "../Components/VotingConfirmation";
//Assets
import votingImage from "../assets/voting-booth.svg"

const VotingBooth = () => {
  //defining State
  const [pollData, setPollData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { boothID } = useParams();
  const [getValue, setGetValue] = useState();

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (response) => {
      const newState = [];
      const dataResponse = response.val();
      for (let key in dataResponse) {
        newState.push({ key: key, poll: dataResponse[key] });
      }
      setPollData(newState);
    })
  }, []);

  //Record vote:
  function handleSubmitVote(e, poll) {
    e.preventDefault();
    //ternary to display vote confirmation component or poll options, set to true, to show vote confirmation
    setIsSubmitted(true);
    const votingObject = {
      ...poll.poll,
    };

    //Tallying votes based on poll option selection: 
    if (getValue === "pollOptionOne") {
      votingObject.pollOptionOne.votes = votingObject.pollOptionOne.votes + 1;
      votingObject.totalVotes = votingObject.pollOptionOne.votes + votingObject.pollOptionTwo.votes;
    } else if (getValue === "pollOptionTwo") {
      votingObject.pollOptionTwo.votes = votingObject.pollOptionTwo.votes + 1;
      votingObject.totalVotes = votingObject.pollOptionOne.votes + votingObject.pollOptionTwo.votes;
    } else {
      //Alert if no vote was submitted:
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please choose an option!"
      });
      //If error returns, isSubmitted state is false to prevent vote confirmation ternary:
      setIsSubmitted(false);
      return;
    }
    //Database:
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${poll.key}`);
    //Update vote to firebase:
    update(dbRef, votingObject);
  };

  //Discern poll option value choices on event:
  const onChangeValue = (e) => {
    setGetValue(e.target.value);
  };

  //Copy link to clipboard:
  const clickHandler = (e, poll) => {
    e.preventDefault();
    //Copy url of voting booth:
    navigator.clipboard.writeText(`whatever-floats-your-vote.netlify.app/votingbooth/${poll.key}`)
    //Alert when link is copied to clipboard:
    Swal.fire({
      icon: "success",
      text: "Link copied!",
      showConfirmButton: false,
      timer: 1500
    });
    //isSubmitted set to false to prevent ternary for vote confirmation component:
    setIsSubmitted(false);
    return;
  }

  return (
    <>
      {isSubmitted ?
        <VotingConfirmation boothID={boothID} /> :
        <section className="wrapper">
          {pollData.map((poll, index) => {
              return (
                <React.Fragment key={index}>
                  {poll.key === boothID ?
                    <div className="voting-booth">
                      <h2>Voting Booth</h2>
                      <div className="voting-container">
                        <div className="voting-image">
                          <img src={votingImage} alt="Woman placing votes into a box." />
                        </div>
                        <div className="voting-question">
                          <h3>{poll.poll.pollQuestion}</h3>
                        </div>
                        <form className="voting-booth-form" onSubmit={(e) => { handleSubmitVote(e, poll) }}>
                          <fieldset onChange={onChangeValue} className="voting-form">
                            <legend>Select your preferred option:</legend>
                            <input type="radio" id="option-one" name="choice" value="pollOptionOne" />
                            <label htmlFor="option-one">{poll.poll.pollOptionOne.optionOneDescription}</label>
                            <input type="radio" id="option-two" name="choice" value="pollOptionTwo" />
                            <label htmlFor="option-two">{poll.poll.pollOptionTwo.optionTwoDescription}</label>
                          </fieldset>
                          <button className="button primary" type="submit"> Submit</button>
                        </form>
                      </div>
                      <div className="secondary-buttons">
                        <button className="button secondary" aria-label="Copy poll link to keyboard." value="copy" onClick={(e) => { clickHandler(e, poll) }}>Copy Poll Link</button>
                        <Link className="button secondary" to={`/results/${boothID}`}>See Results Only</Link>
                      </div>
                    </div>
                    : null}
                </React.Fragment>
              );
            })
          }
        </section>}
    </>
  );
};

export default VotingBooth;