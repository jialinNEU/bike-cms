/**
 * 引入createStore方法
 */
import { createStore } from 'redux';

import reducer from './../reducer';

export default (prevState) => createStore(reducer, prevState);
