import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
	const [data, setData] = useState([]);
	const [inputValue, setInputValue] = useState({
		text: '',
		id: '',
	});
	const [clicked, setClicked] = useState(false);

	const ref = useRef(null);

	useEffect(() => {
		getData();
	}, [data]);

	const getData = () => {
		axios.get('http://localhost:4000/todo').then((res) => setData(res.data));
	};

	const handleAdd = () => {
		axios.post('http://localhost:4000/todo', { text: ref.current.value }).then(() => getData());
		ref.current.value = '';
	};

	const handleUpdate = (item) => {
		setClicked(true);
		setInputValue({ text: item.text, id: item._id });
	};

	const handleDelete = (item) => {
		axios.delete('http://localhost:4000/todo/' + item._id).then(() => getData());
	};

	const handlePut = () => {
		axios
			.put('http://localhost:4000/todo/' + inputValue.id, {
				text: inputValue.text,
				isCompleted: true,
			})
			.then(() => getData())
			.then(() => setClicked(false));
	};

	return (
		<div className="App">
			<h1>Todo list</h1>
			<form>
				<input ref={ref} required type="text" placeholder="Add new todo" />
				<button onClick={() => handleAdd()}>Add</button>
			</form>
			{data?.map((todo) => (
				<div className="container" key={todo._id}>
					<p>
						{todo.date?.slice(11, 19)} <span className="text">{todo?.text}</span>
					</p>
					{todo.isCompleted && <span className="completed">Completed</span>}
					<button className="update" onClick={() => handleUpdate(todo)}>
						Update
					</button>
					<button className="delete" onClick={() => handleDelete(todo)}>
						Delete
					</button>
				</div>
			))}
			{clicked ? (
				<div className="input-field">
					<input
						value={inputValue.text}
						onChange={(e) =>
							setInputValue((prevState) => {
								return {
									...prevState,
									text: e.target.value,
								};
							})
						}
						type={'text'}
						placeholder="Update ToDo"
					/>
					<button onClick={() => handlePut()} className="add">
						Update Todo
					</button>
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default App;
