import React, { Component } from 'react'
import styled from 'styled-components'

const TodoItem = styled.div`
  display: list-item;
  list-style: none;

  &.deleted {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 1s, opacity 1s linear;
  }
`

const TodoTask = styled.div`
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
    this.state = { inEditMode: false, task: '', completed: false }
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this)
    this.handleToggleEdit = this.handleToggleEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.getTodoTaskClasses = this.getTodoTaskClasses.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleToggleCompleted = this.handleToggleCompleted.bind(this)
    this.getTodoItemClass = this.getTodoItemClass.bind(this)
  }

  handleDeleteTodo() {
    this.handleToggleDeleted()
    setTimeout(() => this.props.deleteTodo(this.props.id), 2000)
  }

  handleToggleCompleted() {
    this.setState(state => ({ completed: !state.completed }))
  }

  handleToggleEdit() {
    this.setState(state => ({ inEditMode: !state.inEditMode }))
    this.clearForm()
  }

  handleToggleDeleted() {
    this.setState(state => ({ deleted: !state.deleted }))
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.updateTodo({ id: this.props.id, task: this.state.task })
    this.handleToggleEdit()
  }

  handleOnBlur(e) {
    if (this.state.task) {
      this.handleSubmit(e)
    } else {
      this.handleToggleEdit()
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.handleToggleEdit()
    }
  }

  clearForm() {
    this.setState({ task: '' })
  }

  getTodoTaskClasses() {
    return this.state.completed && 'completed'
  }

  getTodoItemClass() {
    return this.state.deleted && 'deleted'
  }

  render() {
    return (
      <TodoItem className={this.getTodoItemClass()}>
        <Button onClick={this.handleDeleteTodo}>x</Button>
        {this.state.inEditMode ? (
          <TodoEditForm
            onSubmit={this.handleSubmit}
            onBlur={this.handleOnBlur}
            onKeyDown={this.handleKeyDown}
          >
            <TodoEditInput
              autoFocus
              value={this.state.task}
              name='task'
              onChange={this.handleChange}
              placeholder={this.props.task}
            />
          </TodoEditForm>
        ) : (
          <TodoTask
            className={this.getTodoTaskClasses()}
            onClick={this.handleToggleCompleted}
            onDoubleClick={this.handleToggleEdit}
          >
            {this.props.task}
          </TodoTask>
        )}
      </TodoItem>
    )
  }
}

export default Todo
