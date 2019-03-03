// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import { Consumer } from './Group';

type PropsSelectPure = {
  child: (value: any) => Node,
  state: {},
}
type PropsSelect = {
  children: (value: any) => Node,
  select: (string) => any,
}

class SelectPure extends PureComponent<PropsSelectPure> {
  render() {
    const { child, state } = this.props;
    return child({ state });
  }
}

const Select = ({ select, children }: PropsSelect) => (
  <Consumer>
    {
      ({ owner, state }) => (
        state && select(state) && (
        <SelectPure child={children} value={select(state)} state={state} owner={owner} />)
      )}
  </Consumer>
);

export default Select;
