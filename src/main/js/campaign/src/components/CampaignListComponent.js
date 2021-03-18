import { Component } from 'react';
import CampaingsDataService from "../services/CampaingsDataService";
import {Button, Container, Table} from "reactstrap";

class CampaignListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            campaigns: []
        }
    }

    componentDidMount() {
        CampaingsDataService.getAllCampaigns()
            .then(response => this.setState({campaigns: response.data}));
    }

    editCampaign(campaignId) {
        this.props.history.push(`/${campaignId}`)
    }

    deleteCampaign(campaignId) {
        CampaingsDataService.deleteCampaign(campaignId)
            .then(()=> {
                this.componentDidMount()
            })
    }

    render() {
        let campaigns = this.state.campaigns;
        if(this.state.campaigns.length === 0) {
            return (
                <div className="vertical-center">
                    <Container align="center">
                    There are not any campagnies, add first
                    <br/>
                    <Button color={"success"} onClick={() => this.editCampaign('new')}>Add new campaign</Button>
                </Container>
                </div>
            )
        }
        return(
            <Container>
                <Table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>name</th>
                        <th>keywords</th>
                        <th>bid amount</th>
                        <th>campaign fund</th>
                        <th>status</th>
                        <th>Town</th>
                        <th>Radius</th>
                        <th>Manage</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        campaigns.map(
                            campaign =>
                                <tr key={campaign.id}>
                                    {console.log(campaign)}
                                    <td>{campaign.id}</td>
                                    <td>{campaign.name}</td>
                                    <td>{campaign.keywords.map(keyword=> keyword + ', ')}</td>
                                    <td>{campaign.bidAmount}</td>
                                    <td>{campaign.campaignFund}</td>
                                    <td className={campaign.campaignStatus}>{campaign.campaignStatus}</td>
                                    <td>{campaign.town}</td>
                                    <td>{campaign.radius+'km'}</td>
                                    <td>
                                        <Button color="primary" onClick={() => this.editCampaign(campaign.id)}>Edit</Button>
                                        <Button color="danger" onClick={()=> this.deleteCampaign(campaign.id)}>Delete</Button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </Table>
                <Button color={"success"} onClick={() => this.editCampaign('new')}>Add new campaign</Button>
            </Container>
        )
    }
}
export default CampaignListComponent;