//Modules
import firebase from "./Firebase";
import { getDatabase, ref, push } from "firebase/database";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
//Components
import PollConfirmation from "./PollConfirmation";
//Pages
import FindPoll from "../Pages/FindPoll";


const PollCreation = () => {
  const [pollQuestion, setPollQuestion] = useState("");
  const [optionOneDescription, setOptionOneDescription] = useState("");
  const [optionTwoDescription, setOptionTwoDescription] = useState("");
  const [newPollId, setNewPollId] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  //Function for poll creation and upload to firebase:
  const addPoll = (e) => {
    e.preventDefault();

    //Conditional for empty text field - return alert if empty:
    if (
      !pollQuestion ||
      !optionOneDescription ||
      !optionTwoDescription
    ) {
      //Sweet Alert for empty field:
      Swal.fire({
        icon: "error",
        title: "Oops...",
        confirmButtonColor: "#451F55D",
        text: "Please fill out all fields before submitting the poll!",
      });
      return;
    };

    //Firebase object structure:
    const pollObject = {
      pollQuestion: pollQuestion,
      pollOptionOne: {
        optionOneDescription: optionOneDescription,
        votes: 0
      },
      pollOptionTwo: {
        optionTwoDescription: optionTwoDescription,
        votes: 0
      },
      totalVotes: 0
    };

    //Reference the database:
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    //Push value of pollObject to the database:
    push(dbRef, pollObject)
      .then((newPollRef) => {
        const pollRef = newPollRef.key
        setNewPollId(pollRef);
      });
    setIsSubmitted(true);
    setPollQuestion("");
    setOptionOneDescription("");
    setOptionTwoDescription("");
  };

  //Set question field to value entered:
  const handleQuestionChange = (e) => {
    setPollQuestion(e.target.value);
  };
  //Set poll option one to value entered:
  const handleOptionOneChange = (e) => {
    setOptionOneDescription(e.target.value);
  };
  //Set poll option two to value entered:
  const handleOptionTwoChange = (e) => {
    setOptionTwoDescription(e.target.value);
  };

  return (
    <section className="wrapper create-poll-section">
      {isSubmitted ?
        <PollConfirmation pollId={newPollId} /> :
        <div>
          {
            <div className="create-poll-container">
              <h2 className="create-title">Create Your Poll</h2>
              <form className="create-poll-form">
                <h3>What's your question?</h3>
                <textarea
                  type="text"
                  maxLength={140}
                  className="poll-input poll-question"
                  name="poll-question"
                  placeholder="Poll Question"
                  value={pollQuestion}
                  onChange={handleQuestionChange}
                  aria-label="Poll Question"
                  rows="4"
                />
                <h3>Enter polling options:</h3>
                <input
                  type="text"
                  maxLength={45}
                  className="poll-input poll-option-one"
                  name="poll-option-one"
                  placeholder="Option One"
                  value={optionOneDescription}
                  onChange={handleOptionOneChange}
                  aria-label="Poll Option One"
                />
                <input
                  type="text"
                  maxLength={45}
                  className="poll-input poll-option-two"
                  name="poll-option-two"
                  placeholder="Option Two"
                  value={optionTwoDescription}
                  onChange={handleOptionTwoChange}
                  aria-label="Poll Option Two"
                />
                <div className="create-button-box">
                  <button className="button primary" aria-label="create poll" onClick={addPoll}>Submit</button>
                  <Link to={`/findpoll`} element={<FindPoll />} className="button secondary"> Find A Poll</Link>
                </div>
              </form>
            </div>
          }
        </div>
      }
    </section>
  );
};

export default PollCreation;