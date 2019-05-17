// @flow
import React, { useState, useCallback } from 'react';
import type { ComponentType } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Group } from '@sharingapples/form';
import StatusBar from '@sharingapples/status-bar';
import Page from './Page';
import Submit from './Submit';

function Back({ onPress }: () => void) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text allowFontScaling={false} style={{ color: 'white' }}>Back</Text>
    </TouchableOpacity>
  );
}

type Props = {
  name: string,
  GroupForm: ComponentType,
};

function GroupInput({ name, GroupForm }: Props) {
  const [visible, setVisible] = useState(false);
  const hide = useCallback(() => setVisible(false), []);
  const show = useCallback(() => setVisible(true), []);

  return (
    <Group name={name} onSubmit={hide}>
      <Page visible={visible} show={show} hide={hide} Minimized={GroupForm.Summary}>
        <StatusBar>
          {StatusBar.centered('Spouse', <Back onPress={hide} />, <Back onPress={hide} />)}
        </StatusBar>
        <GroupForm />
        <Submit />
      </Page>
    </Group>
  );
}

export default React.forwardRef(GroupInput);
