import * as Font from "expo-font";
 
export default useFonts = async () =>
  await Font.loadAsync({
    'Mona-Sans Regular': require('../assets/fonts/Mona-Sans Regular.ttf'),
    'Mona-Sans Bold': require('../assets/fonts/Mona-Sans Bold.ttf'),
  });