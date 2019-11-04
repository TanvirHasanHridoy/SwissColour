import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Header,Avatar,Icon} from 'react-native-elements';
import {Fonts} from '../utilits/Fonts';

const DataOverview = props => {
  return (

    <View style={styles.mb}>
        <View style={[styles.fb]}>
            <Icon 
                size={45}
                name={props.iconName}
                type={props.iconType}
                color='white'
                underlayColor='grey'
                onPress={() => console.log('hello')} 
            />
        </View>
        <View style={styles.lb}> 
            <Text>{props.dataName}</Text>
            <Text style={{fontWeight:'bold'}}>{props.dataValue}</Text>
        </View>
    </View>
    
  )
  
};

const styles = StyleSheet.create({
    mb:
    {
        backgroundColor:'#5ce680',
        height:120,
        width:'97%',
        // marginLeft:10,
        // marginRight:10,
        flexDirection:'row',
        alignSelf:'center',
        borderRadius:5,
        overflow:'hidden',
        margin:6,
    },
    fb:
    {
        backgroundColor:'#fcd5ae',
        height:'100%',
        flex:2,
        justifyContent:'center',
        alignItems:'center',
    },
    lb:
    {
        backgroundColor:'#dff5e5',
        height:'100%',
        flex:6,
        padding:10,
        flexDirection:'column'
    }
});

export default DataOverview;
