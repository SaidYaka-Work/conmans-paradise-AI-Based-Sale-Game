import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  VStack,
  Badge,
  Box,
  HStack,
  Image,
} from '@chakra-ui/react'
import { Character as CharacterType } from './Game'

interface CharacterProps {
  character: CharacterType
}

const Character = ({ character }: CharacterProps) => {
  // Generate a consistent avatar based on the character's name
  const avatarNumber = Math.abs(character.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 8) + 1

  return (
    <Card className="pixel-box">
      <CardHeader>
        <HStack spacing={4}>
          <Image
            src={`/avatars/character${avatarNumber}.png`}
            alt={character.name}
            className="pixel-character"
            fallbackSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABUSURBVHic7dYxDQAwDAOxwL/nS2YLHjRKyJ7dvZ+ZObe7Y9mZ9wDwBDAJYBLAJIBJAJMAJgFMAphMAIMABgEMAhgEMAhgEMAggEEAgwAGAQwCGJ4XYNUCqTQbWQAAAABJRU5ErkJggg=="
          />
          <Heading size="md" color="purple.300" textShadow="2px 2px #000">
            {character.name}
          </Heading>
        </HStack>
      </CardHeader>
      <CardBody>
        <VStack align="start" spacing={4}>
          <Box className="chat-bubble" color="black">
            <Text fontStyle="italic">"{character.catchphrase}"</Text>
          </Box>
          
          <Box className="pixel-box" p={4} w="100%">
            <Badge variant="pixel" colorScheme="purple" mb={2}>Personality</Badge>
            <Text>{character.personality}</Text>
          </Box>
          
          <Box className="pixel-box" p={4} w="100%">
            <Badge variant="pixel" colorScheme="pink" mb={2}>Special Quirk</Badge>
            <Text>{character.quirk}</Text>
          </Box>

          <Box className="pixel-box" p={4} w="100%">
            <HStack justify="space-between" mb={2}>
              <Text className="money-counter">
                ${character.money}
              </Text>
              <Badge variant="pixel" colorScheme={character.difficulty > 7 ? 'red' : character.difficulty > 4 ? 'yellow' : 'green'}>
                Level {character.difficulty}
              </Badge>
            </HStack>
            <Box className="pixel-progress">
              <Box 
                className="pixel-progress-bar"
                width={`${character.difficulty * 10}%`}
              />
            </Box>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default Character 