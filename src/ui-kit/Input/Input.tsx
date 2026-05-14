import React from 'react';
import { Input, type InputProps } from 'antd';


const TodoInput: React.FC<InputProps> = (props) => {
  return <Input {...props} />;
};

export default TodoInput;