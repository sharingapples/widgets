// @flow
import React, { useState, useContext, useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { TransitionView, useTransitionState } from '@sharingapples/animation';

const WizardContext = React.createContext();

export function useWizard() {
  return useContext(WizardContext);
}

type Props = {
  children: React.Node,
  start?: number,
  onComplete: () => any,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


function Wizard({ children, start, onComplete }: Props) {
  const width = useRef(0);
  const [page, setPage] = useState(Number(start));
  const controller = useTransitionState(page);

  const pages = React.Children.toArray(children);
  const next = useCallback(() => {
    if (page === pages.length - 1) {
      onComplete();
    } else {
      setPage(p => p + 1);
    }
  }, [page, setPage]);

  const prev = useCallback(() => {
    setPage(p => p - 1);
  }, [setPage]);


  const wizAnimStyle = useCallback((driver, state, otherState) => ({
    ...StyleSheet.absoluteFillObject,
    transform: [
      {
        translateX: driver.interpolate({
          inputRange: [0, 1],
          // $FlowFixMe value is initialized to zero on useRef
          outputRange: [Math.sign(state - otherState) * width.current, 0],
        }),
      },
    ],
  }), []);

  const calcWidth = (e) => { width.current = e.nativeEvent.layout.width; };
  const context = { next, prev, currentPage: page, totalPages: pages.length };
  return (
    <View style={styles.container} onLayout={calcWidth}>
      <WizardContext.Provider value={context}>
        {pages.map((p, index) => (
          <TransitionView
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            state={index}
            style={wizAnimStyle}
            controller={controller}
          >
            {p}
          </TransitionView>
        ))
      }
      </WizardContext.Provider>
    </View>
  );
}

Wizard.defaultProps = { start: 0 };


export default Wizard;
