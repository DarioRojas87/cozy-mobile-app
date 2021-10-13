import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native'
import { connect } from 'react-redux'
import cartActions from '../redux/actions/cartActions'
import Icon from 'react-native-vector-icons/Ionicons'

const ProductInCart = ({cartItem, updateCartProduct, deleteACartProduct}) => {
    const [enableCounter, setEnableCounter] = useState(true)

    const updateCartProductHandler = (operation) => {
        console.log('entra')
        setEnableCounter(false)
        let updatedCartItem = {
          product: cartItem.product,
          quantity:
            operation === "+" ? cartItem.quantity + 1 : cartItem.quantity - 1,
        }
        updateCartProduct(updatedCartItem)
        setEnableCounter(true)
      }

    const photo = cartItem.product.photo.includes("http")
    ? cartItem.product.photo
    : `https://cozydeco.herokuapp.com/${cartItem.product.photo}`
      console.log(cartItem)
    return (
      <ScrollView style={styles.wrapper} > 
        <View style={styles.container}>
            <Image source={{ uri: photo}} style={styles.top} resizeMode="cover"/>
            <View style={styles.bottom}>
              {/* <View style={styles.nameAndPrice}>
                <Text style={styles.productName}>
                    {cartItem.product.name}
                </Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>${cartItem.product.price}</Text>
                </View>
              </View> */}
              <View style={styles.cardButtons}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%'}}>
                  <Icon onPress={cartItem.quantity > 1 && enableCounter
                  ? () => updateCartProductHandler("-")
                  : null} name="remove-outline" size={25} />
                    <Text>{cartItem.quantity}</Text>
                    <Icon onPress={cartItem.product.stock > cartItem.quantity && enableCounter
                  ? () => updateCartProductHandler("+")
                  : null} name="add" size={25} name="add" />
                  <Icon name="trash" size={25} onPress={() => deleteACartProduct(cartItem.product._id)} />
                  <Text>
                    $
                    {(
                      (cartItem.product.discount === 0
                        ? cartItem.product.price
                        : ((100 - cartItem.product.discount) / 100) *
                          cartItem.product.price) * cartItem.quantity
                    ).toFixed(2)}
                    </Text>
                </View>
                <View>
                <Text style={styles.price}> ${cartItem.product.price} - {cartItem.product.name}</Text>
                </View>
              </View>
            </View>
          </View>
      </ScrollView>
    )
}

const mapDispatchToProps =  {
    deleteACartProduct: cartActions.deleteACartProduct,
    updateCartProduct: cartActions.updateCartProduct,
}

export default connect(null, mapDispatchToProps)(ProductInCart)

const styles = StyleSheet.create({
wrapper: {
    minWidth: "85%",
    marginVertical: "2%",
    marginHorizontal: 0.5,
    backgroundColor: "#ead8ca", 
    position: "relative",
    overflow: "hidden",
    borderRadius: 20,
  },
  
  container: {
      backgroundColor: "#ead8ca",
      height: 100,
      flexDirection: "row",
      width: "100%",
      backgroundColor: 'yellow'
  },

  top: {
      height: '100%',
      width: 100,
      overflow: "hidden",
      backgroundColor: 'red'
  },

  bottom: {
    height: "100%",
    width: "100%",
  },

  nameAndPrice: {
    backgroundColor: "#ead8ca",
    height: "20%",
    justifyContent: "space-evenly",
    alignItems: "center",
    
  },

  productName: {
    fontSize: 20,
  },

  priceContainer: {
    flexDirection: "row", 
    alignItems: "center",
  },

  price: {
    color: "black",
    fontSize: 15,
  },

  sale: {
    color: "#dd3e2c",
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid',
    fontSize: 20,
    marginRight: 15,
  },

  cardButtons: {
    backgroundColor: "#ead8ca",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    width: 300
  },

  icon: {
    color: "white",
    fontSize: 38,
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    zIndex: 5,
  }, 

  counter: {
    flexDirection: "row",
    width: "100%",
  }
})