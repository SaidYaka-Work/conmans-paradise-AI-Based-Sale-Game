import { Box, Heading, Text, Image, VStack } from '@chakra-ui/react'

const Header = () => {
  return (
    <Box textAlign="center" py={8} className="start-screen" width="100%">
      <VStack spacing={8}>
        <Image
          src="/logo.png"
          alt="Conman's Paradise"
          className="pixel-character"
          width="128px"
          height="128px"
          fallbackSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAE5SURBVHic7d2xTQNBFEbRb40LoBFKoAGqoBAaoQRaoAIKIHLkwDghsov1vHvOkSz9I43f3eRJAgAAAAAAAAAAAAAAAADQxXHvA2zsJslpkockd0leknwmeU3y9vP7LTxO8pzkfZLvSX5+f76SfEzyNMlh6f02dpjkPcn5j/M/J3nMxR+Cq3NI8pJ/X/55kqeNz7SZuyQ/uXz55yQPWx9sK8f8/Z9/0eUvvwFOuXz5b0nu1z7Ylm5z+QbcL3+yrR3z+3Xw0uWfcwVvAf/jcPH3XP4GXOXlx/IbcLf3AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBr8wvz+i8YPZqXjwAAAABJRU5ErkJggg=="
        />
        <Heading as="h1" size="2xl" className="game-title" mb={4}>
          Conman's Paradise
        </Heading>
        <Box className="pixel-box" p={6} maxW="600px">
          <Text fontSize="lg" className="pixel-text">
            Welcome to the wackiest marketplace in the multiverse! Use your wit and persuasion skills to make successful deals with the most bizarre customers you'll ever meet.
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}

export default Header 