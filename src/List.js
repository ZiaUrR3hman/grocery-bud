import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({ list, removeItem, editItem }) => {
	return list.map((item) => {
		const { id, title } = item;
		return (
			<div
				className="flex justify-between py-2 hover:bg-gray-100 mt-2 rounded-sm bg-gray-50"
				key={id}
			>
				<div className="text-gray-600 px-2 py-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
					{title}
				</div>
				<div className="flex text-gray-500 px-1">
					<button
						onClick={() => {
							editItem(id, title);
						}}
						className="flex w-10 h-10 justify-center items-center hover:text-gray-600   focus:outline-none active:bg-gray-200 transition duration-100 ease-linear rounded-full "
					>
						<FaEdit className="w-5 h-5" />
					</button>
					<button
						onClick={() => removeItem(id)}
						className="flex w-10 h-10 justify-center items-center hover:text-gray-600  focus:outline-none active:bg-gray-200 transition duration-100 ease-linear rounded-full "
					>
						<FaTrash className="w-5 h-5" />
					</button>
				</div>
			</div>
		);
	});
};

export default List;
