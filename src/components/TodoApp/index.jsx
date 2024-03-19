import React, { useState } from 'react';
import plus from '../icon/plus.png';
import edit from '../icon/edit.png';
import del from '../icon/del.png';
import checked from '../icon/checked.png';
import unchecked from '../icon/unchecked.png';

function TodoApp() {
    const placeholder = ['Name', 'Description...'];
    const headers = ['ID', 'Name', 'Description', 'Checked', 'Action'];
    const [tasks, setTasks] = useState([]);
    const [inputValues, setInputValues] = useState({
        name: '',
        description: '',
    });
    const [editIndex, setEditIndex] = useState(null);
    const [currentTab, setCurrentTab] = useState('todo');
    const [taskCreationError, setTaskCreationError] = useState({
        name: '',
        description: '',
    });

    //call when click add new & save item button
    const handleAddTask = () => {
        setTasks([...tasks, { name: inputValues.name, description: inputValues.description }]);
        setInputValues({
            name: '',
            description: '',
        });

    };

    //call when click delete icon
    const handleDeleteTask = (index) => {
        const newTodos = [...tasks];
        newTodos.splice(index, 1);
        setTasks(newTodos);
    };


    const handleEditTask = (index) => {
        setEditIndex(index); // Bắt đầu chỉnh sửa
        setInputValues({
            name: tasks[index].name,
            description: tasks[index].description,
        });
    };

    //call when click check icon toggoleTabStatus
    const handleCheckTask = (index) => {
        const newTasks = [...tasks];
        newTasks[index].checked = !newTasks[index].checked;
        setTasks(newTasks);
    };

    //call when click tode or done button
    const handleTabChange = (currentTab) => {
        //update status currentTab
        setCurrentTab(currentTab);
    };

    // check status of currentTab
    const filteredTasks = tasks.filter(todo => currentTab === 'todo' ? !todo.checked : todo.checked);


    const handleInputChange = (e) => {
        const valueInput = e.target.value;
        const field = e.target.name
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        });

        if (valueInput.trim() === '') {
            setTaskCreationError(preErrMsg => ({ ...preErrMsg, [field]: 'This field cannot be empty' }));
        } else {
            setTaskCreationError(preErrMsg => ({ ...preErrMsg, [field]: '' }));
        }
    };

    const handleSaveEdit = (index) => {
        const updatedTodos = [...tasks];
        updatedTodos[index] = {
            name: inputValues.name,
            description: inputValues.description,
        };
        setTasks(updatedTodos);
        setEditIndex(-1);
    };

    const handleEdit = (index) => {
        handleSaveEdit(index);
    };

    const handleCancelEdit = () => {
        setEditIndex(-1);
    };

    return (
        <div className='container'>
            <h3 className='todo-title'>Todo App</h3>
            <div className="todo-add">
                <div className="todo-input">
                    <div>
                        {taskCreationError.name && <span style={{ color: 'red' }}>{taskCreationError.name}</span>}
                        <input
                            type="text"
                            value={inputValues.name}
                            placeholder={placeholder[0]}
                            name='name'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        {taskCreationError.description && <span style={{ color: 'red' }}>{taskCreationError.description}</span>}
                        <input
                            type="text"
                            value={inputValues.description}
                            name='description'
                            onChange={handleInputChange}
                            placeholder={placeholder[1]}
                        />
                    </div>
                </div>
                <button onClick={handleAddTask}>
                    <img src={plus} alt="" />Add new item
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

                {filteredTasks.map((task, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>
                            {editIndex === index ? (
                                <input
                                    type="text"
                                    value={task.name}
                                    onChange={(e) => handleInputChange(e, 'name')}
                                    onBlur={() => handleEdit(index)}
                                />
                            ) : (
                                task.name
                            )}

                        </td>
                        <td>
                            {editIndex === index ? (
                                <input
                                    type="text"
                                    value={task.description}
                                    onChange={(e) => handleInputChange(e, 'description')}
                                    onBlur={() => handleEdit(index)}
                                />
                            ) : (
                                task.description
                            )}
                        </td>
                        <td>
                            <button className='todo-check' onClick={() => handleCheckTask(index)}>
                                {task.checked ? (
                                    <img src={unchecked} alt="Unchecked" />
                                ) : (
                                    <img src={checked} alt="Checked" />
                                )}
                            </button>
                        </td>
                        <td>
                            {editIndex === index ? (
                                <div>
                                    <button onClick={() => handleSaveEdit(index)}>Save</button>
                                    <button onClick={() => handleCancelEdit()}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <button className='todo-icon-edit' onClick={() => handleEditTask(index)}><img src={edit} alt="" /></button>
                                    <button className='todo-icon-del' onClick={() => handleDeleteTask(index)}><img src={del} alt="" /></button>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
            </table>

        </div>
    );
}

export default TodoApp;
