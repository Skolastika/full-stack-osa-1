import React from 'react'
import ReactDOM from 'react-dom'


const Anecdote = ({anecdote, votes}) => {
  return (
    <p>{anecdote} <br/>
      has {votes} votes
    </p>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
    )
}

const MostVotes = ({anecdote, votes}) => {
  return (
    <div>
      <h2>Anecdote with most votes:</h2>
      <Anecdote anecdote={anecdote} votes={votes} />
    </div>
    )
}

class App extends React.Component {
  constructor(props) {
    super(props)

    const tempVotes = []
    var i
    for (i=0; i<props.anecdotes.length; i++) {
      tempVotes[i] = 0
    }

    const a = Math.floor(Math.random() * Math.floor(anecdotes.length))

    this.state = {
      selected: a,
      votes: tempVotes,
      mostVoted: 0
    }
  }

  chooseAnecdote = () => {
    const a = Math.floor(Math.random() * Math.floor(anecdotes.length))
    this.setState({selected: a})
  }

  setMostVoted = () => {
    const sortedVotes = [...this.state.votes]
    sortedVotes.sort((a,b) => {return b-a})
    const a = this.state.votes.findIndex(a => a === sortedVotes[0])
    this.setState({mostVoted: a})
  }

  vote = () => {
    const a = [...this.state.votes]
    a[this.state.selected] += 1
    this.setState({votes: a}, () => {this.setMostVoted()})
  }

  render() {
    return (
      <div>
        <Anecdote anecdote={this.props.anecdotes[this.state.selected]} votes={this.state.votes[this.state.selected]} />
        <Button handleClick={this.chooseAnecdote} text='Next anecdote' />
        <Button handleClick={this.vote} text='Vote' />
        <MostVotes anecdote={this.props.anecdotes[this.state.mostVoted]} votes={this.state.votes[this.state.mostVoted]} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)