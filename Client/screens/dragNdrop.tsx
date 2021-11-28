import React, { useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';

import { StatusBar } from 'expo-status-bar';

import {
    Avatar,
    WelcomeImage,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    InnerContainer,
    WelcomeContainer,
    ButtonText,
    Line,
    Drax
} from '../components/styles';


// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from '../components/CredentialsContext';

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'


import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;










const gestureRootViewStyle = { flex: 1 };
const draggableItemList = [
    {
        "id": 1,
        "name": "A",
        "background_color": "red"
    },
    {
        "id": 2,
        "name": "B",
        "background_color": "pink"
    },
    {
        "id": 3,
        "name": "C",
        "background_color": "orange"

    },
    {
        "id": 4,
        "name": "D",
        "background_color": "#aaaaff"
    },
    {
        "id": 5,
        "name": "E",
        "background_color": "blue"
    },
    {
        "id": 6,
        "name": "F",
        "background_color": "green"
    },
    {
        "id": 7,
        "name": "G",
        "background_color": "brown"

    },
    {
        "id": 8,
        "name": "H",
        "background_color": "#aaaaff"
    },
    {
        "id": 9,
        "name": "I",
        "background_color": "red"
    },
    {
        "id": 10,
        "name": "J",
        "background_color": "pink"
    },
    {
        "id": 11,
        "name": "K",
        "background_color": "orange"

    },
    {
        "id": 12,
        "name": "L",
        "background_color": "#aaaaff"
    }

];
const FirstReceivingItemList = [
    {
        "id": 13,
        "name": "M",
        "background_color": '#ffaaff'
    },
    {
        "id": 14,
        "name": "N",
        "background_color": '#ffaaff'
    },
    {
        "id": 15,
        "name": "O",
        "background_color": '#ffaaff'
    },
    {
        "id": 16,
        "name": "P",
        "background_color": '#ffaaff'
    }
];





const dragNdrop = () => {
    // credentials context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    const { name, email, photoUrl } = storedCredentials;
    const [receivingItemList, setReceivedItemList] = React.useState(FirstReceivingItemList);
    const [dragItemMiddleList, setDragItemListMiddle] = React.useState(draggableItemList);

    const AvatarImg = photoUrl ? { uri: photoUrl } : require('../assets/img/img1.png');

    const clearLogin = () => {
      AsyncStorage.removeItem('natureCribCredentials')
          .then(() => {
              setStoredCredentials("");
          })
          .catch((error) => console.log(error));
    };

    const DragUIComponent = ({ item, index }) => {
        return (
            <DraxView
                style={[Drax.centeredContent, Drax.draggableBox, { backgroundColor: item.background_color }]}
                draggingStyle={Drax.dragging}
                dragReleasedStyle={Drax.dragging}
                hoverDraggingStyle={Drax.hoverDragging}
                dragPayload={index}
                longPressDelay={150}
                key={index}
            >
                <Text style={Drax.textStyle}>{item.name}</Text>
            </DraxView>
        );
    }

    const ReceivingZoneUIComponent = ({ item, index }) => {
        return (
            <DraxView
                style={[Drax.centeredContent, Drax.receivingZone, { backgroundColor: item.background_color }]}
                receivingStyle={Drax.receiving}
                renderContent={({ viewState }) => {
                    const receivingDrag = viewState && viewState.receivingDrag;
                    const payload = receivingDrag && receivingDrag.payload;
                    return (
                        <View>
                            <Text style={Drax.textStyle}>{item.name}</Text>
                        </View>
                    );
                }}
                key={index}
                onReceiveDragDrop={(event) => {
                    let selected_item = dragItemMiddleList[event.dragged.payload];
                    console.log('onReceiveDragDrop::index', selected_item, index);
                    console.log('onReceiveDragDrop :: payload', event.dragged.payload);
                    let newReceivingItemList = [...receivingItemList];
                    console.log('onReceiveDragDrop :: newReceivingItemList', newReceivingItemList);
                    newReceivingItemList[index] = selected_item;
                    setReceivedItemList(newReceivingItemList);

                    let newDragItemMiddleList = [...dragItemMiddleList];
                    console.log('onReceiveDragDrop :: newDragItemMiddleList 1', newDragItemMiddleList);
                    newDragItemMiddleList[event.dragged.payload] = receivingItemList[index];
                    console.log('onReceiveDragDrop :: newDragItemMiddleList 2', newDragItemMiddleList);
                    setDragItemListMiddle(newDragItemMiddleList);
                    console.log(`received ${event.dragged.payload}`);
                }}
                onReceiveDragEnter={({ dragged: { payload } }) => {
                    console.log(`hello ${payload}`);
                }}
                onReceiveDragExit={({ dragged: { payload } }) => {
                    console.log(`goodbye ${payload}`);
                }}
            />
        );
    }

    const FlatListItemSeparator = () => {
        return (<View style={Drax.itemSeparator} />);
    }

    const { width } = useWindowDimensions();

    return (
        <GestureHandlerRootView
            style={gestureRootViewStyle}>
            <View>
                <Text style={Drax.headerStyle}>{'Drag drop and swap between lists'}</Text>
            </View>
            <DraxProvider>
                <View style={Drax.container}>
                    <View style={Drax.receivingContainer}>
                        {receivingItemList.map((item, index) => ReceivingZoneUIComponent({ item, index }))}
                    </View>
                    <View style={Drax.draxListContainer}>
                        <DraxList
                            data={dragItemMiddleList}
                            renderItemContent={DragUIComponent}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={4}
                            ItemSeparatorComponent={FlatListItemSeparator}
                            scrollEnabled={true}
                        />

                        <View style={Drax.container}>
                            <DraxView
                                style={Drax.draggable}
                                onDragStart={() => {
                                    console.log('start drag');
                                }}
                                payload="world"
                            />
                            <DraxView
                                style={Drax.receiver}
                                onReceiveDragEnter={({ dragged: { payload } }) => {
                                    console.log(`hello ${payload}`);
                                }}
                                onReceiveDragExit={({ dragged: { payload } }) => {
                                    console.log(`goodbye ${payload}`);
                                }}
                                onReceiveDragDrop={({ dragged: { payload } }) => {
                                    console.log(`received ${payload}`);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </DraxProvider>
        </GestureHandlerRootView>
    );



};



export default dragNdrop;