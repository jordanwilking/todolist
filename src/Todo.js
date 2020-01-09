import React, { Component } from 'react'
import styled from 'styled-components'

const TodoItem = styled.div`
  display: list-item;
  list-style: none;
`

const TodoText = styled.div`
  display: inline-block;
  padding: 0.5rem;
`

const Button = styled.button`
  color: red;
`

class Todo extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.deleteTodo(this.props.id)
  }

  render() {
    return (
      <TodoItem>
        <Button onClick={this.handleClick}>x</Button>
        <TodoText>{this.props.text}</TodoText>
      </TodoItem>
    )
  }
}

export default Todo
