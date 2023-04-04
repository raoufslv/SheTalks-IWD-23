import { useState } from 'react';

function CheckBox({label}) {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="w-5 h-5 border border-gray-300 rounded-sm checked:bg-primary checked:border-transparent focus:outline-none"
        checked={isChecked}
        onChange={handleOnChange}
      />
      <label className="ml-2 text-gray-700 cursor-pointer select-none text-sm" htmlFor="checkbox" onClick={handleOnChange}>
        {label}
      </label>
    </div>
  );
}

export default CheckBox;