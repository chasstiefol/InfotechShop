import SignupScreen from './screens/SignupScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import ProductDetailScreen from './screens/ProductDetailScreen'
import ShippingScreen from './screens/ShippingScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PaymentScreen from './screens/PaymentScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProductListScreen from './screens/ProductListScreen'
import OrderScreen from './screens/OrderScreen'
import OrderListScreen from './screens/OrderListScreen'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={HomeScreen}></Route>
        <Route path='/Signup' component={SignupScreen} exact></Route>
        <Route path='/Login' component={LoginScreen}></Route>
        <Route path='/AddProduct' component={ProductScreen}></Route>
        <Route path='/Product/:id' component={ProductDetailScreen}></Route>
        <Route path='/cart' component={CartScreen}></Route>
        <Route path='/shipping' component={ShippingScreen}></Route>
        <Route path='/payment' component={PaymentScreen}></Route>
        <Route path='/place-order' component={PlaceOrderScreen}></Route>
        <Route path='/product-list' component={ProductListScreen}></Route>
        <Route path='/profile' component={ProfileScreen}></Route>
        <Route path='/order/:id' component={OrderScreen}></Route>
        <Route path='/order-list' component={OrderListScreen}></Route>
      </Switch>
    </Router>
  )
}

export default App
