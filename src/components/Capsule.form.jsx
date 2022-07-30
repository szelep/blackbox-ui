import PropTypes from 'prop-types';
import {
  useForm,
  Controller,
} from 'react-hook-form';
import {
  Box,
  FormControl,
  TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import {
  addDays,
  isAfter,
  isValid,
} from 'date-fns';
import { useState } from 'react';
import { PasswordField } from './PasswordField';
import { ActionButtons } from './ActionButtons';

/**
 * Main capsule edit/create form.
 *
 * @param {object} props - root props
 * @param {object} props.initialData - optional initial data
 * @param {boolean} props.editMode - is edit mode
 * @param {Function} props.onSubmit - function invoked on form submit
 * @returns {CapsuleForm}
 */
export function CapsuleForm({
  initialData, editMode, onSubmit,
}) {
  const [submitting, setSubmitting] = useState(false);
  const {
    control, handleSubmit, setError,
  } = useForm({
    defaultValues: {
      content: initialData?.content || '',
      publishAt: initialData?.publishAt ? new Date(initialData.publishAt) : addDays(new Date(), 1),
      rawPassword: '',
    },
    mode: 'all',
  });

  return (
    <>
      <Box>
        {(initialData?.status === 'published' || !initialData) && (
          <FormControl
            fullWidth
            sx={{ mt: (t) => t.spacing(3) }}
          >
            <Controller
              name="content"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'This field must not be blank.',
                },
              }}
              render={({
                field,
                fieldState: {
                  error,
                },
              }) => (
                <TextField
                  {...field}
                  disabled={initialData?.status === 'published'}
                  required
                  id="6NavJcxay3tKcyE"
                  label="Content"
                  multiline
                  minRows={5}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </FormControl>
        )}

        {initialData?.status !== 'published' && (
          <FormControl
            fullWidth
            sx={{ mt: (t) => t.spacing(3) }}
          >
            <Controller
              name="publishAt"
              control={control}
              rules={{
                validate: {
                  isValidDate: (dateValue) => isValid(dateValue) || 'Invalid date.',
                  isAfterNow: (dateValue) => isAfter(dateValue, new Date())
                    || 'Publication date must be greater than now.',
                },
                required: {
                  value: true,
                  message: 'This field must not be blank.',
                },
              }}
              render={({
                field,
                fieldState: {
                  error,
                },
              }) => (
                <DateTimePicker
                  {...field}
                  ampm={false}
                  disablePast
                  inputFormat="yyyy-MM-dd HH:mm"
                  mask="____-__-__ __:__"
                  label="Publication date"
                  onChange={field.onChange}
                  onAccept={field.onChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      id="whHW7tzRkvS25fA"
                      error={!!error}
                      helperText={error?.message || 'May be changed any time before publication.'}
                    />
                  )}
                />
              )}
            />
          </FormControl>
        )}
        {initialData?.status !== 'published' && (
          <FormControl
            fullWidth
            sx={{ mt: (t) => t.spacing(3) }}
          >
            <PasswordField
              name={editMode ? 'modificationPassword' : 'rawPassword'}
              control={control}
              helperText={
                editMode ? 'It is required to authorization.'
                  : 'It will be used for modifications such as unpublishing or publication date change.'
              }
            />
          </FormControl>
        )}
      </Box>
      <ActionButtons
        disable={submitting}
        capsuleStatus={initialData?.status}
        capsuleId={initialData?.id}
        onSaveClick={handleSubmit((payload) => {
          setSubmitting(true);
          onSubmit(
            payload,
            setError,
            () => setSubmitting(false)
          );
        })}
      />
    </>
  );
}

CapsuleForm.propTypes = {
  initialData: PropTypes.oneOfType([
    PropTypes.instanceOf(Object),
    PropTypes.oneOf([null]),
  ]),
  editMode: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

CapsuleForm.defaultProps = {
  initialData: null,
  editMode: false,
};
