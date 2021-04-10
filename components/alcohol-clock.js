import React from 'react';
import moment from 'moment';

class AlcoholClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleString(),
            quitDate: props.quitDate,
            daysQuit: 0
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        const date = new Date(this.state.quitDate)
        const currentDate = new Date()
        const timeDiff = currentDate.getTime() - date.getTime()
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        const daysDiffRounded = Math.round(daysDiff * 100) / 100

        this.setState({
            time: new Date().toLocaleString(),
            daysQuit: daysDiffRounded
        });
    }

    render() {
        return (
            <p className="Alcohol-clock">
                Quit on: {moment(this.state.quitDate).format('MM-DD-YYYY')}. {this.state.daysQuit} Days Alcohol FREE! 🍻
            </p>
        );
    }
}

export default AlcoholClock;