import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, Dimensions, Platform } from 'react-native';
import { color, font } from '../utilities/themeStyle';
import AppIntroSlider from './AppIntroSlider';
import { Image } from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');


export default class Intro extends Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	_renderNextButton = () => {
		return (
			<View style={styles.buttonCircle}>
				<MaterialIcon
					name="arrow-forward"
					color="rgba(255, 255, 255, .9)"
					size={45}
					style={{ backgroundColor: 'transparent' }}
				/>
			</View>
		);
	};
	_renderDoneButton = () => {
		return (
			<View style={styles.buttonCircle}>
				<MaterialIcon
					name="check"
					color="rgba(255, 255, 255, .9)"
					size={45}
					style={{ backgroundColor: 'transparent' }}
				/>
			</View>
		);
	};
	_renderSkipButton = () => {
		return (
			<View style={styles.buttonCircle}>
				<MaterialIcon
					name="close"
					color="rgba(255, 255, 255, .9)"
					size={45}
					style={{ backgroundColor: 'transparent' }}
				/>
			</View>
		);
	};
	_renderItem = ({ item }) => {
		return (
			<View style={styles.mainContent}>
				<Text style={styles.title}>{item.title}</Text>
				<Image resizeMode="contain"
					containerStyle={styles.imageContainer}
					source={{ uri: item.url }}
					style={styles.image}
					placeholderStyle={{ backgroundColor: color.TRANSPARENT }}
					PlaceholderContent={<ActivityIndicator />} />
				<Text style={styles.text}>{item.text}</Text>
			</View>
		);
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: this.props.primaryColor }}>
				<AppIntroSlider
					slides={this.props.introImages}
					renderItem={this._renderItem}
					keyExtractor={(item, index) => index.toString()}
					onDone={this.props.introSkip}
					onSkip={this.props.introSkip}
					showSkipButton={true}
					renderSkipButton={this._renderSkipButton}
					renderDoneButton={this._renderDoneButton}
					renderNextButton={this._renderNextButton}
				/>
			</SafeAreaView>
		);
	}
}


const isIphoneX =
	Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (height === 812 || width === 812);
var imageHeight = height * 0.72 + (isIphoneX ? -50 : 0);

const styles = StyleSheet.create({
	mainContent: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: imageHeight * 0.15,
		paddingTop: 10,
	},
	image: {
		width: imageHeight * 9 / 16 + 0.6,
		height: imageHeight
	},
	imageContainer: {
		borderWidth: 0.3,
		borderColor: color.CLOUDS
	},
	text: {
		fontSize: font.FONT_SIZE_LARGE,
		color: color.WHITE,
		textAlign: "center",
		paddingVertical: 10
	},
	title: {
		fontSize: font.FONT_SIZE_XLARGE,
		fontWeight: font.FONT_WEIGHT_BOLD,
		color: color.WHITE,
		textAlign: "center",
		paddingTop: Platform.OS == "android" ? 20 : 0,
		paddingBottom: 10
	},
});
