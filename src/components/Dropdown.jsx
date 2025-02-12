import React from 'react'

const Dropdown = ({ options, method }) => {
    return (
        <div className="select">
            <select id='format' name='format' onChange={(e) => method(e.target.value)}>
                {options.map((e, i) => <option key={i} value={e} className='capitalize'>{e}</option>)}
            </select>
        </div>
    )
}

export default Dropdown