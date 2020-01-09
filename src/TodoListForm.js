import React, { Component } from 'react'
import styled from 'styled-components'
import uuid from 'uuid'

const TodoItem = styled.form`
  display: list-item;
  list-style: none;
  opacity: 60%;

  &:hover {
    opacity: 100%;
  }

  &:focus-within {
    opacity: 100%;
  }
`

const Button = styled.button`
  color: green;
`

const TodoText = styled.input`
  display: inline-block;
  padding: 0.5rem;
  border: none;

  &:focus {
    outline: none;
  }
`

class TodoListForm extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }
    this.addTodo = this.addTodo.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  addTodo(e) {
    e.preventDefault()
    this.props.addTodo({ ...this.state, id: uuid() })
    this.setState({ text: '' })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <TodoItem>
        <Button onClick={this.addTodo}>+</Button>
        <TodoText
          value={this.state.text}
          name='text'
          onChange={this.handleChange}
          placeholder='Create a todo'
        />
      </TodoItem>
    )
  }
}

export default TodoListForm
