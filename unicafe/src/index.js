import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Palaute = () => {
    return (
        <div>
            <h1>Anna palautetta</h1>
        </div>
    )
}

const Statistic = ({text, arvo}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{arvo}</td>
        </tr>
    )
}

const Statistics = ({hyva, neutraali, huono}) => {

    const summa = hyva + neutraali + huono

    const laskeKeskiarvo = () => {
        return (hyva - huono) / summa
    }

    const laskePositiiviset = () => {
        return hyva / summa * 100
    }

    if (summa===0)
        return (
            <div>
                <h1>Statistiikka</h1>
                <p>Ei yhtään palautetta annettu</p>
            </div>
        )

    return (
        <div>
            <h1>Statistiikka</h1>
            <table>
                <tbody>
                    <Statistic text="Hyvä" arvo={hyva} />
                    <Statistic text="Neutraali" arvo={neutraali} />
                    <Statistic text="Huono" arvo={huono} />
                    <Statistic text="Keskiarvo" arvo={laskeKeskiarvo().toFixed(1)} />
                    <Statistic text="Positiivisia" arvo={laskePositiiviset().toFixed(1)} />
                </tbody>
            </table>
        </div>
    )
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    paivitaArvo = (muutettava, arvo) => {
        const apu = {}
        apu[muutettava] = arvo
        return () => {
            this.setState(apu)
        }
    }

    render() {
        return (
            <div>
                <Palaute />
                <Button handleClick={this.paivitaArvo('hyva', this.state.hyva + 1)} text="Hyvä" />
                <Button handleClick={this.paivitaArvo('neutraali', this.state.neutraali + 1)} text="Neutraali" />
                <Button handleClick={this.paivitaArvo('huono', this.state.huono + 1)} text="Huono" />
                <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
