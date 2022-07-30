import axios from 'axios';
import { requestService } from './requestService';

jest.mock('axios');

it('should pass expected arguments to axios.get', () => {
  requestService.get('some-url');

  expect(axios.get).toBeCalledWith('some-url');
});

it('should pass expected arguments to axios.put', () => {
  requestService.put('some-url', { name: 'test' });

  expect(axios.put).toBeCalledWith(
    'some-url',
    { name: 'test' }
  );
});

it('should pass expected arguments to axios.post', () => {
  requestService.post('some-url', { name: 'test' });

  expect(axios.post).toBeCalledWith(
    'some-url',
    { name: 'test' }
  );
});

it('should delete have default payload value', () => {
  requestService.delete('some-url');

  expect(axios.delete).toBeCalledWith(
    'some-url'
  );
});

it('should post have default payload value', () => {
  requestService.post('some-url');

  expect(axios.post).toBeCalledWith(
    'some-url',
    {}
  );
});

it('should put have default payload value', () => {
  requestService.put('some-url');

  expect(axios.put).toBeCalledWith(
    'some-url',
    {}
  );
});
