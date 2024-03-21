import React from 'react';

function TodoItem({ value, change, placeholder, blur, name }) {

    return (
        <input
            type="text"
            name={name}
            value={value}
            onChange={change}
            placeholder={placeholder}
            onBlur={blur}
        />
    )
}

export default TodoItem;