import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from '@common/store'
import { Screen } from '@common/containers'

export default () =>
  <Provider store={store}>
    <Screen/>
  </Provider>
