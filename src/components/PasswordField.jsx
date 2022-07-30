import { Controller } from 'react-hook-form';
import {
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import HideIcon from '@mui/icons-material/VisibilityOff';
import ShowIcon from '@mui/icons-material/Visibility';
import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * Password form field with text visibility switch wrapped to Controller.
 *
 * @param {object} props - root props
 * @param {string} props.name - controller name
 * @param {string} props.helperText - optional helper text
 * @param {object} props.control - react hook form control
 */
export function PasswordField({
  name, helperText, control,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
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
          id="3BsM9pWhPPfG72g"
          name={name}
          error={!!error}
          required
          label="Password"
          helperText={
            error?.message || helperText
          }
          inputProps={{
            type: showPassword ? 'text' : 'password',
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((s) => !s)}
                  size="small"
                >
                  {showPassword
                    ? <Tooltip title="Hide password"><HideIcon /></Tooltip>
                    : <Tooltip title="Show password"><ShowIcon /></Tooltip>}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}

PasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  control: PropTypes.instanceOf(Object).isRequired,
};

PasswordField.defaultProps = {
  helperText: '',
};
