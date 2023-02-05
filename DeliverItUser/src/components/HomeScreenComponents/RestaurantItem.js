import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import COLORS from '../../../assets/constants/colors';
import icons from '../../../assets/constants/icons';

const RestaurantItem = ({ restaurant }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeName = route.name;
  
  const onPress = () => {
    navigation.navigate('Restaurant', {
      screen: 'RestaurantInfoScreen', 
      params: { restaurant_ID: restaurant.id, previous_screen: routeName},
    });
  }

  return (
    <Pressable onPress={onPress} style={styles.RestaurantItem}>
      <View style={styles.RestaurantItemImageHolder}>
        <Image
          style={styles.RestaurantImage}
          source={{
            uri: restaurant.image,
          }}
        />
        <Image source={restaurant?.isFavorite ? icons.heartFilled : icons.heart} style={styles.Like} />
      </View>
      <View style={styles.ItemInfo}>
        <Text style={styles.ItemName}>{restaurant.name}</Text>
        <Text style={styles.ItemDescription}>{restaurant.address}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={styles.InfoIcon} source={icons.star} />
          <Text style={styles.InfoText}>{restaurant.rating.toFixed(1)}</Text>
          <Image style={styles.InfoIcon} source={icons.delivery} />
          <Text style={styles.InfoText}>₽{restaurant.deliveryFee.toFixed(0)}</Text>
          <Image style={styles.InfoIcon} source={icons.time} />
          <Text style={styles.InfoText}>{restaurant.minDeliveryTime.toFixed(0)} - {restaurant.maxDeliveryTime.toFixed(0)} mins</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RestaurantItem;


const styles = StyleSheet.create({
  RestaurantItem: {
    height: 250,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: COLORS.secondary,
  },

  RestaurantItemImageHolder: {
    height: "65%",
    width: "100%",
    borderTopEndRadius: 25
  },

  RestaurantImage: {
    flex: 1,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25
  },

  ItemInfo: {
    margin: 10,
    marginRight: 15,
    justifyContent: "space-between",
  },

  ItemName: {
    fontSize: 17,
    marginBottom: 5,
    fontWeight: "600"
  },

  ItemDescription: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: "400",
    color: COLORS.grey
  },
  Like: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 15,
    height: 35,
    width: 35,
    tintColor: COLORS.red
  },
  InfoText: {
    fontSize: 14,
    marginLeft: 8,
    marginRight: 35,
    marginTop: 3
  },
  InfoIcon: {
    height: 25,
    width: 25,
    tintColor: COLORS.primary
  }
});
