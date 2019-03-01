import React, { Component } from 'react';
import { Provider } from './Group';
import createInput from './createInput';

type Props = {
  onChange: (string) => any,
};

class ArrayComponent extends Component<Props> {
  constructor() {
    super();
    this.nodes = [];
  }

  update(name, text) {
    const { onChange, value, auto } = this.props;
    let updatedValue = value ? value.map((v, idx) => {
      if (name === idx) {
        return text;
      }
      return v;
    })
      : [text];

    if (value && (name === value.length)) {
      updatedValue = updatedValue.concat(text);
    }

    if (auto && !updatedValue.some(v => v === '' || v === {} || v === null || v === undefined)) {
      onChange(updatedValue.concat([null]));
    } else {
      onChange(updatedValue);
    }
  }

  get(idx) {
    const { value } = this.props;
    return value && value[idx];
  }

  register(name, node) {
    if (node === null) {
      this.nodes = this.nodes.filter(n => n.name === name);
    } else {
      this.nodes = this.nodes.concat({ name, node });
    }
  }

  insert(idx) {
    return (after = false) => {
      const { value, onChange, auto } = this.props;
      let updatedValue = after ? [
        ...value.slice(0, idx + 1),
        null,
        ...value.slice(idx + 1),
      ] : [
        ...value.slice(0, idx),
        null,
        ...value.slice(idx),
      ];
      if (value.length === 0) {
        updatedValue = auto && updatedValue.concat(null);
      }
      onChange(updatedValue);
    };
  }

  remove(idx) {
    return () => {
      const { value, onChange } = this.props;
      const updatedValue = [
        ...value.slice(0, idx),
        ...value.slice(idx + 1),
      ];
      onChange(updatedValue);
    };
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
    return value;
  }

  render() {
    const {
      auto, children, value, ...other
    } = this.props;

    const adjusted = auto && value.length === 0 ? [null] : value;

    return (adjusted.map((n, idx) => {
      const arrayOwner = {
        get: name => this.get(idx),
        update: (name, text) => this.update(idx, text),
        register: (name, node) => this.register(idx, node),
      };
      return (
        <Provider key={idx} value={{ owner: arrayOwner, state: value }} {...other}>
          {children({
            value, insert: this.insert(idx), remove: this.remove(idx),
          }) }
        </Provider>
      );
    })
    );
  }
}

const createProps = (owner, { value, defaultValue }) => ({
  onChange: v => owner.update(v),
  value: value || defaultValue || [],
});

export default createInput(createProps)(ArrayComponent);
