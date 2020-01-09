import React, { Component } from 'react'
import styled from 'styled-components'
import Todo from './Todo'
import TodoListForm from './TodoListForm'
import uuid from 'uuid'

const ListContainer = styled.div`
  padding: 2rem;
  text-align: left;
`

const ListTitle = styled.h3``

const ListBox = styled.div`
  display: block;
`

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [
        { id: uuid(), text: 'workout' },
        { id: uuid(), text: 'dishes' },
        { id: uuid(), text: 'feed dog' },
        { id: uuid(), text: 'practice programming' }
      ]
    }
    this.addTodo = this.addTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
  }

  addTodo(todo) {
    this.setState(state => ({ todos: [...state.todos, todo] }))
  }

  removeTodo(id) {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id)
    }))
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
              />
            )
          })}
        </ListBox>
      </ListContainer>
    )
  }
}

export default TodoList
