// @flow
import React from 'react';
import { View, Text } from 'react-native';
import render from '../../render';

const NON_EMPTY_TEXT = 'non-empty-text';
const EMPTY_TEXT = 'empty-text';
const ONE_NON_EMPTY_CHILD = 'one-non-empty-child';
const ONE_EMPTY_CHILD = 'one-empty-child';
const MULTIPLE_EMPTY_CHILDREN = 'multiple-empty-children';
const ONE_NON_EMPTY_CHILDREN = 'one-non-empty-children';

const TestComponent = () => (
  <View>
    <Text testID={NON_EMPTY_TEXT}>Content</Text>
    <Text testID={EMPTY_TEXT} />
    <View>
      <Text testID={ONE_NON_EMPTY_CHILD}>Content</Text>
    </View>
    <View testID={ONE_EMPTY_CHILD}>
      <Text />
    </View>
    <View testID={MULTIPLE_EMPTY_CHILDREN}>
      <Text />
      <Text />
    </View>
    <View testID={ONE_NON_EMPTY_CHILDREN}>
      <Text />
      <Text>Content</Text>
    </View>
  </View>
);

test.each([NON_EMPTY_TEXT, ONE_NON_EMPTY_CHILDREN, ONE_NON_EMPTY_CHILD])(
  'element with %s testID should not be empty',
  (testID: string) => {
    const { getByTestId } = render(<TestComponent />);

    expect(getByTestId(testID)).not.toBeEmpty();
  }
);

test.each([EMPTY_TEXT, MULTIPLE_EMPTY_CHILDREN, ONE_EMPTY_CHILD])(
  'element with %s testID should be empty',
  (testID: string) => {
    const { getByTestId } = render(<TestComponent />);

    expect(getByTestId(testID)).toBeEmpty();
  }
);
