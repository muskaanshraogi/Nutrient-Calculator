import React, { Component } from 'react'
import { Row,
        Col,
        Form,
        Button,
        Spinner } from 'react-bootstrap';
import Axios from 'axios'
import Result from './result.component'
import './../styles/main-style.css'

class MainPage extends Component {
    state = {
        name: null,
        recipe: null,
        serving: 1,
        response: null,
        error: null,
        wait: false
    }

    handleSelect = (e) => {
        this.setState({
            serving: e.target.value
        })
    }

    handleChange = (e) => {
        this.setState({
            error: false,
            [e.target.id]: e.target.value
        })
    }

   
    handleSubmit = (e) => {

        e.preventDefault();
        this.setState({
            wait: true
        })

        Axios.get('http://localhost:3001/search?name=' + encodeURIComponent(this.state.name) + '&recipe=' + encodeURIComponent(this.state.recipe) + '&servings=' + this.state.serving)
        .then((response) => {
            this.setState({
                response: response.data,
                wait: false
            })
            console.log(response)
        })
        .catch((error) => {
            this.setState({
                error : error.response.status,
                wait: false
            })
        })
    }

    handleReset = (e) => {
        this.setState({
            name: null,
            recipe: null,
            serving: 1,
            response: null
        })
    }


    render() {
        return (
            <div className='main-page'>
                <Row className='row'>
                    <Col sm={4} className='form align-self-center'>
                        <div className='form-page p-5'>
                            <h4 className='text-primary font-weight-bold d-flex justify-content-center text-uppercase'>Nutrient Calculator</h4>
                            <br/>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Recipe Name</Form.Label>
                                    <Form.Control placeholder='Enter recipe name' id='name' onChange={this.handleChange} required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Ingredients</Form.Label>
                                    <Form.Control as='textarea' placeholder='Enter the ingredients (quantity-unit-ingredient)' id='recipe' onChange={this.handleChange} required/>
                                </Form.Group> 
                                <Form.Group>
                                    <Form.Label>No. of servings</Form.Label>
                                        <Form.Control as="select" onChange={this.handleSelect}>
                                        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((number, idx) => (
                                                <option key={idx}>{number}</option>
                                        ))}
                                        </Form.Control>
                                </Form.Group>
                                <br/>
                                {this.state.wait === true ? 
                                (<Button variant="primary" disabled block>
                                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>Loading...</Button>) : (null) }
                                {this.state.response === null && this.state.wait !== true ? 
                                    (<Button type='submit' block>Analyze</Button>) : (null) }
                                {this.state.response !== null && this.state.wait !== true ?
                                    (<Button onClick={this.handleReset} block>Reset</Button>) : (null) }
                                <br/>
                                {this.state.error === 400 ? (<p className='bg-danger text-light'> Ingredient(s) not found or formatted incorrectly.</p>) : (null) }
                                {this.state.error === 500 ? (<p className='bg-danger text-light'> Internal server error.</p>) : (null) }

                            </Form>
                        </div>
                    </Col>
                    {this.state.response !== null ? (
                        <Col sm={3} className='form align-self-center form-page2 p-5'>
                            <Result response={this.state.response} name={this.state.name}/>
                        </Col>) : (null)}
                </Row>  
            </div>
        )
    }
}

export default MainPage;