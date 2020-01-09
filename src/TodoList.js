import React, { Component } from 'react'
import styled from 'styled-components'
import Todo from './Todo'
import TodoListForm from './TodoListForm'
import uuid from 'uuid'

const ListContainer = styled.div`
  padding: 2rem;
  text-align: left;
  outline-style: none;
  z-index: -1;
`

const ListTitle = styled.h3``

const ListBox = styled.div`
  display: block;
  user-select: none;
`

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [...JSON.parse(localStorage.getItem('todos'))]
    }
    this.addTodo = this.addTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
    this.updateTodo = this.updateTodo.bind(this)
  }

  addTodo(todo) {
    const newTodos = [...this.state.todos, todo]
    localStorage.setItem('todos', JSON.stringify(newTodos))
    this.setState({ todos: newTodos })
  }

  removeTodo(id) {
    const newTodos = this.state.todos.filter(todo => todo.id !== id)
    localStorage.setItem('todos', JSON.stringify(newTodos))
    this.setState({ todos: newTodos })
  }

  updateTodo(newTodo) {
    const index = this.state.todos.map(todo => todo.id).indexOf(newTodo.id)

    if (index >= 0) {
      let updatedTodos = [...this.state.todos]
      updatedTodos[index] = { ...newTodo }
      localStorage.setItem('todos', JSON.stringify(updatedTodos))
      this.setState({ todos: updatedTodos })
    } else {
      console.log('Could not update todo - not found in todo list')
    }
  }

  render() {
    return (
      <ListContainer>
        <ListTitle>Todo List</ListTitle>
        <ListBox>
          <TodoListForm addTodo={this.addTodo} />
          {this.state.todos.map(todo => {
            return (
              <Todo
                key={todo.id}
                id={todo.id}
                text={todo.text}
                deleteTodo={this.removeTodo}
                updateTodo={this.updateTodo}
              />
            )
          })}
        </ListBox>
      </ListContainer>
    )
  }
}

export default TodoList
