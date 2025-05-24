import { openAlertMessage } from './alertActions';
import * as api from '../../api';

export const UPDATE_SETTINGS_REQUEST = 'UPDATE_SETTINGS_REQUEST';
export const UPDATE_SETTINGS_SUCCESS = 'UPDATE_SETTINGS_SUCCESS';
export const UPDATE_SETTINGS_FAILURE = 'UPDATE_SETTINGS_FAILURE';
export const GET_SETTINGS_REQUEST = 'GET_SETTINGS_REQUEST';
export const GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS';
export const GET_SETTINGS_FAILURE = 'GET_SETTINGS_FAILURE';

export const updateSettings = (settingsData, user) => async (dispatch) => {
  if (!user) {
    console.error('updateSettings: brak użytkownika');
    return;
  }

  console.log('updateSettings called with:', {
    settingsData,
    user: {
      mail: user.mail,
      username: user.username,
    },
  });

  dispatch({ type: UPDATE_SETTINGS_REQUEST });
  try {
    const response = await api.saveSettings(settingsData);

    console.log('updateSettings response:', response);

    if (response.error) {
      console.error('updateSettings error:', response);
      dispatch({
        type: UPDATE_SETTINGS_FAILURE,
        error: response.exception?.message || 'Error updating settings',
      });
      dispatch(
        openAlertMessage(
          response.exception?.response?.data || 'Error updating settings',
        ),
      );
    } else {
      console.log('updateSettings success:', response.data);
      dispatch({
        type: UPDATE_SETTINGS_SUCCESS,
        payload: response.data,
      });
      dispatch(openAlertMessage('Settings updated successfully!'));
    }
  } catch (err) {
    console.error('updateSettings exception:', err);
    dispatch({
      type: UPDATE_SETTINGS_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage('Error updating settings: ' + err.message));
  }
};

export const getSettings = (user) => async (dispatch) => {
  if (!user) return;
  const { mail } = user;

  dispatch({ type: GET_SETTINGS_REQUEST });
  try {
    const response = await api.getSettings({
      email: mail,
    });

    if (response.error) {
      dispatch({
        type: GET_SETTINGS_FAILURE,
        error: response.exception?.message || 'Error getting settings',
      });
      dispatch(
        openAlertMessage(
          response.exception?.response?.data || 'Error getting settings',
        ),
      );
    } else {
      dispatch({
        type: GET_SETTINGS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_SETTINGS_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage('Error getting settings: ' + err.message));
  }
};
