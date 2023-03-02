//Modules
import { Link } from "react-router-dom";
//Components
import CreatePoll from "./CreatePoll";
import FindPoll from "./FindPoll";
//Assets
import HomeGraphic from "../assets/voting-home-graphic.svg";

const Home = () => {
  return (
    <>
      <section className="home-section wrapper">
        <div className="home-text-box">
          <p>Create, Share & Vote on Polls with...</p>
          <h2>Whatever Floats Your Vote</h2>
          <h3>An Anonymous Voting App</h3>
          <div className="home-button-box">
            <Link to={`/createpoll`} element={<CreatePoll />} className="button primary"> Create A Poll</Link>
            <Link to={`/findpoll`} element={<FindPoll />} className="button secondary"> Find A Poll</Link>
          </div>
        </div>
        <div className="home-graphic">
          <img src={HomeGraphic} alt="Illustration of people putting a ballot into a voting box." />
        </div>
      </section>
    </>
  );
};

export default Home;