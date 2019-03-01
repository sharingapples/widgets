// @flow
import React, { Component } from 'react';
import createInput from './createInput';

export const { Provider, Consumer } = React.createContext();

type Props = {
  onSubmit: () => boolean,
  onChange: (string) => any,
};

class Group extends Component <Props> {
  nodes = [];

  update(name, text) {
    const { onChange, value } = this.props;
    const updatedValue = {
      ...value,
      [name]: text,
    };
    onChange(updatedValue);
  }

  register(name, node) {
    if (node === null) {
      this.nodes = this.nodes.filter(n => n.name === name);
    } else {
      this.nodes = this.nodes.concat({ name, node });
    }
  }

  get(name) {
    const { value } = this.props;
    return value && value[name];
  }

  validate(value) {
    const {
      validator, state,
    } = this.props;

    this.nodes.forEach((iNode) => {
      const { node, name } = iNode;
      node.validate(value && value[name]);
    });

    const validationValue = value;
    if (validator) {
      if (Array.isArray(validator)) {
        validator.forEach(v => v(validationValue, state));
      } else {
        validator(validationValue, state);
      }
    }
  }

  render() {
    const {
      value, onSubmit, onChange, ...other
    } = this.props;

    return (
      <Provider value={{ owner: this, state: value }} {...other} />
    );
  }
}

const createProps = (owner, { value }) => ({
  onChange: v => owner.update(v),
  value: value || {},
});

export default createInput(createProps)(Group);
