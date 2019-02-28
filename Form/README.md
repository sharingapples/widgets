

# **R-Form**

r-form is a library that manages the state for the components of React and React-Native, and all the changes that occur within those components.

## **Motivation**

While working with React or React-Native we face the difficulty of state management of a input component say in React it is difficult to manage the state of a form in the DOM element. So in a situation of onsubmit we need to call all the values from within the form. So in that case we need to either call the refs one by one or access through the state of that component.


**Problems ??**

-refs : it becomes tedious to call the component one by one

-state : the state management is itself a complicated task

**Solution**

r-form provides the state management for any kind of complexity in an input component be it rather a normal input component or the input component containing group or array of input component. The whole state/ value of the component created is stored as an object within the input component and it is there where the form value are stored and can be retrived with ease.

Example, say if we have form with component such a name , address, email . Name can be easily accessed as form.state.name and Address can be accessed as form.state.address.


## **Installation**

To install using npm

```node
npm i r-form
```

using yarn
```node
yarn add r-form
```

## **Components**


The components that provided by r-form library are :

* ### Form :

   This is the main component for the form library. This is the wrapper for all the component, whose state is to be managed. We use this component as the wrapper by passing the childrens to it for the render of the component.

* ### createInput :
  This is a function that wraps the DOM element as an element for the form. Wrapping a normal input component with this function makes is a part of the form.

* ###  Array :

  This is a special component where, the wrapped component is replicated/cloned as per requirement.

  Example, array of input component for email as there can be multiple email for one person.
* ###  Group :

  This is another special component which is a association of closely related data. Example, name can consist of 3 parts  first name , middle name and last name. This can be grouped as one namely can be called name. Three input component can be grouped under a name.

* ###  Select :

  This is a dynamic component and any component wrapped inside it is rendered according to the select function passed thorught it as props. The select prop function can be made dependent on the state of the form itself.
* ### Others :

  We can use the combination of array within a group and also multiple copies of a group. And other feature can be the validation for a group , array or an individual input component.

### - **Form**

The main wrapper for the form component itself. We pass the children to be rendered within the form. So we call a component that wraps its children components within and then passes it to the form component provided by the library.

**Example :**


Firstly we create a simple DomForm Component or in simple terms a container Component that will pass the children components to the form component.

This is the DomForm (or you can name it any element for now) which wraps our entire form into our library.
```javascript
import React from 'react';
import Form from 'r-form';

// create a reference to call the form events
const formRef = React.createRef();

const DomForm = props => (
  <form
    onSubmit={(e) => {
    e.preventDefault();
    // calls the internal form submit , which in return calls
    // the funtion onSubmit passed to Form as props as in below
    formRef.current.submit();
    }}
  >
    <Form
      ref={formRef}
      onSubmit={(state) => {
        // returns the state of the form
        }
      }
      {...props}
      // pass the props which contains children and other props
    />
  </form>
)

export default DomForm;
```

This is the part where we call the form container that we created above named DomForm. Now the input components can be plain components such as below or a self made components as well which we will discuss later.


```javascript
import React from 'react';
import DomForm from './DomFrom';

const FormApp = () => (
  <DomForm>
    <input type="text" name="name" />
  </DomForm>
);

export default FormApp;
```


**NOTE :**


  Input Component used inside the form must have :


  - name : the data are managed as an object so to set and get the data a name is required

  **Optional :**
  - validators: user can pass a validator function or array of validator function for particular field , such as if the value is required or not or if it has to be numeric and so on.
  - onChange: user can pass an onChange event.
  - onError: call to a function that is called if validation is failed.



### - **createInput**
This is a function provided by the form library to create an input component for application. To call this function we can either call by Form.createInput or call createInput itself. There is a pattern similar to mapStateToProps which is function currying  we need to pass a function that calls the update function which in return updates the value of an input in each onChange event and another parameter will be the component itself. Depending on the type of input the updatedValue can differ, for a simple text input we just pass the new value but for complex input such as checkbox or such we need to change a few steps before updating the value.

**Example :**



A simple text input :

```javascript
import React from 'react';
import { createInput } from 'r-form';

const createProps = (owner, { value }) => ({
  onChange: e => owner.update(e.target.value),
  value: value || '',
});

const TextInput = createInput(createProps)('input');

export default TextInput;
  ```

**createInput** is a *currying* function,  the first function takes the function parameter that calls on update function when Change is triggered (i.e. on every user change event). the second one takes the input component itself. The value for the update can be altered according to the component as well. Which is in example below



### - **Group**

A group component is as the name suggests a grouping component for similar kind of relative component. The group component for say maybe NAME which contains , firstName , middleName and then lastName or for ADDRESS . These components are related to name and are part of the name they can be grouped together which simplifies the data access , now we can simply call name.firstName to get the first name.

