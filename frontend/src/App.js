import SignupScreen from './screens/SignupScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import ProductDetailScreen from './screens/ProductDetailScreen'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={HomeScreen}></Route>
        <Route path='/Signup' component={SignupScreen} exact></Route>
        <Route path='/Login' component={LoginScreen}></Route>
        <Route path='/AddProduct' component={ProductScreen}></Route>
        <Route path='/Product/:id' component={ProductDetailScreen}></Route>
        <Route path='/Cart' component={CartScreen}></Route>
      </Switch>
    </Router>
  )
}

export default App
