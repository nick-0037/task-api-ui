import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import TaskList from './TaskList'

test('renders content', () => {
  const task = {
    description: 'This is a test',
    completed: false
  }

  const component = render(<TaskList tasks={task}/>)

  console.log(component)
})