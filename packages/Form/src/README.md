Hook based form

## Installation
> `$ yarn add @sharingapples/form`

## Usage
```jsx
import {
  Form, Group, Array, useFormInput, useFormSubmit, useFormValue, useFormValidator,
} from '@sharingapples/form';

function required(v) { if (v.length === 0) throw new Error('Value is required'); };
function pipe(...validators) {
  return (value) => {
    validators.reduce((res, valitaor) => validator(value), true);
  }
}

function TextInput({ name, label, validators }) {
  const [value, onChange] = useFormInput(name);
  const error = useFormValidator(name, pipe(...validators));
  function handleChange = useCallback((e) => {
    onChange(e.target.value);
  }, []);


  return (
    <div>
      <label>{label}</label>
      <input type="text" value={value} onChange={handleChange} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

function Submit({ label }) {
  const submit = useFormSubmit();
  return <button onClick={submit}>{label}</button>
}

export default function CustomForm() {
  function handleSubmit(state) {
    // Perform your api invokation here for data structure
    // state = { personal: { name: '', dob: '' }, job: { company: '' }}
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Group name="personal">
        <TextInput name="name" />
        <TextInput dob="dob" />
      </Group>
      <Group name="job">
        <TextInput name="company" />
      </Group>
      <Submit />
    </Form>
  );
}
```

## API
### Form
A top level component that keep tracks of the entire form data.

#### Props
* **onSubmit**: A required callback handler for processing submitted data
* **defaultValue**: A default value to prepopulate the form

### Group
A component that keep tracks of an object data structure. Can also act as a
page within a form with its own `onSubmit` handling

#### Props
* **name**: Name for the data structure
* **onSubmit**: If a submit button is included within the Group, the changes
  to the data within the group are not reflected back until
  the `submit` with proper validation. The `onSubmit` method
  is invoked after the data has been validated successfully.

### ArrayGroup
Not documented yet

### useFormInput
A hook to declare a form input that is connected with the
data structure. This hooks works similar to `useState` hook,
where the state is maintained by the closest `Group` or
`Form` element.
#### Parameters
* **name**: Name within the current data structure to bind to
* **defaultValue**: A default value to use, if none found
  within the data structure.

### useFormValue
A hook to extract a named value within the data-structure.

#### parameters
* **name**: Name within the current data structure to bind to
* **context**: Used in conjuction with `useFormParent` to
  move through the data structure hierarchy.

### useFormValidator
A hook for validating data as it changes.

#### Parameters
* **name**: A string that would listen to the named value
  within the current data structure or a mapping function
  that returns the validation value.
* **validator**: A function that throws an error checking
  the validation value, or a string that acts as an error
  message for a falsy validation value.

### useFormSubmit
A hook for getting a `submit` method to be called from
Submit buttons.

