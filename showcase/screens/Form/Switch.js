import React from 'react';
import { Switch as RNSwitch } from 'react-native';
import { useFormInput } from '@sharingapples/form';

function Switch({ name, defaultValue }, ref) {
  const [value, onChange] = useFormInput(name, defaultValue);

  return (
    <RNSwitch ref={ref} value={value} onValueChange={onChange} />
  );
}

export default React.forwardRef(Switch);
