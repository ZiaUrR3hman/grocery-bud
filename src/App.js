import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
	const list = localStorage.getItem('list');
	if (list) {
		return JSON.parse(list);
	} else return [];
};
function App() {
	const [list, setList] = useState(getLocalStorage);
	const [name, setName] = useState('');
	const [alert, setAlert] = useState({
		display: false,
		message: '',
		type: '',
	});
	const [isEditing, setIsEditing] = useState(false);
	const [itemID, setItemID] = useState(null);

	/* useEffect(() => {
		const timer = setTimeout(
			() => setAlert({ ...alert, display: false }),
			3000
		);
		return () => {
			clearTimeout(timer);
		};
	}, [alert]); */

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name) {
			showAlert(true, 'Please enter value', 'error');
		} else if (isEditing && name) {
			setList(
				list.map((item) => {
					if (item.id === itemID) {
						return { ...item, title: name };
					}
					return item;
				})
			);
			setName('');
			setItemID(null);
			setIsEditing(false);
			showAlert(true, 'Item updated successfully', 'success');
		} else {
			setList([
				{
					id: new Date().getTime().toString(),
					title: name,
				},
				...list,
			]);
			setName('');
			showAlert(true, 'Item added successfully', 'success');
		}
	};

	const showAlert = (display = false, message = '', type = '') => {
		setAlert({
			display,
			message,
			type,
		});
	};

	const clearList = () => {
		showAlert(true, 'Item cleared successfully', 'success');
		setList([]);
	};

	const removeItem = (id) => {
		setList(list.filter((item) => item.id !== id));
	};

	const editItem = (id, name) => {
		setIsEditing(true);
		document.getElementById('groceryTitle').focus();
		setName(name);
		setItemID(id);
	};

	useEffect(() => {
		localStorage.setItem('list', JSON.stringify(list));
	}, [list]);

	return (
		<div className="container mx-auto max-w-6xl">
			<div className="flex flex-col items-center justify-center bg-white shadow-xl rounded-sm p-5 m-20 border border-gray-200 ">
				<h2 className="font-bold text-2xl text-gray-600 py-2">
					Grocery Bud
				</h2>
				<Alert {...alert} removeAlert={showAlert} list={list} />
				<div className="self-start w-full my-2">
					<form className="flex" onSubmit={handleSubmit}>
						<input
							id="groceryTitle"
							type="text"
							className="rounded-sm focus:outline-none focus:ring focus:ring-offset-2 focus:border-blue-500 hover:border-gray-300  mr-2  border border-gray-200 p-2 text-lg text-gray-600 w-full "
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<button
							type="submit"
							className="rounded-sm transition duration-100 ease-in-out w-40 active:bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-offset-2 bg-blue-500 px-5 py-2 font-semibold tracking-wider text-white text-lg"
						>
							{isEditing ? 'Update' : 'Add'}
						</button>
					</form>
					<List
						list={list}
						removeItem={removeItem}
						editItem={editItem}
					/>
				</div>
				<button
					onClick={clearList}
					className="rounded-sm transition duration-100 ease-in-out w-40 active:bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring  focus:ring-red-500 focus:ring-offset-2  px-5 py-2 font-semibold tracking-wider text-red-600 text-lg  border"
				>
					Clear list
				</button>
			</div>
		</div>
	);
}

export default App;
