import React from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native';

export default class DefaultSlide extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const style = {
      flex: 1,
      backgroundColor: this.props.item.backgroundColor,
      width: this.props.dimensions.width,
      paddingBottom: this.props.bottomButton ? 132 : 64,
    };

    return (
      <View style={[styles.mainContent, style]}>
        <Text style={[styles.title, this.props.item.titleStyle]}>{this.props.item.title}</Text>
        <Image resizeMode="contain" source={this.props.item.image} style={this.props.item.imageStyle} />
        <Text style={[styles.text, this.props.item.textStyle]}>{this.props.item.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: 'rgba(255, 255, 255, .7)',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '300',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    color: 'rgba(255, 255, 255, .7)',
    fontWeight: '300',
    paddingHorizontal: 16,
  },
});
