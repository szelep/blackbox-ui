import {
  render,
  screen,
} from '@testing-library/react';
import { StatusIcon } from './StatusIcon';

it('should render expected queued icon', () => {
  render(
    <StatusIcon statusName="queued" />
  );

  expect(screen.getByTestId('PauseCircleOutlineOutlinedIcon')).toBeInTheDocument();
});

it('should render expected published icon', () => {
  render(
    <StatusIcon statusName="published" />
  );
  expect(screen.getByTestId('DoneAllOutlinedIcon')).toBeInTheDocument();
});

it('should render expected icon for undefined status', () => {
  render(
    <StatusIcon statusName="some-unknown-status" />
  );
  expect(screen.getByTestId('QuestionMarkOutlinedIcon')).toBeInTheDocument();
});
