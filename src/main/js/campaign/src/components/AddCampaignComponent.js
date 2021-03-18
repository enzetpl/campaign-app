import {Component} from "react";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import CampaingsDataService from "../services/CampaingsDataService";
import {Typeahead} from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';

class AddCampaignComponent extends Component {

    defaultCampaign = {
        name: '',
        keywords: [],
        bidAmount: 0,
        campaignStatus: "ON",
        town: 't1',
        campaignFund: 0,
        radius: 0
    }

    constructor(props) {
        super(props);
        this.state = {
            item: this.defaultCampaign,
            keywords: [],
            id: this.props.match.params.campaignId,
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.state.id !== 'new') {
            CampaingsDataService.getCampaign(this.state.id)
                .then(response => {
                    this.setState({item: response.data})
                })
        }
    }

    onSubmit(values, {setErrors}) {
        let campaign = values;
        console.log(values)
        if (this.state.id === 'new') {
            CampaingsDataService.saveCampaign(campaign)
                .then(() => this.props.history.push('/'))
                .catch(err => {
                    let errors = err.response.data.errors
                    let reducedErrors = errors.reduce((acc, cur) => ({...acc, [cur.fieldName]: cur.message}), {})
                    setErrors(reducedErrors);
                })
        } else {
            CampaingsDataService.updateCampaign(this.state.id, campaign)
                .then(() => this.props.history.push('/'))
                .catch(err => {
                    let errors = err.response.data.errors
                    let reducedErrors = errors.reduce((acc, cur) => ({...acc, [cur.fieldName]: cur.message}), {})
                    setErrors(reducedErrors);
                })
        }
    }

    render() {
if(this.state.item.keywords.length < 1 && this.props.match.params.campaignId !== 'new') {
    return (
        <div>
            loading...
        </div>
    )
} else {
        let name = this.state.item.name;
        let keywords = this.state.item.keywords;
        let bidAmount = this.state.item.bidAmount;
        let campaignStatus = this.state.item.campaignStatus;
        let campaignFund = this.state.item.campaignFund;
        let town = this.state.item.town;
        let radius = this.state.item.radius;
        let allKeywords = ["Appliances", "Apps", "Arts", "Automotive", "Baby", "Beauty", "Books", "CDs", "Cell Phones", "Clothing", "Collectibles", "Computers",
            "Electronics", "Garden", "Grocery", "Handmade", "Health", "Home", "Industrial", "Kindle", "Luggage", "Movies", "Musical Instruments", "Office Products",
            "Pet Supplies", "Sports", "Tools", "Toys", "Video Games"];
        let towns = ["", "Amsterdam", "Andorra la Vella", "Athens", "Baku",
            "Belgrade", "Berlin", "Bern", "Bratislava", "Brussels", "Bucharest", "Budapest", "Chisinau",
            "Copenhagen", "Dublin", "Helsinki", "Kiev", "Lisbon", "Ljubljana", "London", "Luxembourg city",
            "Madrid", "Minsk", "Monaco", "Moscow", "Oslo", "Paris", "Podgorica", "Prague", "Pristina", "Reykjavik", "Riga",
            "Rome", "San Marino", "Sarajevo", "Skopje", "Sofia", "Stockholm", "Tallinn", "Tbilisi", "Tirana", "Vaduz", "Valletta",
            "Vatican city", "Vienna", "Vilnius", "Warsaw", "Zagreb"];
        return (
            <div className="container">
                <Formik
                    initialValues={{name, keywords, bidAmount, campaignStatus, campaignFund, town, radius}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}
                >
                    {
                        ({props, setFieldValue, errors,touched}) => (
                            <Form >
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label" >Name:</label>
                                    <Field className="form-control col-sm-10" type="text" name="name"/>
                                    <ErrorMessage name="name" component="div" className="text-danger"/>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label"  >Campaign fund:</label>
                                    <Field className="form-control col-sm-10" type="text" name="campaignFund" />
                                    <ErrorMessage name="campaignFund" component="div" className="text-danger"/>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Bid amount:</label>
                                    <Field className="form-control col-sm-10" type="text" name="bidAmount"/>
                                    <ErrorMessage name="bidAmount" component="div" className="text-danger"/>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Radius:</label>
                                    <Field className="form-control col-sm-10"  pattern="\d*"
                                           type="number" name="radius"/>
                                    <ErrorMessage name="radius" component="div" className="text-danger"/>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <legend className="col-form-label col-sm-2 pt-0">Status:</legend>
                                        <div className="col-sm-10">
                                            <div className="form-check form-check-inline">
                                                <Field type="radio" className="form-check-input" name="campaignStatus" id="ON" value="ON" />
                                                <label className="form-check-label" htmlFor="ON">ON</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <Field type="radio" className="form-check-input" name="campaignStatus" id="OFF" value="OFF" />
                                                <label className="form-check-label" htmlFor="OFF">OFF</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Town:</label>
                                    <ErrorMessage name="town" component="div" className="text-danger"/>
                                    <Field as="select" className="form-control col-sm-10" type="text" name="town">{
                                        towns.map(town => {
                                            return(
                                                <option key={town} value={town}>{town}</option>
                                            )
                                        })
                                    }</Field>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Keywords:</label>
                                    <Typeahead
                                        defaultSelected={keywords}
                                        multiple={true}
                                        className="col-sm-10"
                                        id="keywords"
                                        onChange={(selected) => {
                                            this.setState({keywords: selected})
                                            setFieldValue('keywords', selected);
                                        }}
                                        onInputChange={(text, event) => setFieldValue('keywords', text)}
                                     labelKey="keywords"
                                     options={allKeywords}
                                />
                                <div className="text-danger">{touched.keywords && errors.keywords}</div>
                                </div>
                                <button className="btn btn-success" type="submit">Save</button>
                                <div className="custom-control-inline m-2">
                                <button className="btn btn-primary"  onClick={() => this.props.history.push('/')}>Back to list</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        )
    }
    }
}
export default AddCampaignComponent