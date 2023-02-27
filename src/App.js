import logo from './logo.svg';
import axios from 'axios';
import {useState} from "react";
import './App.css';
import RepoDetails from "./RepoDetails";

function App() {
  const [username, setUsername]= useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [details, setDetails]=useState({});
  const [detailsLoading, setDetailsloading]= useState(false);

  function handleSubmit(e){
    e.preventDefault();
    searchRepos();
  };

  function searchRepos(){
    setLoading(true);
    axios({
      method: "get",
      url: 'https://api.github.com/users/${username}/repos',
    }).then(res => {
      setLoading(false);
      setRepos{res.data};
    });
  }

  function renderRepo(repo) {
    return (
      <div classname="row"  onClick={() => getdetails(repo.name)} key={repo.id}>
        <h2 className="repo-name">
          {repo.name}
        </h2>
      </div>
    );
  }

  function getDetails(repoName) {
    setDetailsloading(true);
    axios({
      method:"get",
      url:'https://api.github.com/repos/${username}/${repoName}',
    }).then(res => {
      setDetailsloading(false);
      setDetails(res.data);
    });
  }

  return (
    <div className="page">
      <div className="landing-page-container">
        <div className="left-slide">
          <form className="form">
            <input
              className="input"
              value={username}
              placeholder="Github Username"
              onChange={e => setUsername(e.target.value)}
            />
            <button className="button" onClick={handleSubmit}>{loading ? "Searching..." : "Search"}</button>
          </form>
          <div className="results-container">
            {repos.map(renderRepo)}
          </div>
        </div>
        <div>
          <RepoDetails details={details} loading={detailsLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
