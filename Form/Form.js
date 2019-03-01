import React, { Component } from 'react';
import { Provider } from './Group';

export const ROOT = Math.floor((Math.random() * 100) + 1);

type Props = {
  onChange?: () => {},
}

class Form extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = props.value || {};
    this.nodes = [];
  }

  update(name, text) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(name, text, this.state);
    }
    this.setState({
      [name]: text,
    });
  }

  register(name, node) {
    if (node === null) {
      this.nodes = this.nodes.filter(n => n.name !== name);
    } else {
      this.nodes = this.nodes.concat({ name, node });
    }
  }


  get(name) {
    return this.state[name];
  }

  submit() {
    const { onSubmit } = this.props;
    const formState = this.validate();
    onSubmit(formState);
  }

  validate() {
    const formState = {};
    this.nodes.forEach((iNode) => {
      const { name, node } = iNode;
      const v = node.validate(this.state[name]);
      if (name in this.state) {
        formState[name] = v;
      }
    });
    return formState;
  }

  render() {
    const {
      value, onSubmit, onChange, ...other
    } = this.props;
    return (
      <Provider value={{ owner: this, state: this.state }} {...other} />
    );
  }
}

export default Form;
