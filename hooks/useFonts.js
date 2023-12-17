import * as Font from "expo-font";
 
export default useFonts = async () =>
  await Font.loadAsync({
    'msr': require('../assets/fonts/Mona-Sans-Regular.ttf'),
    'msb': require('../assets/fonts/Mona-Sans-Bold.ttf'),
  });