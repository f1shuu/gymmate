import {  Text, TouchableOpacity, Image, Animated, Dimensions, Modal, Pressable, } from 'react-native';
import { useRef, useState } from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';
import { GestureHandlerRootView, PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';

import Container from '../../components/Container';

import { useSettings } from '../../helpers/SettingsProvider';

const { width, height } = Dimensions.get('window');
const expandedImageWidth = width * 0.96;
const expandedImageHeight = height * 0.78;
const chartSources = {
    pl: require('../../assets/images/tools/bmi/graph-pl.png'),
    en: require('../../assets/images/tools/bmi/graph-en.png')
}
const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));

export default function BMIHelpScreen() {
    const [isChartExpanded, setIsChartExpanded] = useState(false);
    const [zoomScale, setZoomScale] = useState(1);
    const { settings, theme, translate } = useSettings();
    const chartSource = chartSources[settings.language] || chartSources.en;
    const pinchGestureRef = useRef(null);
    const panGestureRef = useRef(null);
    const baseScale = useRef(new Animated.Value(1)).current;
    const pinchScale = useRef(new Animated.Value(1)).current;
    const baseTranslateX = useRef(new Animated.Value(0)).current;
    const baseTranslateY = useRef(new Animated.Value(0)).current;
    const panTranslateX = useRef(new Animated.Value(0)).current;
    const panTranslateY = useRef(new Animated.Value(0)).current;
    const currentScale = useRef(1);
    const currentTranslateX = useRef(0);
    const currentTranslateY = useRef(0);
    const scale = Animated.multiply(baseScale, pinchScale);
    const translateX = Animated.add(baseTranslateX, panTranslateX);
    const translateY = Animated.add(baseTranslateY, panTranslateY);

    const translationBounds = (targetScale) => ({
        x: Math.max(0, (expandedImageWidth * targetScale - width) / 2),
        y: Math.max(0, (expandedImageHeight * targetScale - height) / 2)
    })

    const updateTranslation = (x, y, targetScale = currentScale.current) => {
        const bounds = translationBounds(targetScale);
        const nextX = clamp(x, -bounds.x, bounds.x);
        const nextY = clamp(y, -bounds.y, bounds.y);

        currentTranslateX.current = nextX;
        currentTranslateY.current = nextY;
        baseTranslateX.setValue(nextX);
        baseTranslateY.setValue(nextY);
        panTranslateX.setValue(0);
        panTranslateY.setValue(0);
    }

    const onPinchGestureEvent = Animated.event(
        [{ nativeEvent: { scale: pinchScale } }],
        { useNativeDriver: true }
    )

    const onPanGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: panTranslateX, translationY: panTranslateY } }],
        { useNativeDriver: true }
    )

    const onPinchStateChange = ({ nativeEvent }) => {
        if (nativeEvent.oldState !== State.ACTIVE) return;

        const nextScale = clamp(currentScale.current * nativeEvent.scale, 1, 4);
        currentScale.current = nextScale;
        baseScale.setValue(nextScale);
        pinchScale.setValue(1);
        updateTranslation(currentTranslateX.current, currentTranslateY.current, nextScale);
        setZoomScale(nextScale);
    }

    const onPanStateChange = ({ nativeEvent }) => {
        if (nativeEvent.oldState !== State.ACTIVE) return;

        updateTranslation(
            currentTranslateX.current + nativeEvent.translationX,
            currentTranslateY.current + nativeEvent.translationY
        )
    }

    const closeExpandedChart = () => {
        currentScale.current = 1;
        currentTranslateX.current = 0;
        currentTranslateY.current = 0;
        baseScale.setValue(1);
        pinchScale.setValue(1);
        baseTranslateX.setValue(0);
        baseTranslateY.setValue(0);
        panTranslateX.setValue(0);
        panTranslateY.setValue(0);
        setZoomScale(1);
        setIsChartExpanded(false);
    }

    const styles = {
        mainText: {
            fontFamily: 'Nexa',
            fontSize: 14,
            color: theme.textPrimary,
            lineHeight: 21,
            margin: 20,
            textAlign: 'justify'
        },
        imageButton: {
            alignSelf: 'center',
            borderRadius: 10,
            overflow: 'hidden'
        },
        image: {
            width: width * 0.9,
            height: (width * (814 / 1130)) * 0.9,
            resizeMode: 'contain'
        },
        text: {
            fontFamily: 'Nexa',
            fontSize: 12,
            color: theme.textSecondary,
            textAlign: 'center',
            marginHorizontal: 5,
            marginTop: 8
        },
        overlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        },
        expandedImage: {
            width: expandedImageWidth,
            height: expandedImageHeight,
            resizeMode: 'contain'
        },
        closeIcon: {
            position: 'absolute',
            top: 45,
            right: 20,
            zIndex: 2,
            padding: 8
        },
        zoomHint: {
            position: 'absolute',
            bottom: 35,
            color: '#FFFFFF',
            fontFamily: 'Nexa',
            fontSize: 13,
            opacity: 0.75
        }
    }

    return (
        <Container>
            <Text style={styles.mainText}>{translate('bmiInfo')}</Text>
            <TouchableOpacity
                style={styles.imageButton}
                activeOpacity={0.85}
                onPress={() => setIsChartExpanded(true)}
            >
                <Image source={chartSource} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.text}>{translate('bmiChart')}</Text>

            <Modal
                transparent
                visible={isChartExpanded}
                animationType='fade'
                statusBarTranslucent
                onRequestClose={closeExpandedChart}
            >
                <GestureHandlerRootView style={styles.overlay}>
                    <Pressable style={styles.closeIcon} onPress={closeExpandedChart}>
                        <Icon name='close' size={32} color='#FFFFFF' />
                    </Pressable>
                    <PanGestureHandler
                        ref={panGestureRef}
                        enabled={zoomScale > 1}
                        maxPointers={1}
                        simultaneousHandlers={pinchGestureRef}
                        onGestureEvent={onPanGestureEvent}
                        onHandlerStateChange={onPanStateChange}
                    >
                        <Animated.View>
                            <PinchGestureHandler
                                ref={pinchGestureRef}
                                simultaneousHandlers={panGestureRef}
                                onGestureEvent={onPinchGestureEvent}
                                onHandlerStateChange={onPinchStateChange}
                            >
                                <Animated.View
                                    style={{
                                        transform: [
                                            { translateX },
                                            { translateY },
                                            { scale }
                                        ]
                                    }}
                                >
                                    <Animated.Image source={chartSource} style={styles.expandedImage} />
                                </Animated.View>
                            </PinchGestureHandler>
                        </Animated.View>
                    </PanGestureHandler>
                    <Text style={styles.zoomHint}>{translate('pinchToZoom')}</Text>
                </GestureHandlerRootView>
            </Modal>
        </Container>
    )
}