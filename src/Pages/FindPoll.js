//Modules
import firebase from "../Components/Firebase";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
//Components
import CreatePoll from "./CreatePoll";
//Assets
import SearchGraphic from "../assets/search-graphic-undraw.svg";

const FindPoll = () => {
  const [pollData, setPollData] = useState([]);
  const [dbState, setDbState] = useState();
  // Firebase Connection
  useEffect(() => {
    // Create a database to holds our firebase details:
    const database = getDatabase(firebase);
    // Create variable that makes a reference(ref) to our database:
    const dbRef = ref(database);
    setDbState(database);
    // Get database info on load or on change:
    onValue(dbRef, (response) => {
      // Create an empty array:
      const newState = [];
      // Use Firebase's .val() to parse our database info into the format we need:
      const dataResponse = response.val();
      // Data is an object, so we iterate through it using a for in loop to access each voting booth:
      for (let key in dataResponse) {
        // Inside the loop, we push each poll to the empty array:
        newState.push({ key: key, poll: dataResponse[key] });
      }
      //  Set state to match newState array:
      setPollData(newState);
    }// End of onValue
    )
  }, []);

  //Delete polls from page and firebase:
  const deleteFunction = (key) => {
    const keyRef = ref(dbState, `/${key}`);
    //Alert for confirmation before deleting: 
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        //Confirm poll is deleted:
        Swal.fire(
          "Deleted!",
          "Your file has been deleted.",
          "success"
        )
        //Removal from firebase:
        remove(keyRef);
      }
    });
  };

  return (
    <section className="find-poll-section wrapper">
      <h2>Find a Poll</h2>
      {/* Map through our firebase "Poll Data" and return the poll name & voting booth link for each available poll. */}
      {[...pollData].reverse().map((poll, index) => {
        return (
          <div className="find-poll-container" key={poll.key}>
            <div className="h3-container">
              <h3>{poll.poll.pollQuestion}</h3>
            </div>
            <div className="find-poll-links">
              <Link className="button primary" to={`/votingbooth/${poll.key}`}> Voting Booth</Link>
              <Link className="button secondary" to={`/results/${poll.key}`}>See Results</Link>
            </div>
            <button className="delete-button" onClick={() => deleteFunction(poll.key)}><FaTimesCircle className="delete-button-icon" aria-label="Delete Poll" /></button>
          </div>
        );
      })}
      <div className="find-poll-container no-poll-container">
        <h3>That's all for now...</h3>
        <div className="find-poll-img">
          <img src={SearchGraphic} alt="Illustration of person holding a magnifying glass and searching a document." />
        </div>
        <Link to={`/createpoll`} element={<CreatePoll />} className="button primary"> Create A Poll</Link>
      </div>
    </section>
  );
};

export default FindPoll;