**Example :**


```javascript
import React from 'react';
import { Group } from 'r-form';
import TextInput from './TextInput';

const GroupForm = () => (
  <Group name="name">
    <TextInput name="firstName" />
    <TextInput name="middleName" />
    <TextInput name="middleName" />
  </Group>
);

export default GroupForm;
```

### - **Array**
An array component is the collection of the components wrapped within itself.  Say emails as people can have more than one EMAIL or even  PHONE-NUMBER. The render method for this is different than the other components used so far, for array “Function as Child” pattern is used. So there are parameters that come along with the render method. They are :

 - value : the whole state/ value of the particular array component.
 - insert : to add  the component in the dom,   an extra parameter can be added at function call a boolean value to determine whether to add the next component after the current one.
 - remove : to remove the particular component.

 **Example :**

```javascript

import React from 'react';
import { Array } from 'r-form';
import TextInput from './TextInput';

const ArrayForm = () => (
  <Array name="email">
    {({
      value, insert, remove,
    }) => (
    <div>
      <TextInput />
      <button type=""button onClick={() => insert()}> + </button>
      { value && value.length > 0 <button type="button" onClick={() => remove()}> - </button>}
    </div>
    )}
  </Array>
);

export default ArrayForm;

```

### - **Select**
This component is the dynamic component that is dependent  on the form state and a select props that is a function which tells when to display this particular component. <br>


**Example :**

```javascript

import React from 'react';
import { Select } from 'r-form';
import ArrayForm from './ArrayForm'; // from above component that we made

const SelectForm = () =>(
  <Select select={state => state.name.length > 0 }>
    <ArrayForm />
  </Select>
);

export default SelectForm;

```

Props :
 - select ( required ) : is a function , which returns a boolean value that is dependent on the state of the form , such as in example if the name has more than 1 word this particular component is then rendered

### - **Validation Functions**

These are the optional props to be passed to the form components for Array , Group or even simple input. This function takes two parameters and one the value needed to be validated and other being the state of whole form. Let's make a validation function for required condition where ta particular field is required.


**Example :**


The required validation function :

```javascript

export default function(value ,state) {
  const v = String(value).trim();

  if (v.length === 0 || v === 'undefined') {
    throw Err; // If validation fails
  }

  return v; // return the value as it is
}

```

It's use case , firstly we pass it as a simple function :

```javascript
<TextInput name="name" validator={required} />
```
or we can pass it as function :
```javascript
<TextInput name="name" validator={[required]} />
```

### - **Combining Components**
We can also combine Group, Array and Select component .

**Example :**



Group within an Array component :

```javascript
import React from 'react';
import { Group, Array } from 'r-form';
import TextInput from './TextInput';

const GroupWithinArray = () => (
  <Array name="children">
    {({
    value, insert, remove,
    }) => (
    <Group >
      <TextInput name="name" />
      <TextInput name="age" />
      <button type=""button onClick={() => insert()}> + </button>
      { value && value.length > 0 <button type="button" onClick={() => remove()}> - </button>}
    </Group>
  )}
  </Array>
);

export default GroupWithinArray;
```



Array within a Group Component :


```javascript
import React from 'react';
import { Array, Group } from 'r-form';
import TextInput from './TextInput';

const ArrayWithinGroup = () => (
  <Group name="contact">
    <Array name="email">
      {({
      value, insert, remove,
      }) => (
      <div>
        <TextInput/>
        <button type=""button onClick={() => insert()}> + </button>
        { value && value.length > 0 <button type="button" onClick={() => remove()}> - </button>}
      </div>
      )}
    </Array>

    <Array name="phoneNumber">
      {({
      value, insert, remove,
      }) => (
      <div>
        <TextInput />
        <button type=""button onClick={() => insert()}> + </button>
        { value && value.length > 0 <button type="button" onClick={() => remove()}> - </button>}
      </div>
      )}
    </Array>
  </Group>
);
export default ArrayWithinGroup;
```

## **Usage**



Here is the rough sketch of the example that we will be making. It is a simple form that collects the data of an individual.



![dc_rough](https://user-images.githubusercontent.com/12614476/46061420-4dcf2680-c186-11e8-9c24-7cbb2675dede.png)



The library provides a mechanism for the state management of the form we need to implement and wrap it to the dom. So now we enlist the component that we will be using in making this form. <br>

### Form DOM components :

We create DOM element for the form. R-Form provides the bare skeleton for a form structure with no DOM element, we need to wrap the DOM element with the provided r-form library. We pass the on change event and update the value there on the basis of the component. In case of simple text input we simply pass it where as other complex component requires a bit more calculation such as checkbox is an array of the data under same name so in that case we concat the data and update it. Let's see how we will make the components.
