import axios from "axios";
import {
  FRIENDS_GET_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
} from "../types/messengerType";
export const getFriends = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/messenger/get-friends");
    dispatch({
      type: FRIENDS_GET_SUCCESS,
      payload: {
        friends: response.data.friends,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const messageSend = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/api/messenger/send-message", data);
    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: {
        message: response.data.message,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getMessage = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/messenger/get-message/${id}`);
      dispatch({
        type: MESSAGE_GET_SUCCESS,
        payload: {
          message: response.data.message,
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const ImageMessageSend = (data) => async (dispatch) => {
  try {
    console.log(data);
    const response = await axios.post(
      "/api/messenger/image-message-send",
      data
    );
    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: {
        message: response.data.message,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const TiffMessageSend = (data) => async (dispatch) => {
  console.log("Tiff");
  const imageData = data.get("image");
  const imageName = data.get("imageName");
  // console.log("TiffMessageName: ", imageData);
  try {
    console.log(data);
    const response = await axios
      .post(`http://127.0.0.1:5002/prediction/<${imageName}>`, imageData)
      .then((res) => console.log(res, " response from mlserver"))
      .catch((err) => console.warn(err, "  error from ml server"));

    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: {
        message: response.data,
      },
    });
  } catch (error) {
    console.log(
      "error console cause response not do proper work from localhost 5003"
    );
    console.log(error);
  }
};

export const seenMessage = (msg) => async (dispatch) => {
  try {
    const response = await axios.post("/api/messenger/seen-message", msg);
  } catch (error) {
    console.log(error.response.message);
  }
};
export const updateMessage = (msg) => async (dispatch) => {
  try {
    const response = await axios.post("/api/messenger/delivared-message", msg);
  } catch (error) {
    console.log(error.response.message);
  }
  console.log(msg);
};

export const getTheme = () => async (dispatch) => {
  const theme = localStorage.getItem("theme");
  dispatch({
    type: "THEME_GET_SUCCESS",
    payload: {
      theme: theme ? theme : "white",
    },
  });
};

export const themeSet = (theme) => async (dispatch) => {
  localStorage.setItem("theme", theme);
  dispatch({
    type: "THEME_SET_SUCCESS",
    payload: {
      theme: theme,
    },
  });
};
