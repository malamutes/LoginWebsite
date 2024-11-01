import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CreateUser() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    //const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [countryList, setCountryList] = useState([]);
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState("");
    const [gender, setGender] = useState("");
    const [errorMessageUser, setErrorMessageUser] = useState("");
    const [errorMessagePass, setErrorMessagePass] = useState("");
    const [validUser, setValidUser] = useState(false);
    const [validPass, setValidPass] = useState(false);


    const validatePassword = (pw: string) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
        return regex.test(pw);
    }

    useEffect(() => {
        const getUserData = async () => {
            let result = await fetch("https://restcountries.com/v3.1/independent?status=true&fields=name", {
                method: "get"
            });
            const data = await result.json();
            const getAllCountryNames = data.map((country: { name: { common: string } }) => country.name.common)
            setCountryList(getAllCountryNames);

        };

        getUserData();
    }, [])


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (validPass && validUser) {
            let result = await fetch("https://loginwebsitebackendsingapore.onrender.com/CreateUser", {
                method: "post",
                body: JSON.stringify({ username, password, country, age, gender }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            result = await result.json();
            console.log(result, "HELLO");
            if (result) {
                console.log("Data saved succesfully");
                sessionStorage.setItem('currentuser', JSON.stringify({ currentusername: username }))
                setIsSuccessful(true);
                setUserName("");
                setPassword("");
            }
        }

    };

    useEffect(() => {
        if (isSuccessful) {
            navigate("/UserScreen"); // Navigate when successful
        }
    }, [isSuccessful, navigate]);

    //!!errormessage is such that in tsx, an empty string evalutes to false while a filled string evaluates to true

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup hasValidation>
                <Form.Group className='mb-3' controlId='CreateUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={username} onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            setUserName(event.target.value);
                            if ((event.target.value.length > 24 || event.target.value.length < 4)) {
                                setErrorMessageUser("Username has to be between 5 and 25 characters!");
                                setValidUser(false);
                            }
                            else {
                                setValidUser(true);
                                setErrorMessagePass("");

                            }
                        }
                    }
                        type='text' placeholder='Create username' required isInvalid={!validUser && !!errorMessageUser} isValid={validUser} />
                    <Form.Control.Feedback type="invalid">
                        {errorMessageUser}
                    </Form.Control.Feedback>

                    <Form.Control.Feedback type="valid">
                        Good username!
                    </Form.Control.Feedback>
                </Form.Group>

            </InputGroup>

            <InputGroup hasValidation>
                <Form.Group className='mb-3' controlId='CreatePassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(event.target.value);
                            if (!validatePassword(event.target.value)) {
                                setErrorMessagePass(`Password has to be between 8 and 20 characters, \ncontain at least ONE uppercase and ONE digit!`);
                                setValidPass(false);
                            }
                            else {
                                setValidPass(true);
                                setErrorMessagePass("");

                            }
                        }
                    }
                        type='password' placeholder='Create password' required isInvalid={!validPass && !!errorMessagePass} isValid={validPass} />
                    <Form.Control.Feedback type="invalid" style={{ maxWidth: '300px' }}>
                        {errorMessagePass}
                    </Form.Control.Feedback>

                    <Form.Control.Feedback type="valid">
                        Good password!
                    </Form.Control.Feedback>
                </Form.Group>


            </InputGroup>


            <FormGroup controlId='SelectCountry'>
                <Form.Label>Country</Form.Label>
                <Form.Select aria-label="Default select example" className='mb-3' onChange={
                    (event: React.ChangeEvent<HTMLSelectElement>) => setCountry(event.target.value)
                }>
                    <option>Select Residential Country</option>
                    {countryList.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                    ))}
                </Form.Select>
            </FormGroup>

            <FormGroup controlId='SelectAge'>
                <Form.Label>Age</Form.Label>
                <Form.Range min={0} max={150} value={age} id='AgeRangeSlider' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAge(Number(event.target.value))} />
                <Form.Label>{age}</Form.Label>
            </FormGroup>

            <InputGroup className="mb-3">
                <Form.Check
                    inline
                    label="Male"
                    name="Gender"
                    value='Male'
                    type='radio'
                    id={`inline-'radio'-1`}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setGender(event.target.value)}
                />
                <Form.Check
                    inline
                    label="Female"
                    name="Gender"
                    value='Female'
                    type='radio'
                    id={`inline-'radio'-2`}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setGender(event.target.value)}
                />
            </InputGroup>

            <Button type="submit" variant='primary' className='me-3'>
                Create!
            </Button>

            <Link to={"/"}>
                <Button >
                    BACK BUTTON!
                </Button>
            </Link>

        </Form >
    )
};

export default CreateUser
