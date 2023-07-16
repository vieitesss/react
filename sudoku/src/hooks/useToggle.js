import { useState, useEffect } from 'react';

const useToggle = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const toggleValue = () => {
        setValue(prev => !prev)
    }

    return [value, toggleValue]
}

export default useToggle;
