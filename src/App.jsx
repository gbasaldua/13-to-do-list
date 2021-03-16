import React, { useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import allColors from './styles/colors'
import FormTask from './components/FormTask'
import Task from './components/Task'
import { generate as id } from 'shortid'

const GlobalStyle = createGlobalStyle`
	body{
		font-family: sans-serif;
		background-color: #222;
		color: ${allColors.mainColor};
		text-align: center;
		margin: 0;
	}
`


const App = () => {

	const [colorSelected, setColorSelected] = useState(allColors.colors[0])
	const [tasks, setTasks] = useState([])
	// const [tasks, setTasks] = useState([{
	// 	title: 'Aprendiendo React',
	// 	color: allColors.colors[1],
	// 	done: false
	// }])

	const handleSubmit = (e) => {
		e.preventDefault()
		if (e.target.title.value.trim() !== '') {
			createNewTask(e.target.title.value)
			e.target.title.value = ''
		}
	}

	const createNewTask = (title) => {
		const newTask = {
			id: id(),
			title,
			color: colorSelected,
			done: false
		}

		const allTasks = [...tasks, newTask]
		setTasks(allTasks)
	}

	const handleCompleteTask = (id) => {
		const currentTasks = [...tasks]
		const task = currentTasks.find(task => task.id === id)
		const index = currentTasks.indexOf(task)

		currentTasks[index].done = !currentTasks[index].done
		setTasks(currentTasks)
	}

	const handleDeleteTask = (id) => {
		let currentTasks = [...tasks]
		currentTasks = currentTasks.filter(task => task.id !== id)

		setTasks(currentTasks)
	}

	const handleChangeColor = (color) => {
		setColorSelected(color)
	}


	return (
		<>
			<GlobalStyle />
			<h1>To do list</h1>
			<FormTask
				handleChangeColor={handleChangeColor}
				handleSubmit={handleSubmit}
				colorSelected={colorSelected}
			/>
			{
				tasks.map(task => (
					<Task
						key={id()}
						done={task.done}
						title={task.title}
						color={task.color}
						handleCompleteTask={() => handleCompleteTask(task.id)}
						handleDeleteTask={() => handleDeleteTask(task.id)}
					/>
				))
			}
			{tasks.length === 0 && <p>Not tasks yet</p>}
		</>

	)
}

export default App;
