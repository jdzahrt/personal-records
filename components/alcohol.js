import React from 'react';
import styles from '../styles/Home.module.css'

const defaultDate = new Date().toISOString().substr(0, 10);

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
        this.setState({quitDate: event.target.valueAsDate});
    }

    handleSubmit(event) {
        fetch('/api/alcohol-tracker/add',
            {
                method: 'POST',
                headers: {
                    'Accept': 'applicaiton/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quitDate: this.state.quitDate
                })
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(response => console.log('Success', response))

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className={styles.card}>
                    <label>
                        Quit Date:
                        <input type="date" defaultValue={defaultDate} onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <input type="submit" value="Save"/>
                </div>
            </form>
        );
    }
}

export default AlcoholForm