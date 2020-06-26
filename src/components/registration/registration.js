import React, {Component} from "react";
import './registration.css';
import UserService from '../service/UserService';

class Registration extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            hiddenLogin: true,
            hiddenFooter: false,
            gender: '',
            checkMale: true,
            checkFemale: false,
            disableForm: false
        }
    }

    onClickMale(event) {
        this.setState({
            gender: event,
            checkMale: true,
            checkFemale: false
        })
    }

    onClickFemale(event) {
        this.setState({
            gender: event,
            checkMale: false,
            checkFemale: true
        })
    }

    onClickRegister = () => {
        let mobileNumber = document.getElementById("mobileNumber").value;
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let email = document.getElementById("email").value;
        let dateOfBirth = document.getElementById("dateOfBirth").value;
        let gender = this.state.gender;

        let newUser = {
            mobileNumber: mobileNumber,
            firstName: firstName,
            lastName: lastName,
            email: email,
            dateOfBirth: new Date(dateOfBirth).getTime(),
            gender: gender
        };

        console.log("user", newUser);

        UserService.registerUser(newUser)
            .then((response) => {
                console.log(response);
                this.setState({
                    hiddenLogin: false,
                    hiddenFooter: true
                });
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            })
    };

    onClickLogin() {

    }

    render() {
        return (
            <div className="container">
                <div className="header">Registration</div>
                <div className="content" id="test">
                    <form>
                        <fieldset disabled={this.state.disableForm} style={{border: 'none'}}>
                            <div><input type="text" id="mobileNumber" placeholder="Mobile Number" className="input"
                                        pattern="[+62]{3}" title="Please enter valid Indonesian phone number" required/>
                            </div>
                            <div><input type="text" id="firstName" placeholder="First Name" className="input" required/>
                            </div>
                            <div><input type="text" id="lastName" placeholder="Last Name" className="input" required/>
                            </div>
                            <div className="labelDob"><label>Date of Birth</label></div>
                            <div className="dob"><input type="date" id="dateOfBirth" name="birthday"/></div>
                            <div className="labelGender">
                                <input type="radio" name="male"
                                       value="male"
                                       onChange={() => this.onClickMale("male")}
                                       checked={this.state.checkMale}
                                />&nbsp;&nbsp;Male
                                <input type="radio" name="female" className="radioFemale"
                                       value="female"
                                       onChange={() => this.onClickFemale("female")}
                                       checked={this.state.checkFemale}
                                />&nbsp;&nbsp;Female
                            </div>
                            <div><input type="email" id="email" placeholder="Email" className="input" required/></div>
                            <div>
                                <button className="register-button" onClick={this.onClickRegister}>Register</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div className="footerContainer">
                    <div hidden={this.state.hiddenFooter} className="footer">Footer</div>
                    <div hidden={this.state.hiddenLogin} className="footerLogin" onClick={this.onClickLogin}>Login</div>
                </div>
            </div>
        );
    }

}

export default Registration;
