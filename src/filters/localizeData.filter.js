// localize breath exercises data

import store from '../store';

import { breathData } from '../js/breath-data';

export default function localizeBreath(id, key) {
  const locale = store.getters.locale || 'ru-RU';
  return breathData[id][locale][key];
}
