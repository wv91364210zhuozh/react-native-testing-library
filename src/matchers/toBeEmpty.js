// @flow
import { matcherHint } from 'jest-matcher-utils';

function isEmpty(instance: ReactTestInstance) {
  if (instance.props.children instanceof Array) {
    if (instance.props.children.length === 0) {
      return true;
    }

    return instance.props.children.every(isEmpty);
  }

  if (instance.props.children instanceof Object) {
    return isEmpty(instance.props.children);
  }

  return (
    instance.props.children === '' ||
    instance.props.children === undefined ||
    instance.props.children === null
  );
}

function toBeEmpty(instance: ReactTestInstance) {
  return {
    pass: isEmpty(instance),
    message: () =>
      [
        matcherHint(`${this.isNot ? '.not' : ''}.toBeEmpty`, 'element', ''),
        '',
        this.isNot
          ? 'Expected empty element to be non-empty'
          : 'Expected non-empty element to be empty',
      ].join('\n'),
  };
}

export default toBeEmpty;
