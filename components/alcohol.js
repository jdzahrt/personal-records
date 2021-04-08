import React from 'react';
import styles from '../styles/Home.module.css'

class AlcoholForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quitDate: new Date(),
            daysFree: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log('event.target.quitDate', event.target.valueAsDate);
        this.setState({quitDate: event.target.valueAsDate});
    }

    handleSubmit(event) {
        const date = new Date(this.state.quitDate)
        const currentDate = new Date()
        const timeDiff = currentDate.getTime() - date.getTime()
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        const daysDiffRounded = Math.round(daysDiff * 100) / 100

        this.setState({daysFree: daysDiffRounded})
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className={styles.card}>
                    <label>
                        Quit Date:
                        <input type="date" onChange={this.handleChange}/>
                    </label>
                    <p >{this.state.daysFree} Days Alcohol FREE 🍻</p>
                    <br/>
                    <input type="submit" value="Save"/>
                </div>
            </form>
        );
    }
}

export default AlcoholForm