import { useCallback, useState } from 'react';
import moment from 'moment-timezone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsonDoc from './category_specific_requirements.json';
import Select from 'react-select';
/**
 * This is all the logic and structures of the Auction Form registration component
 */
const AuctionForm = () => {

    

    const categories = ["car", "electricity", "phone"]

    const childDropdown = "";
    
    const categorySpecificRequirements = jsonDoc;

    const [dropdowns, setDropdowns] = useState([]);

    const createReqDropDown = e => {
        console.log(e);

        var qkey = 0;
        var category = "";
        var question = "";
        // loop through categorySpecificRequirements till we find the question, then set var qKey to key
        // TODO alter the json and code so that category doesnt need to be hardcoded (c1, c2, c3)
        for (let i = 0; i < categorySpecificRequirements.c1.questions.length; i++) {
            if (categorySpecificRequirements.c1.questions.at(i).question === e) {
                qkey = categorySpecificRequirements.c1.questions.at(i).id;
                question = categorySpecificRequirements.c1.questions.at(qkey);
                category = "c1";
            }
        }
        // for (let i = 0; i < categorySpecificRequirements.c2.questions.length; i++) {
        //     if (categorySpecificRequirements.c1.questions.at(i).question === e) {
        //         qkey = categorySpecificRequirements.c1.questions.at(i).id;
        //     }
        // }
        // for (let i = 0; i < categorySpecificRequirements.c3.questions.length; i++) {
        //     if (categorySpecificRequirements.c1.questions.at(i).question === e) {
        //         qkey = categorySpecificRequirements.c1.questions.at(i).id;
        //     }
        // }

        let items = []

        if (qkey > 0) {
            console.log("qkey value is: " + qkey);

            if (category === "c1") {
                console.log("category is: " + category)

                // for (let i = 0; i < categorySpecificRequirements.c1.answers[qkey].length; i++) {
                //     console.log(i);
                // }
                // console.log("answers are : " + categorySpecificRequirements.c1.answers[{qkey}].answer[0])
                return (<div>
                            <label id="category"/>
                                <script>
                                    document.getElementById("category").innerHTML=category;
                                </script>
                            <select>
                                {categorySpecificRequirements.c1.answers[1].map(a => <option key={a.id} value={a.answer}>{a.answer}</option>)}
                            </select>
                        </div>);
            } else if (category === "c2") {

            } else if (category === "c3") {

            }
        }

        return categorySpecificRequirements;
    }

    const navigate = useNavigate();


    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [price, setPrice] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState('');
    const [otherRequirements, setOtherRequirements] = useState([]);
    const [previousCategory, setPreviousCategory] = useState('');   // set to the previous category value, will initially be empty

    // TODO add function that fetchs categories from database and populates into an array
    // the array will be used to populate the dropdown input in the form
    // requirements = required requirements + other requirements

    // Add logic to merge requirements + otherRequirements


    const data = {
        "title": title,
        "category": category,
        "description": description,
        "endDate": moment(endDate).toISOString(),
        "requirements": {
            "test": "test"
        }
    }
    const headers = {
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST",
        }
    }

    const handleSubmit = () => {
        console.log('Submitting form')
        console.log(data)
        console.log(headers)

        axios.post('http://localhost:8080/api/v1/reverseAuctions',
            data,
            headers
        ).then(res => {
            console.log(res)
            console.log(res.data)
        }).catch(error => {
            console.log(error)
            console.log(error.data)
        })

        console.log('Form submitted')
    }

    const onSubmit = useCallback(() => {
        console.log(categorySpecificRequirements.c1.name);

        var alertText = "";

        if (!title) {
            alertText += "Please enter a title for your auction.\n";
        }

        if (!price) {
            alertText += "Please enter a price for your auction.\n";
        }

        if (!endDate) {
            alertText += "Please enter an end-date for your auction.\n";
        }

        if (!description) {
            alertText += "Please enter a description for your auction\n";
        }

        // uncomment when mandatory requirements are implemented.
        // if (!requirements) {
        //     alertText += "Please fill out the mandatory requirements\";
        // }

        if (alertText.length > 0) {
            return alert(alertText)
        } else {
            console.log('Submitting form')
            handleSubmit()
        }
    },
        [title, category, price, endDate, description, requirements, otherRequirements]
    );

    const validPrice = e => {
        var priceRegex = /^[1-9]\d*\.{0,1}\d{0,2}$/;

        if (e.target.value === "" || priceRegex.test(e.target.value)) {
            console.log('price is now ' + e.target.value)
            setPrice(e.target.value)
        } else {
            console.log('invalid input ' + e.target.value)
        }
    }
    // TODO
    /*
        Implement updateRequirements, taking in the question and the selected answer. 
        Logic:
        BEGIN
            Take in parameters question and selected answer
            log the current requirements
            FOR each category
                FOR each question
                    IF question matches question
    */
    const updateRequirements = (e,a) => {
        if (e === " -- select an option -- ") {
            return 0;
        } else {
            console.log(otherRequirements);
            console.log("Question is : " + a + ", selected answer is : "+ e);
    
            for (let i = 0; i < categorySpecificRequirements.length; i++) {
                for (let j = 0; j < categorySpecificRequirements[i].questions.length; j++) {
                    if (categorySpecificRequirements[i].questions[j].question === a) {
                        console.log("The question is part of the " + categorySpecificRequirements[i].name + " category.")
                    }
                }
            }
    
            // concatenate onto the requirements const
            var otherReq = otherRequirements;
            otherReq.push();
            setOtherRequirements(otherReq);
        }
    }

    return (
        <div className='auction-creation-page'>
            <div className='auction-creation-content'>
                <form>
                    <div className="form-body">
                        <div className="auctiontitle">
                            <label>Auction Title
                                <input className="form__input"
                                    id="Title"
                                    type='text'
                                    value={title}
                                    onChange={(v) => setTitle(v.target.value)}
                                    placeholder="Auction Title" required />
                            </label>
                        </div>
                        <div className="auctioncategory">
                            <label>Auction Category
                                <select id="Category" value={category} onChange={(v) => setCategory(v.target.value)}>
                                    <option value="car">Car</option>
                                    <option value="electricity">Electricity Plan</option>
                                    <option value="phone">Phone Plan</option>
                                </select>
                            </label>
                        </div>
                        <div className="auctionprice">
                            <label>Max Price
                                <input className="form__input"
                                    id="Price"
                                    type='text'
                                    value={price}
                                    onChange={validPrice}
                                    placeholder="Price" required />
                            </label>
                        </div>
                        <div className="endDate">
                            <label>Auction End Date
                                <input className="form__input"
                                    id="EndDate"
                                    type='datetime-local'
                                    value={endDate}
                                    onChange={(v) => setEndDate(v.target.value)}
                                    min={moment().add(1, 'days').toISOString().slice(0, -8)}
                                    placeholder="End Date" required />
                            </label>
                        </div>
                        <div className="description">
                            <label>Description
                                <textarea
                                    maxLength={300}
                                    id="Description"
                                    defaultValue=""
                                    rows="4"
                                    cols="40"
                                    onChange={(v) => setDescription(v.target.value)}
                                />
                            </label>
                        </div>
                        {/**<div className="requirements">
                            <label>Requirements
                                <input className="form__input"
                                    id="Requirements"
                                    type='text'
                                    value={requirements}
                                    onChange={(v) => setRequirements(v.target.value)}
                                    placeholder="Requirements" required />
                            </label>
                        </div>**/}
                        <div className="otherRequirements">
                            <label>Requirements<br/>    
                                {category === "car" &&
                                    
                                    <select onChange={(v) => updateRequirements(v.target.value)}>
                                        <option selected value=" -- select an option -- "> -- select an option -- </option>
                                        {categorySpecificRequirements[0].questions.map(a => <option key={a.id} value={a.question}>{a.question}</option>)}
                                    </select>
                                    }
                                
                                
                            </label>
                        </div>
                        <div id="child-req">{childDropdown}</div>
                    </div>
                    <div>
                        <button type="submit" onClick={() => onSubmit()}>Create Auction</button>
                    </div>
                </form>
            </div>
        </div>

    )
}
export default AuctionForm;