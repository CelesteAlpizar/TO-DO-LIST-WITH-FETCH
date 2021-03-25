import React, { useEffect, useState } from "react";

export function ToDoList() {
	const [input, setInput] = useState("");
	const [task, setTask] = useState([]);
	const [counter, setCounter] = useState(1);

	useEffect(() => {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/CelesteAlpizar",
			{
				method: "GET",
				headers: {
					"Content-Type": "aplication/json"
				}
			}
		)
			.then(respond => {
				return respond.json();
			})
			.then(data => {
				setTask(task.concat(data));
			})
			.catch(error => console.log("error", error));
	}, []);

	function changesInList() {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/CelesteAlpizar",
			{
				method: "PUT",
				body: JSON.stringify(task),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	}

	const handleEnter = () => {
		if (input !== "") {
			let newArray = [
				...task,
				{
					label: input,
					done: false
				}
			];
			setTask(newArray);
			setInput("");
			setCounter(counter + 1);
			changesInList();
		}
	};

	// cuidado con el filter, para usar el filter con el estricto (!==) se debe pasar ()=>handleRemoveItem(i) porque si se usa e=>handleRemoveItem(e.target.id) este pasa usualmente un string por lo que no funciona.

	const handleRemoveItem = id => {
		let filterTasks = task.filter((tarea, tareaId) => id !== tareaId);
		setTask(filterTasks);
		setCounter(counter - 1);
		changesInList();
	};

	return (
		<div className="card text-center p-0">
			<div className="card-header">
				<h1>To Do:</h1>
			</div>
			<div className="card-body content">
				<input
					type="text"
					value={input}
					placeholder="Add a task"
					onChange={e => setInput(e.target.value)}
					onKeyPress={e => (e.key === "Enter" ? handleEnter() : "")}
				/>
				{task.map((valor, i) => (
					<h5 id={i} key={i} onClick={() => handleRemoveItem(i)}>
						{valor.label}
					</h5>
				))}
			</div>
			<div className="card-footer text-muted contador">{counter}</div>
		</div>
	);
}
