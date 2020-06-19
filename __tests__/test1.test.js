import {test, expect} from '@jest/globals';
import reverse from '../src/test1.js';


test('smth test', () => {
    expect(reverse('hello')).toEqual('olleh')
});