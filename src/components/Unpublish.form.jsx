import { useForm } from 'react-hook-form';
import {
  Button,
  CircularProgress,
  FormControl,
} from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { PasswordField } from './PasswordField';
import { requestService } from '../services/requestService';
import { API_ROUTES } from '../constants/ApiRoutes';
import { useGlobalDialog } from '../providers/GlobalDialogProvider';
import { useSnackbar } from '../providers/SnackbarProvider';

/**
 * Form for unpublishing operation.
 *
 * @param {object} props - root props
 * @param {string} props.capsuleId - capsule identifier
 * @returns {UnpublishForm}
 */
export function UnpublishForm({ capsuleId }) {
  const navigate = useNavigate();
  const { closeAll } = useGlobalDialog();
  const {
    error, success,
  } = useSnackbar();
  const [submitting, setSubmitting] = useState(false);

  const {
    control, setError, handleSubmit,
  } = useForm({
    defaultValues: {
      modificationPassword: '',
    },
    mode: 'all',
  });

  const onSubmit = async (payload) => {
    setSubmitting(true);
    try {
      await requestService.put(
        API_ROUTES.unpublish.replace(':id', capsuleId),
        payload
      );
      success('Capsule has been unpublished successfully!');
      navigate('/');
      closeAll();
    } catch (requestError) {
      error('An error occured.');
      const violations = requestError?.response?.data?.violations || [];
      violations.forEach(({
        message, propertyPath,
      }) => {
        setError(
          propertyPath,
          {
            type: 'manual',
            message,
          }
        );
      });
    }
    setSubmitting(false);
  };

  return (
    <>
      <FormControl fullWidth>
        <PasswordField
          name="modificationPassword"
          control={control}
        />
      </FormControl>
      <Button
        disabled={submitting}
        id="2xfu6hdYcCypVM4"
        color="error"
        variant="outlined"
        fullWidth
        sx={{
          mt: (t) => t.spacing(2),
        }}
        onClick={handleSubmit(onSubmit)}
      >
        Confirm
        {submitting && (
          <CircularProgress
            aria-label="Awaits for request finish"
            sx={{
              position: 'absolute',
            }}
            size={16}
          />
        )}
      </Button>
    </>
  );
}

UnpublishForm.propTypes = {
  capsuleId: PropTypes.string.isRequired,
};
