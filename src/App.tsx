import { ChakraProvider, Box, VStack } from '@chakra-ui/react'
import Game from './components/Game'
import Header from './components/Header'

function App() {
  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50" p={4}>
        <VStack spacing={8} maxW="1200px" mx="auto">
          <Header />
          <Game />
        </VStack>
      </Box>
    </ChakraProvider>
  )
}

export default App
