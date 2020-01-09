import React, { Component } from 'react'
import styled from 'styled-components'

const TodoItem = styled.div`
  display: list-item;
  list-style: none;
`

const TodoText = styled.div`
  display: inline-block;
  padding: 0.5rem;

  &.completed {
    text-decoration: line-through;
    font-style: italic;
    opacity: 60%;
  }

  &:hover {
    cursor: pointer;
  }
`

const TodoEditForm = styled.form`
  display: inline-block;
`

const TodoEditInput = styled.input`
  display: inline-block;
  padding: 0.5rem;
  border: none;

  &:focus {
    outline: none;
  }
`

const Button = styled.button`
  color: red;

  &:hover {
    cursor: pointer;
  }
`

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = { inEditMode: false, text: '', completed: false }
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this)
    this.handleToggleEdit = this.handleToggleEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.getCompleted = this.getCompleted.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleToggleCompleted = this.handleToggleCompleted.bind(this)
  }

  handleDeleteTodo() {
    this.props.deleteTodo(this.props.id)
  }

  handleToggleCompleted() {
    this.setState(state => ({ completed: !state.completed }))
  }

  handleToggleEdit() {
    this.setState(state => ({ inEditMode: !state.inEditMode }))
    this.clearForm()
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.updateTodo({ id: this.props.id, text: this.state.text })
    this.handleToggleEdit()
  }

  handleOnBlur(e) {
    if (this.state.text) {
      this.handleSubmit(e)
    } else {
      this.handleToggleEdit()
    }
  }

  handleKeyDown(e) {
    console.log(e.key)
    if (e.key === 'Escape') {
      this.handleToggleEdit()
    }
  }

  clearForm() {
    this.setState({ text: '' })
  }

  getCompleted() {
    return this.state.completed ? 'completed' : ''
  }

  render() {
    return (
      <TodoItem>
        <Button onClick={this.handleDeleteTodo}>x</Button>
        {!this.state.inEditMode && (
          <TodoText
            className={this.getCompleted()}
            onClick={this.handleToggleCompleted}
            onDoubleClick={this.handleToggleEdit}
          >
            {this.props.text}
          </TodoText>
        )}
        {this.state.inEditMode && (
          <TodoEditForm
            onSubmit={this.handleSubmit}
            onBlur={this.handleOnBlur}
            onKeyDown={this.handleKeyDown}
          >
            <TodoEditInput
              autoFocus
              value={this.state.text}
              name='text'
              onChange={this.handleChange}
              placeholder={this.props.text}
            />
          </TodoEditForm>
        )}
      </TodoItem>
    )
  }
}

export default Todo
