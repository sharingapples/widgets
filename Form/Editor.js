/* global __DEV__ */
// @flow
import React, { Component } from 'react';

// Get the EditorContext
export const EditorContext = React.createContext();

let uniqueId = 0;

type Props = {
  value: {},
  onChange: (value: {}) => void,
  onSubmit: ?(error: boolean, value: {}) => void,
}

type State = {
  changeHandler: ({}) => void,
}

function getOwner(props, state) {
  // Preper props over state
  // eslint-disable-next-line react/destructuring-assignment
  if (props.onChange) {
    return props;
  }

  if (state.onChange) {
    return state;
  }

  return null;
}

class Editor extends Component<Props, State> {
  static contextType = EditorContext;

  constructor(props, context) {
    super(props, context);

    // No owner on state, used mostly by Array Editors
    this.state = { changeHandler: null };

    // List of validators used by this editor
    this.validators = [];

    // Number of submit buttons associated with this editor
    this.submitCount = 0;

    // Value Change listeners for useFormValue
    this.listeners = [];

    // Input specific parsers
    this.parsers = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    const nextOwner = getOwner(nextProps, nextState);
    const owner = getOwner(this.props, this.state);

    return nextOwner.value !== owner.value || nextOwner.onChange !== owner.onChange;
  }

  edit(owner: { value: {}, onChange: ({}) => void }) {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.props.onChange) {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.warn('Calling edit method on an Editor component that has owner as its prop. This is a no-op');
      }
      return;
    }

    if (!owner) {
      this.setState({ value: null, onChange: null });
    } else {
      this.setState(owner);
    }
  }

  createContext() {
    const { onSubmit } = this.props;
    const { value, onChange } = getOwner(this.props, this.state);

    // Keep a copy of the value
    const currentValue = Object.assign({}, value);

    return {
      parent: this.context,
      get: name => currentValue[name],
      getState: () => currentValue,
      // eslint-disable-next-line react/destructuring-assignment
      getRootState: () => (this.context ? this.context.getRootState() : currentValue),
      set: (name, newValue) => {
        // Use parsers if any
        const parsedValue = this.parsers[name] ? this.parsers[name](newValue) : newValue;
        // Check if value has actually changed
        if (parsedValue === currentValue[name]) {
          return;
        }

        // Always update the current value
        currentValue[name] = parsedValue;

        // If no submit handlers are defined, propagate the change instantly
        if (!this.submitCount && onChange) {
          onChange(currentValue);
        }

        // Run the listeners
        this.listeners.forEach(({ input, setter }) => {
          if (typeof input === 'string') {
            if (input === name) setter(parsedValue);
          } else {
            setter(input(currentValue));
          }
        });

        // Run the validators
        this.validators.forEach(({ input, validator, errorHandler }) => {
          let checkValue = parsedValue;
          if (typeof input === 'function') {
            checkValue = input(currentValue);
          } else if (input !== name) {
            return;
          }

          try {
            validator(checkValue);
          } catch (err) {
            errorHandler(err.message);
          }
        });
      },
      submit: () => {
        const error = this.validators.reduce((res, { input, validator, errorHandler }) => {
          const chk = typeof input === 'function' ? input(currentValue) : currentValue[input];
          try {
            validator(chk);
          } catch (err) {
            errorHandler(err.message);
            return true;
          }
          return res;
        }, false);

        if (error) {
          if (onSubmit) {
            onSubmit(true);
          }
        } else {
          // No error, make sure we have an updated state
          if (onChange) onChange(currentValue);

          if (onSubmit) onSubmit(false, currentValue);
        }
      },
      registerValidator: (input, validator, errorHandler) => {
        uniqueId += 1;
        const id = uniqueId;
        this.validators.push({ id, input, validator, errorHandler });
        return () => {
          const idx = this.validators.findIndex(({ id: uid }) => uid === id);
          if (idx >= 0) {
            this.validators.splice(idx, 1);
          }
        };
      },
      registerListener: (input, setter) => {
        uniqueId += 1;
        const id = uniqueId;
        this.listeners.push({ id, input, setter });
        return () => {
          const idx = this.listeners.findIndex(({ id: uid }) => id === uid);
          if (idx >= 0) {
            this.listeners.splice(idx, 1);
          }
        };
      },
      registerParser: (name, parser) => {
        if (this.parsers[name]) {
          throw new Error(`Cannot have multiple parsers for same input. Trying to register multiple parsers for ${name}`);
        }

        this.parsers[name] = parser;
        return () => {
          delete this.parsers[name];
        };
      },
      addSubmit: () => {
        this.submitCount += 1;
        return () => {
          this.submitCount -= 1;
        };
      },
    };
  }

  render() {
    // Editor needs a change handler to work, do not render
    // if it doesn't have one
    if (!getOwner(this.props, this.state)) {
      return null;
    }

    const context = this.createContext();
    const { value, onChange, onSubmit, ...other } = this.props;
    return (
      <EditorContext.Provider {...other} value={context} />
    );
  }
}

export default Editor;
