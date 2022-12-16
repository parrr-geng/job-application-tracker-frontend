import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button, FormGroup } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/auth.context"; 
import service from "../../services/api.service";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditProfilePage () {
    const [oneUser, setOneUser] = useState({});

    const [name, setName] = useState("");
    const [profileImageURL, setProfileImageURL] = useState("");
    const [location, setLocation] = useState("");
    const [about, setAbout] = useState("");
    const [website, setWebsite] = useState("");
    const [experience, setExperience] = useState("");
    const [education, setEducation] = useState("");
    const [certifications, setCertifications] = useState("");
    const [languages, setLanguages] = useState([]);
    const [skills, setSkills] = useState("");
    
    const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";
    const { user } = useContext(AuthContext);
    const userId = user._id;
    const navigate = useNavigate();

    useEffect(() => {
        axios
          .get(`${baseURL}/api/profile/${userId}`)
          .then((response) => {
            const oneUser = response.data;
            setOneUser(oneUser);

            setName(oneUser.name);
            setProfileImageURL(oneUser.profileImageURL);
            setLocation(oneUser.location);
            setAbout(oneUser.about);
            setWebsite(oneUser.website);
            setExperience(oneUser.experience);
            setEducation(oneUser.education);
            setCertifications(oneUser.certifications);
            setLanguages(oneUser.languages);
            setSkills(oneUser.skills);
            })
          .catch(err => console.log(err));  
      }, [userId]);
    
    const handleFileUpload = e => {
        const uploadData = new FormData();
        uploadData.append("profileImageURL", e.target.files[0])

        service
        .uploadImage(uploadData)
        .then(response => {
            setProfileImageURL(response.data.fileUrl);
            console.log(response.data.fileUrl);
        })
        .catch(err => console.log("Error while uploading the file: ", err)); 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = {name, profileImageURL, location, about, website, experience, education, certifications, languages, skills};

        axios
          .put(`${baseURL}/api/profile/${userId}/edit`, requestBody)
          .then(response => {
            setOneUser(response.data);
            navigate(`/dashboard`);
          })
          .catch(err => console.log(err));
    }
    
    return(
        <>  
        <div className="row">
            <div className="col">
                <Sidebar />
            </div>
            <div className="col-10 p-4" style={{"textAlign":"left"}}>
                <div className="col-8">
                    <h5>Edit Your Profile</h5>
                    <Form onSubmit = { handleSubmit }>
                        <FormGroup className="mb-3">
                            <Form.Label>Profile Image</Form.Label>
                            <Form.Control type="file" name="profileImage" onChange={e => handleFileUpload(e)}/>
                        </FormGroup>
    
                        <Row className="mb-3">
                            <Col md>
                                <FormGroup controlId="floatingInput2">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" placeholder={oneUser.name} onChange={e=>setName(e.target.value)} required />
                                </FormGroup>
                            </Col>
                            <Col md>
                                <FormGroup controlId="floatingInput3">
                                    <Form.Label>Website</Form.Label>
                                    <Form.Control type="text" name="website" placeholder={oneUser.website} onChange={e=>setWebsite(e.target.value)} required />
                                </FormGroup>
                            </Col>
                            <Col md>
                                <FormGroup controlId="floatingSelectGrid" label="Location">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Select name="location" aria-label="Flating label select" onChange={e => setLocation(e.target.value)}>
                                        <option>Select your current location</option>
                                        <option value="Afghanistan">Afghanistan</option>
                                        <option value="Aland Islands">Aland Islands</option>
                                        <option value="Albania">Albania</option>
                                        <option value="Algeria">Algeria</option>
                                        <option value="American Samoa">American Samoa</option>
                                        <option value="Andorra">Andorra</option>
                                        <option value="Angola">Angola</option>
                                        <option value="Anguilla">Anguilla</option>
                                        <option value="Antarctica">Antarctica</option>
                                        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                        <option value="Argentina">Argentina</option>
                                        <option value="Armenia">Armenia</option>
                                        <option value="Aruba">Aruba</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Austria">Austria</option>
                                        <option value="Azerbaijan">Azerbaijan</option>
                                        <option value="Bahamas">Bahamas</option>
                                        <option value="Bahrain">Bahrain</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="Barbados">Barbados</option>
                                        <option value="Belarus">Belarus</option>
                                        <option value="Belgium">Belgium</option>
                                        <option value="Belize">Belize</option>
                                        <option value="Benin">Benin</option>
                                        <option value="Bermuda">Bermuda</option>
                                        <option value="Bhutan">Bhutan</option>
                                        <option value="Bolivia">Bolivia</option>
                                        <option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>
                                        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                        <option value="Botswana">Botswana</option>
                                        <option value="Bouvet Island">Bouvet Island</option>
                                        <option value="Brazil">Brazil</option>
                                        <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                        <option value="Brunei Darussalam">Brunei Darussalam</option>
                                        <option value="Bulgaria">Bulgaria</option>
                                        <option value="Burkina Faso">Burkina Faso</option>
                                        <option value="Burundi">Burundi</option>
                                        <option value="Cambodia">Cambodia</option>
                                        <option value="Cameroon">Cameroon</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Cape Verde">Cape Verde</option>
                                        <option value="Cayman Islands">Cayman Islands</option>
                                        <option value="Central African Republic">Central African Republic</option>
                                        <option value="Chad">Chad</option>
                                        <option value="Chile">Chile</option>
                                        <option value="China">China</option>
                                        <option value="Christmas Island">Christmas Island</option>
                                        <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                        <option value="Colombia">Colombia</option>
                                        <option value="Comoros">Comoros</option>
                                        <option value="Congo">Congo</option>
                                        <option value="Congo, Democratic Republic of the Congo">Congo, Democratic Republic of the Congo</option>
                                        <option value="Cook Islands">Cook Islands</option>
                                        <option value="Costa Rica">Costa Rica</option>
                                        <option value="Cote D'Ivoire">Cote D'Ivoire</option>
                                        <option value="Croatia">Croatia</option>
                                        <option value="Cuba">Cuba</option>
                                        <option value="Curacao">Curacao</option>
                                        <option value="CY">Cyprus</option>
                                        <option value="CZ">Czech Republic</option>
                                        <option value="DK">Denmark</option>
                                        <option value="DJ">Djibouti</option>
                                        <option value="DM">Dominica</option>
                                        <option value="DO">Dominican Republic</option>
                                        <option value="EC">Ecuador</option>
                                        <option value="EG">Egypt</option>
                                        <option value="SV">El Salvador</option>
                                        <option value="GQ">Equatorial Guinea</option>
                                        <option value="ER">Eritrea</option>
                                        <option value="EE">Estonia</option>
                                        <option value="ET">Ethiopia</option>
                                        <option value="FK">Falkland Islands (Malvinas)</option>
                                        <option value="FO">Faroe Islands</option>
                                        <option value="FJ">Fiji</option>
                                        <option value="Finland">Finland</option>
                                        <option value="France">France</option>
                                        <option value="GF">French Guiana</option>
                                        <option value="French Polynesia">French Polynesia</option>
                                        <option value="French Southern Territories">French Southern Territories</option>
                                        <option value="GA">Gabon</option>
                                        <option value="GM">Gambia</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Germany">Germany</option>
                                        <option value="GH">Ghana</option>
                                        <option value="GI">Gibraltar</option>
                                        <option value="Greece">Greece</option>
                                        <option value="GL">Greenland</option>
                                        <option value="GD">Grenada</option>
                                        <option value="GP">Guadeloupe</option>
                                        <option value="GU">Guam</option>
                                        <option value="GT">Guatemala</option>
                                        <option value="GG">Guernsey</option>
                                        <option value="GN">Guinea</option>
                                        <option value="GW">Guinea-Bissau</option>
                                        <option value="GY">Guyana</option>
                                        <option value="HT">Haiti</option>
                                        <option value="HM">Heard Island and Mcdonald Islands</option>
                                        <option value="VA">Holy See (Vatican City State)</option>
                                        <option value="HN">Honduras</option>
                                        <option value="Hong Kong">Hong Kong</option>
                                        <option value="HU">Hungary</option>
                                        <option value="IS">Iceland</option>
                                        <option value="India">India</option>
                                        <option value="ID">Indonesia</option>
                                        <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                                        <option value="IQ">Iraq</option>
                                        <option value="IE">Ireland</option>
                                        <option value="IM">Isle of Man</option>
                                        <option value="IL">Israel</option>
                                        <option value="IT">Italy</option>
                                        <option value="JM">Jamaica</option>
                                        <option value="JP">Japan</option>
                                        <option value="JE">Jersey</option>
                                        <option value="JO">Jordan</option>
                                        <option value="KZ">Kazakhstan</option>
                                        <option value="KE">Kenya</option>
                                        <option value="KI">Kiribati</option>
                                        <option value="KP">Korea, Democratic People's Republic of</option>
                                        <option value="Korea, Republic of">Korea, Republic of</option>
                                        <option value="XK">Kosovo</option>
                                        <option value="KW">Kuwait</option>
                                        <option value="KG">Kyrgyzstan</option>
                                        <option value="LA">Lao People's Democratic Republic</option>
                                        <option value="LV">Latvia</option>
                                        <option value="LB">Lebanon</option>
                                        <option value="LS">Lesotho</option>
                                        <option value="LR">Liberia</option>
                                        <option value="LY">Libyan Arab Jamahiriya</option>
                                        <option value="LI">Liechtenstein</option>
                                        <option value="LT">Lithuania</option>
                                        <option value="LU">Luxembourg</option>
                                        <option value="MO">Macao</option>
                                        <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
                                        <option value="MG">Madagascar</option>
                                        <option value="MW">Malawi</option>
                                        <option value="MY">Malaysia</option>
                                        <option value="MV">Maldives</option>
                                        <option value="ML">Mali</option>
                                        <option value="MT">Malta</option>
                                        <option value="MH">Marshall Islands</option>
                                        <option value="MQ">Martinique</option>
                                        <option value="MR">Mauritania</option>
                                        <option value="MU">Mauritius</option>
                                        <option value="YT">Mayotte</option>
                                        <option value="MX">Mexico</option>
                                        <option value="FM">Micronesia, Federated States of</option>
                                        <option value="MD">Moldova, Republic of</option>
                                        <option value="MC">Monaco</option>
                                        <option value="MN">Mongolia</option>
                                        <option value="ME">Montenegro</option>
                                        <option value="MS">Montserrat</option>
                                        <option value="MA">Morocco</option>
                                        <option value="MZ">Mozambique</option>
                                        <option value="MM">Myanmar</option>
                                        <option value="NA">Namibia</option>
                                        <option value="NR">Nauru</option>
                                        <option value="NP">Nepal</option>
                                        <option value="NL">Netherlands</option>
                                        <option value="AN">Netherlands Antilles</option>
                                        <option value="NC">New Caledonia</option>
                                        <option value="NZ">New Zealand</option>
                                        <option value="NI">Nicaragua</option>
                                        <option value="NE">Niger</option>
                                        <option value="NG">Nigeria</option>
                                        <option value="NU">Niue</option>
                                        <option value="NF">Norfolk Island</option>
                                        <option value="MP">Northern Mariana Islands</option>
                                        <option value="NO">Norway</option>
                                        <option value="OM">Oman</option>
                                        <option value="PK">Pakistan</option>
                                        <option value="PW">Palau</option>
                                        <option value="PS">Palestinian Territory, Occupied</option>
                                        <option value="PA">Panama</option>
                                        <option value="PG">Papua New Guinea</option>
                                        <option value="PY">Paraguay</option>
                                        <option value="PE">Peru</option>
                                        <option value="PH">Philippines</option>
                                        <option value="PN">Pitcairn</option>
                                        <option value="PL">Poland</option>
                                        <option value="PT">Portugal</option>
                                        <option value="PR">Puerto Rico</option>
                                        <option value="QA">Qatar</option>
                                        <option value="RE">Reunion</option>
                                        <option value="RO">Romania</option>
                                        <option value="RU">Russian Federation</option>
                                        <option value="RW">Rwanda</option>
                                        <option value="BL">Saint Barthelemy</option>
                                        <option value="SH">Saint Helena</option>
                                        <option value="KN">Saint Kitts and Nevis</option>
                                        <option value="LC">Saint Lucia</option>
                                        <option value="MF">Saint Martin</option>
                                        <option value="PM">Saint Pierre and Miquelon</option>
                                        <option value="VC">Saint Vincent and the Grenadines</option>
                                        <option value="WS">Samoa</option>
                                        <option value="SM">San Marino</option>
                                        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                        <option value="Saudi Arabia">Saudi Arabia</option>
                                        <option value="Senegal">Senegal</option>
                                        <option value="Serbia">Serbia</option>
                                        <option value="Serbia and Montenegro">Serbia and Montenegro</option>
                                        <option value="Seychelles">Seychelles</option>
                                        <option value="Sierra Leone">Sierra Leone</option>
                                        <option value="Singapore">Singapore</option>
                                        <option value="Sint Maarten">Sint Maarten</option>
                                        <option value="Slovakia">Slovakia</option>
                                        <option value="Slovenia">Slovenia</option>
                                        <option value="Solomon Islands">Solomon Islands</option>
                                        <option value="Somalia">Somalia</option>
                                        <option value="South Africa">South Africa</option>
                                        <option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
                                        <option value="South Sudan">South Sudan</option>
                                        <option value="Spain">Spain</option>
                                        <option value="Sri Lanka">Sri Lanka</option>
                                        <option value="Sudan">Sudan</option>
                                        <option value="Suriname">Suriname</option>
                                        <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                        <option value="Swaziland">Swaziland</option>
                                        <option value="Sweden">Sweden</option>
                                        <option value="Switzerland">Switzerland</option>
                                        <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                        <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                                        <option value="Tajikistan">Tajikistan</option>
                                        <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                        <option value="Thailand">Thailand</option>
                                        <option value="Timor-Leste">Timor-Leste</option>
                                        <option value="Togo">Togo</option>
                                        <option value="Tokelau">Tokelau</option>
                                        <option value="Tonga">Tonga</option>
                                        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                        <option value="Tunisia">Tunisia</option>
                                        <option value="Turkey">Turkey</option>
                                        <option value="Turkmenistan">Turkmenistan</option>
                                        <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                        <option value="Tuvalu">Tuvalu</option>
                                        <option value="Uganda">Uganda</option>
                                        <option value="Ukraine">Ukraine</option>
                                        <option value="United Arab Emirates">United Arab Emirates</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="United States">United States</option>
                                        <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                        <option value="Uruguay">Uruguay</option>
                                        <option value="Uzbekistan">Uzbekistan</option>
                                        <option value="Vanuatu">Vanuatu</option>
                                        <option value="Venezuela">Venezuela</option>
                                        <option value="Vietnam">Vietnam</option>
                                        <option value="Virgin Islands, British">Virgin Islands, British</option>
                                        <option value="Virgin Islands, U.s.">Virgin Islands, U.s.</option>
                                        <option value="Wallis and Futuna">Wallis and Futuna</option>
                                        <option value="Western Sahara">Western Sahara</option>
                                        <option value="Yemen">Yemen</option>
                                        <option value="Zambia">Zambia</option>
                                        <option value="Zimbabwe">Zimbabwe</option>
                                    </Form.Select>
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup className="mb-3" controlId="floatingTextarea1">
                            <Form.Label>About</Form.Label>
                            <ReactQuill theme="snow" value={about} onChange={setAbout} />
                            {/* <Form.Control as="textarea" name="about" placeholder={oneUser.about} onChange={e=>setAbout(e.target.value)} style={{ height: '100px' }} /> */}
                        </FormGroup>
                        
                        

                        <FormGroup className="mb-3" controlId="floatingTextarea2">
                            <Form.Label>Experience</Form.Label>
                            <Form.Control as="textarea" name="experience" onChange={e => setExperience(e.target.value)} placeholder={oneUser.experience} />
                        </FormGroup>


                        <FormGroup className="mb-3" controlId="floatingTextarea3">
                            <Form.Label>Education</Form.Label>
                            <Form.Control as="textarea" name="education" onChange={e => setEducation(e.target.value)} placeholder={oneUser.education} />
                        </FormGroup>
                        
                        <FormGroup className="mb-3" controlId="floatingTextarea4">
                            <Form.Label>Certifications</Form.Label>
                            <Form.Control as="textarea" name="education" onChange={e => setCertifications(e.target.value)} placeholder={oneUser.certifications} />
                        </FormGroup>
                        
                        <Row className="mb-3">
                            <Col md>
                                <FormGroup>
                                    <Form.Label>Languages</Form.Label>
                                    <Form.Select name="languages" multiple onChange={e => setLanguages(Array.from(e.target.selectedOptions, item => item.value))} >
                                        <option value="Chinese">Chinese</option>
                                        <option value="English">English</option>
                                        <option value="German">German</option>
                                        <option value="Spanish">Spanish</option>
                                    </Form.Select>
                                </FormGroup>
                            </Col>
                            <Col md>
                                <FormGroup className="mb-2" controlId="floatingTextarea5">
                                    <Form.Label>Skills</Form.Label>
                                    <Form.Control as="textarea" name="skills" onChange={e => setSkills(e.target.value)} placeholder={oneUser.skills} />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Button variant="dark" type="submit">Save</Button>
                    </Form>
                </div>
            </div>
        </div>
            
        </>
    )
}

export default EditProfilePage;