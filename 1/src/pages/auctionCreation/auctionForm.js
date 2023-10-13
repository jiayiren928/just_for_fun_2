import { useCallback, useEffect, useState } from 'react';
import moment from 'moment-timezone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsonDoc from './category_specific_requirements.json';
/**
 * This is all the logic and structures of the Auction Form registration component
 */
const AuctionForm = () => {

    const navigate = useNavigate();

    const categories = ["car", "electricity", "phone"]
    
    const categorySpecificRequirements = jsonDoc;

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [price, setPrice] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState({});
    const [previousQuestionCategory, setPreviousQuestionCategory] = useState('');   // set to the previous category value, will initially be empty

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate("/");
        }
      })

    const data = {
        "buyerid": JSON.parse(localStorage.getItem("user")).id,
        "title": title,
        "category": category,
        "description": description,
        "endDate": moment(endDate).toISOString(),
        "requirements": requirements
    }
    const headers = {
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/v1/reverseAuctions',
            data,
            headers
        ).then(res => {
            console.log(res);
            console.log(res.data);
            navigate("/");
        }).catch(error => {
            console.log(error);
            console.log(error.data);
        })
    }


    const onSubmit = useCallback((e) => {

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

        if (alertText.length > 0) {
            return alert(alertText)
        } else {
            handleSubmit(e)
        }
    },
        [title, category, price, endDate, description, requirements]
    );


    const validPrice = e => {
        var priceRegex = /^[1-9]\d*\.{0,1}\d{0,2}$/;

        if (e.target.value === "" || priceRegex.test(e.target.value)) {
            setPrice(e.target.value)
        }
    }


    const isSameCategory = e => {
        if (e === previousQuestionCategory) {
        } else {
            setRequirements({});
        }
    }


    const updateRequirements = (e, a) => {

        var isQuestionTypeCheckBox = false;

        if (e === " -- select an option -- ") {
            // if default option, do nothing
        } else {    
            for (let i = 0; i < categorySpecificRequirements.length; i++) {
                for (let j = 0; j < categorySpecificRequirements[i].questions.length; j++) {
                    if (categorySpecificRequirements[i].questions[j].question === a) {
                        setPreviousQuestionCategory(categorySpecificRequirements[i].name);
                        if (categorySpecificRequirements[i].questions[j].formType === "checkbox") {
                            isQuestionTypeCheckBox = true;
                        }
                    }
                }
            }
        }
        var otherReq = requirements;

        if (isQuestionTypeCheckBox && otherReq[a]) {
            otherReq[a] += ";" + e;
        } else {
            otherReq[a] = e;
        }
        setRequirements(otherReq);
    }


    const createReqComponentBasedOnType = (category, i) => {
        var s = 0;
        for (let temp = 0; temp < categorySpecificRequirements.length; temp++) {
           if (categorySpecificRequirements[temp].name === category) {
                s = temp;
            }
        }

        if (i.formType === "dropdown") {
            return (<div>
                    {<select onChange={(v) => updateRequirements(v.target.value, i.question)}>
                        <option hidden selected value=" -- select an option -- "> -- select an option -- </option>
                        {categorySpecificRequirements[s].answers.at(i.id).ans.map(a => 
                            <option key={a.id} value={a.answer}>{a.answer}</option>)}
                    </select>}
                </div>);
        } else if (i.formType === "radio") {
            return (categorySpecificRequirements[s].answers.at(i.id).ans.map( a => 
                <div onChange={(v) => updateRequirements(v.target.value, i.question)}>
                    <input type="radio" name={i.question} value={a.answer}></input> 
                    <label for={a.answer}>{a.answer}</label>
                </div>));
        } else if (i.formType === "checkbox") {
            return (categorySpecificRequirements[s].answers.at(i.id).ans.map( a=> 
                <div onChange={(v) => updateRequirements(v.target.value, i.question)}>
                    <input type="checkbox" name={i.question} value={a.answer}></input>
                    <label for={a.answer}>{a.answer}</label>
                </div>));
        } else if (i.formType === "text") {
            return (
                <div>            
                    <input
                        type="text"
                        defaultValue=""
                        onChange={(v) => updateRequirements(v.target.value, i.question)}
                    />
                </div>

            );
        }
        return 0;
    }

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/");
    }

    const home = () => {
        navigate("/");
    }

    const dashboard = () => {
        navigate("/buyer-dashboard");
    }

    return (
        <div className='auction-creation-page'>
            <div>
            <button to="/" className="button button-login" onClick={home}>Home</button>
            <button to="/buyer-dashboard" className="button button-logout" onClick={dashboard}>Dashboard</button>
            <button to="/" className="button button-login" onClick={logout}>Logout</button>
            </div>
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
                                    placeholder="Auction Title"/>
                            </label>
                        </div>
                        <div className="auctioncategory">
                            <label>Auction Category
                                <select id="Category" value={category} onChange={(v) => {setCategory(v.target.value);isSameCategory(v.target.value)}}>
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
                                    placeholder="Price"/>
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
                                    placeholder="End Date"/>
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
                        <div className="requirements">
                            <label>Requirements<br/>    
                                {category === "car" && categorySpecificRequirements[0].questions.map( (i) => 
                                    <label>{i.question}
                                        {
                                            createReqComponentBasedOnType(categorySpecificRequirements[0].name, i)
                                        }
                                    </label>
                                    )
                                }
                                {category === "electricity" && categorySpecificRequirements[1].questions.map( (j) => 

                                    <label>{j.question}
                                    {
                                        createReqComponentBasedOnType(categorySpecificRequirements[1].name, j)
                                    }
                                    </label>
                                    )
                                }
                                {category === "phone" &&
                                    categorySpecificRequirements[2].questions.map( (k) =>
                                        <label>{k.question}
                                        {
                                            createReqComponentBasedOnType(categorySpecificRequirements[2].name, k)
                                        }
                                        </label>
                                    )
                                }
                            </label>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <button type="submit" onClick={(e) => onSubmit(e)}>Create Auction</button>
                    </div>
                </form>
            </div>
        </div>

    )
}
export default AuctionForm;