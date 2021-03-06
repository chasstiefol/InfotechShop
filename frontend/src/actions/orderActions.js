import axios from 'axios'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_RECEIPT_REQUEST,
  ORDER_RECEIPT_SUCCESS,
  ORDER_RECEIPT_FAIL,
  ORDER_GET_RECEIPT_REQUEST,
  ORDER_GET_RECEIPT_SUCCESS,
  ORDER_GET_RECEIPT_FAIL,
} from '../constants/orderConstants'
import { logout } from './userActions'

export const createOrder = (
  barangPesanan,
  alamatPengiriman,
  metodePembayaran,
  hargaBarang,
  ongkir,
  totalPembayaran
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `/api/order`,
      {
        barangPesanan,
        alamatPengiriman,
        metodePembayaran,
        hargaBarang,
        ongkir,
        totalPembayaran,
      },
      config
    )

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    })
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/order/${id}`, config)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const payOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/order/${orderId}/bayar`, config)

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message,
    })
  }
}

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/order/${orderId}/dikirim`,
      {},
      config
    )

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: message,
    })
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/order/pesanan-saya/${userInfo._id}`,
      config
    )

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    })
  }
}

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/order`, config)

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    })
  }
}

export const sendReceipt = (bukti, orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_RECEIPT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `/api/order/kirim-bukti/${orderId}`,
      { bukti },
      config
    )

    dispatch({
      type: ORDER_RECEIPT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_RECEIPT_FAIL,
      payload: message,
    })
  }
}

export const getReceipt = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_GET_RECEIPT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/order/bukti/${id}`, config)

    dispatch({
      type: ORDER_GET_RECEIPT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_GET_RECEIPT_FAIL,
      payload: message,
    })
  }
}
