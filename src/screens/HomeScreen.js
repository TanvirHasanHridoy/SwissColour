import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon, Input, Button} from 'react-native-elements';
import HeaderComponent from '../component/HeaderComponent';
import DataOverview from '../component/DataOverview';
import {connect} from 'react-redux';
import {setNote, getMovies} from '../store/actions/index';
import { ScrollView } from 'react-native-gesture-handler';

class HomeScreen extends Component {
  state = {
    note: '',
  };

  noteSaveToStore = () => {
    this.props.setNoteStore(this.state.note);
  };

  render() {
    return (
      <View>
        
        <HeaderComponent
          title="Home"
          leftIcon="menu"
          leftButton={() => this.props.navigation.toggleDrawer()}
          color="#9CC3D5FF"
        />
        <ScrollView>
          <View style={{flex: 1}}>
          <Text style={{ margin:7, fontSize:24, fontWeight:'bold'}}>DASHBOARD</Text>
          
          <View style={styles.hometolocation}>
            <View style={{flex:1}}>
              <Icon  name= 'color-lens' type= 'MaterialIcons'/>
            </View>
            <View style={{flex:8}}>
              <Text style={{color:'grey'}}>HOME --- Dashboard</Text>
            </View>
          </View>

          <View>
            <DataOverview 
              iconName="exchange" 
              iconType="font-awesome"
              dataName="LOAD IN"
              dataValue={10}
            />

            <DataOverview 
              iconName="file" 
              iconType="font-awesome"
              dataName="PROFORMA INVOICE"
              dataValue={36}
            />

          <DataOverview 
              iconName="shopping-cart" 
              iconType="feather"
              dataName="PRODUCT"
              dataValue={904}
            />


          <DataOverview 
              iconName="users" 
              iconType="font-awesome"
              dataName="USER"
              dataValue={20}
            />
          </View>

          <Input
            placeholder="Note"
            onChangeText={val => this.setState({note: val})}
          />
          <Text>{this.state.note}</Text>
          <Button title="SAVE" onPress={() => this.noteSaveToStore()} />
        </View>
      </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  hometolocation: {
    flexDirection:'row',
    margin:7,
    padding:5,
    // alignItems: 'flex-start',
    backgroundColor:'#bed1c3',
    borderRadius:2,
  }
});
const mapStateToProps = state => {
    return {
      note: state.notes
    }
}

const mapDispatchToProps = dispatch => {
  return {
    setNoteStore: note => dispatch(setNote(note)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(HomeScreen);
