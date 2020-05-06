import React, { Component } from 'react'
import './../styles/main-style.css'
class Result extends Component {
    render() {
        return (
            <div>
                <h5 className='text-primary font-weight-bold d-flex justify-content-center text-uppercase'>1 serving of {this.props.name} contains</h5>
                <br/>
                <p className='font-weight-bold'>Energy  :  {this.props.response['energy']} kcal</p>
                <p className='font-weight-bold'>Carbohydrates  :  {this.props.response['carbohydrates']} g</p>
                <p className='font-weight-bold'>Protien  :  {this.props.response['protien']} g</p>
                <p className='font-weight-bold'>Sugar  :  {this.props.response['sugar']} g</p>
                <p className='font-weight-bold'>Calcium  :  {this.props.response['calcium']} mg</p>
                <p className='font-weight-bold'>Potassium  :  {this.props.response['potassium']} mg</p>
                <p className='font-weight-bold'>Cholestrol  :  {this.props.response['cholestrol']} mg</p>
                <p className='font-weight-bold'>Iron  :  {this.props.response['iron']} mg</p>
                <p className='font-weight-bold'>Water  :  {this.props.response['water']} g</p>
            </div>
        )
    }
}

export default Result