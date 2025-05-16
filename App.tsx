import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {MainStack} from './src/stacks/Main';
import * as Font from 'expo-font';
import { CharacterProvider } from './src/context/CharacterContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App(): React.JSX.Element {
    useEffect(()=>{
         Font.loadAsync({
            'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
            'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
            'DMMono-Medium': require('./assets/fonts/DMMono-Medium.ttf'),
        });
    },[])

    const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
        <CharacterProvider>
          <NavigationContainer>
              <MainStack />
          </NavigationContainer>
        </CharacterProvider>
      </QueryClientProvider>
  );
}

export default App;
