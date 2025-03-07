//Modules
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
//Assets
import Confirm from '../assets/confirm.svg';

const PollConfirmation = (pollId) => {
  //Copy url and save to clipboard:
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`whatever-floats-your-vote.netlify.app/votingbooth/${pollId.pollId}`)
    //Confirm link was saved to clipboard:
    Swal.fire({
      icon: "success",
      title: "Saved to clipboard!",
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <div className="poll-confirmation-container">
      <h2 className="h2-minor">Your poll has been created!</h2>
        <img src={Confirm} className="confirm-graphic" alt="Illustration of a checkmark to confirm that the poll has been created." />
      <div className="confirmation-buttons">
        <Link
          className="button primary" aria-label='Copy poll link to clipboard'
          to={`/votingbooth/${pollId.pollId}`}> View Your Poll</Link>
        <button
          className="button secondary"
          onClick={copyToClipboard}>Copy Poll Link</button>
      </div>
    </div>
  );
};

export default PollConfirmation;