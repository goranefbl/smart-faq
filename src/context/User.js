// @flow

import * as React from 'react';

import type { User, onLogin, onSocialLogin, onLogout } from '../types';

export type UserContextType = {
  user: User,
  loginToken: ?string,
  simpleToken: ?string,
  onLogin: onLogin,
  onLogout: onLogout,
  onSocialLogin: onSocialLogin,
};

export const UserContext = React.createContext(
  ({
    user: null,
    loginToken: null,
    simpleToken: null,
    onLogin: (email, password) => Promise.resolve({ email, password }),
    onSocialLogin: provider => Promise.resolve(provider),
    onLogout: () => Promise.resolve(null),
  }: UserContextType),
);

export const withLogin = <Props>(
  Component: React.ComponentType<{ onLogin: onLogin } & Props>,
) =>
  function withLoginHOC(props: Props) {
    return (
      <UserContext.Consumer>
        {({ onLogin }: UserContextType) => (
          <Component {...props} onLogin={onLogin} />
        )}
      </UserContext.Consumer>
    );
  };

export const withSocialLogin = <Props>(
  Component: React.ComponentType<{ onSocialLogin: onSocialLogin } & Props>,
) =>
  function withLoginHOC(props: Props) {
    return (
      <UserContext.Consumer>
        {({ onSocialLogin }: UserContextType) => (
          <Component {...props} onSocialLogin={onSocialLogin} />
        )}
      </UserContext.Consumer>
    );
  };

export const withUser = <Props>(
  Component: React.ComponentType<{ user: User } & Props>,
) =>
  function withUserHOC(props: Props) {
    return (
      <UserContext.Consumer>
        {({ user }: UserContextType) => <Component {...props} user={user} />}
      </UserContext.Consumer>
    );
  };

export const withSimpleToken = <Props>(
  Component: React.ComponentType<{ simpleToken: ?string } & Props>,
) =>
  function withSimpleTokenHOC(props: Props) {
    return (
      <UserContext.Consumer>
        {({ simpleToken }: UserContextType) => (
          <Component {...props} simpleToken={simpleToken} />
        )}
      </UserContext.Consumer>
    );
  };

export const withLoginToken = <Props>(
  Component: React.ComponentType<{ loginToken: ?string } & Props>,
) =>
  function withLoginTokenHOC(props: Props) {
    return (
      <UserContext.Consumer>
        {({ loginToken }: UserContextType) => (
          <Component {...props} loginToken={loginToken} />
        )}
      </UserContext.Consumer>
    );
  };
