import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, Button} from 'react-native';
import Constant from '../helper/themeHelper';

export default class Users extends Component {

    constructor(props){
        super(props);
        this.state={
            refreshing: false,
            userList: []
        }
    }

    componentDidMount() {
        this.makeAPICall();
    }


    keyExtractor = (item) => {
        return item.id + "";
    };

    renderSeparator = ({leadingItem, section})=>{
        return <View style={{height:10}}/>;
    };

    renderEmpty = () => {
        return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:15}}>
                {"No data found"}
            </Text>
        </View>
    };

    onRefresh = () => {
        this.setState({refreshing: true});
        this.makeAPICall();
    };

    makeAPICall = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    userList: responseJson,
                    refreshing: false
                });
            })
            .catch((error) => {
                alert(error);
            });
    };

    renderItem = ({item, index}) => {
        return(
            <View key={index} style={{borderRadius:5,padding:10, borderWidth:1, borderColor:'#bdbdbd', marginLeft:10, marginRight:10}}>
                <Text style={{fontSize: Constant.fontSize.small}}>{item.name}</Text>
                <Text>{item.email}</Text>
            </View>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.userList}
                          contentContainerStyle={{top:20}}
                          automaticallyAdjustContentInsets={false}
                          renderItem={this.renderItem}
                          keyExtractor={this.keyExtractor}
                          ItemSeparatorComponent={this.renderSeparator}
                          ListEmptyComponent={this.renderEmpty}
                          onRefresh={this.onRefresh}
                          refreshing={this.state.refreshing}
                          ListFooterComponent={<View style={{ height: 50}}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constant.appColor,
        justifyContent:'center'
    },
    titleText: {
        fontSize: 12,
        alignSelf: 'center',
        marginBottom: 20
    },
    rowContainer: {
        borderWidth: 1,
        borderColor: '#bdbdbd',
        borderRadius: 5,
        justifyContent:'center',
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
    }
});