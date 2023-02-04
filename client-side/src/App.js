import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainContent from './components/main-component';
import Header from './components/header';
import New from './components/new';
import Poll from './components/poll';
import PollResult from './components/poll-result';
import PollAdmin from './components/poll-admin';
import EditPoll from './components/edit-poll';
import "bootstrap/dist/css/bootstrap.min.css"


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={MainContent} />
          <Route path="/new" component={New} />
          <Route path="/poll" component={Poll} />
          <Route path="/poll-result" component={PollResult} />
          <Route path="/poll-admin" component={PollAdmin} />
          <Route path="/edit-poll" component={EditPoll} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
