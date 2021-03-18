import './App.css';
import CampaignListComponent from "./components/CampaignListComponent";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AddCampaignComponent from "./components/AddCampaignComponent";
function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={CampaignListComponent} />
                <Route path="/:campaignId" component={AddCampaignComponent}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
