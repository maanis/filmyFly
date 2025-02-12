import React from 'react'

const Dropdown = ({ options, method }) => {
    return (
        <div className="select">
            <select defaultValue="0" id='format' name='format' onChange={(e) => method(e.target.value)}>
                <option value="0" disabled>Category</option>
                {options.map((e, i) => <option key={i} value={e} className='capitalize'>{e}</option>)}
            </select>
        </div>
    )
}

export default Dropdown