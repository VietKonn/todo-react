import React, { useState } from 'react';
import plus from '../icon/plus.png';
import edit from '../icon/edit.png';
import del from '../icon/del.png';
import checked from '../icon/checked.png';
import unchecked from '../icon/unchecked.png';

function TodoApp() {
    const placeholder = ['Name', 'Description...'];
    const headers = ['ID', 'Name', 'Description', 'Checked', 'Action'];
    const [todos, setTodos] = useState([]);
    const [nameInput, setNameInput] = useState('');
    const [desInput, setDesInput] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [currentTab, setCurrentTab] = useState('todo');


    //call when value Name input change
    const handleNameInputChange = (e) => {
        //update value Name input
        setNameInput(e.target.value);
    };

    //call when value Description input change
    const handleDescriptionInputChange = (e) => {
        //update value Description input
        setDesInput(e.target.value);
    };

    //call when click add new & save item button
    const handleAddTodo = () => {
        //if click add new button (editIndex == null)
        if (editIndex == null) {
            // get name = value nameInput, des = Description input
            setTodos([{ name: nameInput, des: desInput }]);
            // inputValue is emptied 
            setNameInput('');
            setDesInput('');
        }
        //if click save item button (editIndex !== null)
        else {
            // get value of item by index
            const newTodos = [...todos];
            newTodos[editIndex] = { name: nameInput, des: desInput };
            // update value of item by index
            setTodos(newTodos);
            setNameInput('');
            setDesInput('');
            setEditIndex(null);
        }
    };

    //call when click delete icon
    const handleDeleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    //call when click edit icon
    const handleEditTodo = (index) => {
        setNameInput(todos[index].name);
        setDesInput(todos[index].des);
        setEditIndex(index);
    };

    //call when click check icon
    const handleCheckTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].checked = !newTodos[index].checked;
        setTodos(newTodos);
    };

    //call when click tode or done button
    const handleTabChange = (currentTab) => {
        //update status currentTab
        setCurrentTab(currentTab);
    };

    // check status of currentTab
    const filteredTodos = todos.filter(todo => currentTab === 'todo' ? !todo.checked : todo.checked);


    // const srcCheck = todo.checked ? todo : done


    return (
        <div className='container'>
            <h3 className='todo-title'>Todo App</h3>
            <div className="todo-add">
                <div className="todo-input">
                    <input
                        type="text"
                        value={nameInput}
                        onChange={handleNameInputChange}
                        placeholder={placeholder[0]}
                    />
                    <input
                        type="text"
                        value={desInput}
                        onChange={handleDescriptionInputChange}
                        placeholder={placeholder[1]}
                    />
                </div>
                <button onClick={handleAddTodo}>
                    {/* if editIndex == null and !== null */}
                    <img src={plus} alt="" />{editIndex !== null ? 'Save item' : 'Add new item'}
                </button>
            </div>

            <div className='todo-tab'>
                <button
                    // click button add class active and remove another class action 
                    className={currentTab === 'todo' ? 'active' : ''}
                    onClick={() => handleTabChange('todo')}
                >
                    Todo
                </button>
                <button
                    // click button add class active and remove another class action 
                    className={currentTab === 'done' ? 'active' : ''}
                    onClick={() => handleTabChange('done')}
                >
                    Done
                </button>
            </div>

            <table className='todo-table'>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>

                {filteredTodos.map((todo, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{todo.name}</td>
                        <td>{todo.des}</td>
                        <td>
                            <button className='todo-check' onClick={() => handleCheckTodo(index)}>
                                {/* if status of todo is checked, show checked img  */}
                                {todo.checked ? (
                                    <img src={unchecked} alt="Unchecked" />
                                ) : (
                                    <img src={checked} alt="Checked" />
                                )}
                            </button>
                        </td>
                        <td>
                            <button className='todo-icon-edit' onClick={() => handleEditTodo(index)}><img src={edit} alt="" /></button>
                            <button className='todo-icon-del' onClick={() => handleDeleteTodo(index)}><img src={del} alt="" /></button>
                        </td>
                    </tr>
                ))}
            </table>

        </div>
    );
}

export default TodoApp;
