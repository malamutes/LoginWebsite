import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
        let result = await fetch("http://localhost:5000/CreateUser", {
            method: "post",
            body: JSON.stringify({ username, password }),
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
    };

    useEffect(() => {
        if (isSuccessful) {
            navigate("/UserScreen"); // Navigate when successful
        }
    }, [isSuccessful, navigate]);

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='CreateUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control value={username} onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)
                }
                    type='text' placeholder='Create username' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='CreatePassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control value={password} onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)
                }
                    type='password' placeholder='Create password' />
            </Form.Group>

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


            <Button type="submit" variant='primary'>
                Create!
            </Button>

        </Form >
    )
};

export default CreateUser
