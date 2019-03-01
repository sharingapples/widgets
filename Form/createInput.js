import React, { Component } from 'react';
import { Consumer } from './Group';

function createInput(mapFormToProps) {
  return (InputComponent) => {
    class InputHelper extends Component {
      constructor() {
        super();
        this.state = { error: null };
      }

      componentDidMount() {
        const { owner, name } = this.props;
        owner.register(name, this);
      }

      componentWillUnmount() {
        const { owner, name } = this.props;
        owner.register(name, null);
      }

      validate(value) {
        const {
          validator, state,
        } = this.props;
        if (this.reference && this.reference.validate) {
          this.reference.validate(value);
        }
        const validationValue = value;
        if (validator) {
          try {
            if (Array.isArray(validator)) {
              validator.forEach(v => v(validationValue, state));
            } else {
              validator(validationValue, state);
            }
            this.setState({ error: null });
          } catch (e) {
            this.setState({ error: e });
          }
        }
        return value;
      }

      render() {
        const { name, owner, ...other } = this.props;
        const params = {
          update: (value) => {
            this.validate(value);
            owner.update(name, value);
            if (other.onChange) {
              other.onChange(value);
            }
          },
        };
        const { error } = this.state;
        const inputProps = { ...other, ...mapFormToProps(params, this.props, error) };
        return (
          <InputComponent
            ref={(node) => { this.reference = node; }}
            {...inputProps}
            name={name}
          />);
      }
    }

    return props => (
      <Consumer>
        {({ owner, state }) => (
          <InputHelper
            owner={owner}
            state={state}
            {...props}
            value={owner.get(props.name) || props.value}
          />)}
      </Consumer>
    );
  };
}

export default createInput;
