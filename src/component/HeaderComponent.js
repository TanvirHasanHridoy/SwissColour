import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Header,Avatar} from 'react-native-elements';
import {Fonts} from '../utilits/Fonts';

const HeaderComponent = props => {
  return (
 
    <Header
      backgroundColor="#345995"
      leftComponent={{
         icon: props.leftIcon,
         color: '#fff' ,
         onPress:props.leftButton,
      }}
      centerComponent={
        <View>
          <Image source={require('../assets/sc.jpg')}/>
        </View>
      }
      rightComponent={
        <Avatar 
          small
          rounded
          icon={{name: 'user', type: 'font-awesome'}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
     }
      
    />
  );
};

export default HeaderComponent;
