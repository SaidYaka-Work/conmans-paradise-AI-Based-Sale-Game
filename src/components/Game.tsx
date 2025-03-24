import { useState } from 'react'
import {
  Box,
  VStack,
  Text,
  Button,
  useToast,
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Input,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Textarea,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import OpenAI from 'openai'
import Character from './Character'
import ChatInterface from './ChatInterface'
import AudioManager from './AudioManager'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

export interface GameState {
  money: number
  currentCharacter: Character | null
  gameStarted: boolean
  currentItem: Item | null
  messages: Array<{ text: string; sender: 'player' | 'character' }>
  isProcessing: boolean
}

export interface Character {
  name: string
  personality: string
  difficulty: number
  money: number
  description: string
  quirk: string
  catchphrase: string
}

export interface Item {
  name: string
  basePrice: number
  description: string
}

const INITIAL_MONEY = 1000

const Game = () => {
  const [gameState, setGameState] = useState<GameState>({
    money: INITIAL_MONEY,
    currentCharacter: null,
    gameStarted: false,
    currentItem: null,
    messages: [],
    isProcessing: false,
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [itemForm, setItemForm] = useState({
    name: '',
    basePrice: 100,
    description: '',
  })
  const toast = useToast()

  const startGame = () => {
    generateNewCharacter()
    setGameState(prev => ({ ...prev, gameStarted: true }))
  }

  const generateNewCharacter = async () => {
    setIsGenerating(true)
    try {
      const prompt = `Generate a funny and absurd character for a negotiation game. The character should be unique and entertaining. Return the response in this exact JSON format:
{
  "name": "a funny and creative name",
  "personality": "a one-line description of their absurd personality",
  "quirk": "a strange habit or behavior they have during negotiations",
  "catchphrase": "their signature saying",
  "description": "a brief description of their appearance or demeanor"
}
Make it as creative and humorous as possible. The personality and quirk should be completely different from any typical business person.`

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a creative writer specializing in generating absurd and humorous characters. Make the characters as unique and entertaining as possible."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 1.2,
        response_format: { type: "json_object" }
      })

      const characterData = JSON.parse(response.choices[0].message.content || "{}")
      
      const mockCharacter: Character = {
        ...characterData,
        difficulty: Math.floor(Math.random() * 10) + 1,
        money: Math.floor(Math.random() * 5000) + 500,
      }
      
      setGameState(prev => ({ ...prev, currentCharacter: mockCharacter }))
      setItemForm({
        name: '',
        basePrice: 100,
        description: '',
      })
    } catch (error) {
      console.error('Error generating character:', error)
      toast({
        title: "Error",
        description: "Failed to generate a new character. Using a backup character instead.",
        status: "error"
      })
      const fallbackCharacter: Character = {
        name: "Error McErrorface",
        personality: "Glitchy and confused",
        difficulty: 5,
        money: 1000,
        description: "A backup character who showed up when the generator was on coffee break",
        quirk: "Apologizes for being a fallback character",
        catchphrase: "Have you tried turning it off and on again?"
      }
      setGameState(prev => ({ ...prev, currentCharacter: fallbackCharacter }))
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCreateItem = () => {
    if (!itemForm.name || !itemForm.description) {
      toast({
        title: "Missing Information",
        description: "Please provide both a name and description for your item",
        status: "warning"
      })
      return
    }

    const newItem: Item = {
      name: itemForm.name,
      basePrice: itemForm.basePrice,
      description: itemForm.description,
    }

    setGameState(prev => ({ ...prev, currentItem: newItem }))
  }

  const handleDealComplete = (success: boolean, amount: number) => {
    if (success) {
      setGameState(prev => ({
        ...prev,
        money: prev.money + amount,
        currentItem: null
      }))
      toast({
        title: "Deal successful!",
        description: `You earned $${amount}! The customer dances away happily...`,
        status: "success"
      })
      generateNewCharacter()
    } else {
      toast({
        title: "Deal failed!",
        description: "The customer leaves while doing a disappointed moonwalk...",
        status: "error"
      })
      setGameState(prev => ({ ...prev, currentItem: null }))
      generateNewCharacter()
    }
  }

  const handleSendMessage = (message: string) => {
    setGameState(prev => ({
      ...prev,
      messages: [...prev.messages, { text: message, sender: 'player' }],
      isProcessing: true,
    }))
  }

  return (
    <Box maxW="1800px" mx="auto" w="100%" h="100vh" p={4}>
      <AudioManager gameStarted={gameState.gameStarted} />
      {!gameState.gameStarted ? (
        <VStack spacing={8} className="start-screen">
          <Box className="pixel-box" p={6} maxW="800px">
            <VStack spacing={6}>
              <Text fontSize="xl" className="pixel-text" textAlign="center">
                🎮 Ready to become the ultimate deal-maker? 🎮
              </Text>
              <Box className="pixel-box" p={4}>
                <VStack spacing={4}>
                  <Text className="pixel-text" fontSize="md">
                    💰 Start with ${INITIAL_MONEY} in your pocket
                  </Text>
                  <Text className="pixel-text" fontSize="md">
                    🎭 Meet bizarre characters with unique personalities
                  </Text>
                  <Text className="pixel-text" fontSize="md">
                    🎪 Create and sell the most absurd items imaginable
                  </Text>
                </VStack>
              </Box>
              <Button 
                size="lg" 
                onClick={startGame}
                isLoading={isGenerating}
                loadingText="Summoning Character..."
                className="pixel-button"
                height="auto"
                py={6}
                px={12}
              >
                Start Your Adventure!
              </Button>
            </VStack>
          </Box>
        </VStack>
      ) : (
        <SimpleGrid 
          columns={{ base: 1, lg: 3 }} 
          spacing={6} 
          alignItems="start"
          templateColumns={{ base: "1fr", lg: "300px 1fr 300px" }}
          w="100%"
        >
          {/* Left Side - Player Status */}
          <Box position="sticky" top="20px">
            <Card className="pixel-box">
              <CardHeader>
                <Heading size="md" color="green.300" textShadow="2px 2px #000">
                  Your Status
                </Heading>
              </CardHeader>
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Text className="money-counter">Money in your pocket: ${gameState.money}</Text>
                  {gameState.currentItem && (
                    <Box className="pixel-box" p={4} w="100%">
                      <Heading size="sm" mb={2}>Current Item</Heading>
                      <Text>{gameState.currentItem.name}</Text>
                      <Text fontSize="sm" color="gray.300">{gameState.currentItem.description}</Text>
                      <Text className="money-counter">Base Price: ${gameState.currentItem.basePrice}</Text>
                    </Box>
                  )}
                  {!gameState.currentItem && (
                    <VStack spacing={4} w="100%" className="pixel-box" p={4}>
                      <Heading size="sm">Create Your Item</Heading>
                      <FormControl>
                        <FormLabel>Item Name</FormLabel>
                        <Input
                          value={itemForm.name}
                          onChange={(e) => setItemForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter item name"
                          className="pixel-box"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Base Price ($)</FormLabel>
                        <NumberInput
                          value={itemForm.basePrice}
                          onChange={(_, value) => setItemForm(prev => ({ ...prev, basePrice: value || 100 }))}
                          min={1}
                          max={10000}
                        >
                          <NumberInputField className="pixel-box" />
                        </NumberInput>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                          value={itemForm.description}
                          onChange={(e) => setItemForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe your item (be creative!)"
                          className="pixel-box"
                        />
                      </FormControl>
                      <Button onClick={handleCreateItem} width="100%">
                        Create Item
                      </Button>
                    </VStack>
                  )}
                </VStack>
              </CardBody>
            </Card>
          </Box>

          {/* Middle - Chat Interface */}
          <Box>
            <ChatInterface
              character={gameState.currentCharacter}
              selectedItem={gameState.currentItem}
              onDealComplete={handleDealComplete}
              onSendMessage={handleSendMessage}
              messages={gameState.messages}
              isProcessing={gameState.isProcessing}
            />
          </Box>

          {/* Right Side - Character */}
          <Box position="sticky" top="20px">
            {isGenerating ? (
              <Card className="pixel-box">
                <CardBody>
                  <VStack spacing={4}>
                    <Text className="pixel-text">Generating your next customer...</Text>
                  </VStack>
                </CardBody>
              </Card>
            ) : gameState.currentCharacter && (
              <Character character={gameState.currentCharacter} />
            )}
          </Box>
        </SimpleGrid>
      )}
    </Box>
  )
}

export default Game 