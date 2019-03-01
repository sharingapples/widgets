import Form from './Form';
import createInput from './createInput';
import Group from './Group';
import Array from './Array';
import Select from './Select';

Form.createInput = createInput;
Form.Group = Group;
Form.Array = Array;
Form.Select = Select;

export {
  createInput,
  Group,
  Array,
  Select,
};

export default Form;
