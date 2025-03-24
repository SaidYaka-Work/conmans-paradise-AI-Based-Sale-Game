import React, { useState, useRef, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Input,
  Button,
  VStack,
  Text,
  Box,
  useToast,
  Spinner,
  HStack,
} from '@chakra-ui/react'
import { Character, Item } from './Game'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

interface ChatInterfaceProps {
  character: Character | null
  selectedItem: Item | null
  onDealComplete: (success: boolean, amount: number) => void
  onSendMessage: (message: string) => void
  messages: Array<{ text: string; sender: 'player' | 'character' }>
  isProcessing: boolean
}

const ChatInterface = ({
  character,
  selectedItem,
  onDealComplete,
  onSendMessage,
  messages,
  isProcessing,
}: ChatInterfaceProps) => {
  const [inputMessage, setInputMessage] = useState('')
  const [isNegotiating, setIsNegotiating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  // Add a ref for the messages container
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateCharacterResponse = async (
    playerMessage: string,
    character: Character,
    item: Item,
    messageHistory: Array<{ text: string; sender: 'player' | 'character' }>
  ) => {
    try {
      const prompt = `You are playing the role of a character in a humorous negotiation game. Here are your traits:

Name: ${character.name}
Personality: ${character.personality}
Special Quirk: ${character.quirk}
Catchphrase: "${character.catchphrase}"
Available Money: $${character.money}
Difficulty: ${character.difficulty}

The player is trying to sell you this item:
Item Name: ${item.name}
Description: ${item.description}
Base Price: $${item.basePrice}

Previous conversation:
${messageHistory.map(m => `${m.sender === 'player' ? 'Player' : 'You'}: ${m.text}`).join('\n')}

Player's latest message: "${playerMessage}"

Respond in character, incorporating your personality, quirk, and occasionally using your catchphrase. try to keep short and concise unless needed otherwise, but also negotiate the price. You can accept any price you can afford. Your difficulty is ${character.difficulty}, depending on the intelligence of the character you can try to negotiate a better price and leave if you are unhappy

If you decide to accept a price, include "DEAL ACCEPTED:" followed by the price in your response.
If you decide to reject the deal entirely, include "DEAL REJECTED" in your response.

Your response:`

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a quirky character in a humorous negotiation game. Be funny, absurd, and stay in character while negotiating."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 1.2,
        max_tokens: 150
      })

      const aiResponse = response.choices[0].message.content || "Error generating response"
      
      // Check for deal acceptance or rejection
      if (aiResponse.includes("DEAL ACCEPTED:")) {
        const priceMatch = aiResponse.match(/DEAL ACCEPTED:\s*\$?(\d+)/)
        if (priceMatch) {
          const agreedPrice = parseInt(priceMatch[1])
          return {
            message: aiResponse.replace(/DEAL ACCEPTED:\s*\$?\d+/, '').trim(),
            dealComplete: true,
            success: true,
            amount: agreedPrice
          }
        }
      }
      
      if (aiResponse.includes("DEAL REJECTED")) {
        return {
          message: aiResponse.replace("DEAL REJECTED", '').trim(),
          dealComplete: true,
          success: false,
          amount: 0
        }
      }

      return {
        message: aiResponse,
        dealComplete: false,
        success: false,
        amount: 0
      }
    } catch (error) {
      console.error('Error generating response:', error)
      return {
        message: "Oops, I got confused for a moment there... Could you repeat that?",
        dealComplete: false,
        success: false,
        amount: 0
      }
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !character || !selectedItem) return

    // Add player's message
    const newMessages: Array<{ text: string; sender: 'player' | 'character' }> = [...messages, { text: inputMessage, sender: 'player' }]
    onSendMessage(inputMessage)
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await generateCharacterResponse(inputMessage, character, selectedItem, newMessages)
      onSendMessage(response.message)
      
      if (response.dealComplete) {
        setIsNegotiating(false)
        onDealComplete(response.success, response.amount)
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Something went wrong with the character's response",
        status: "error"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const startNegotiation = async () => {
    if (!character || !selectedItem) {
      toast({
        title: "Cannot start negotiation",
        description: "Please select an item first",
        status: "warning"
      })
      return
    }

    setIsNegotiating(true)
    setIsLoading(true)

    try {
      const response = await generateCharacterResponse(
        "Hello, I'd like to sell you something.",
        character,
        selectedItem,
        []
      )
      onSendMessage(response.message)
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Failed to start the negotiation",
        status: "error"
      })
      setIsNegotiating(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="pixel-box chat-container">
      <CardHeader>
        <Heading size="md" color="blue.300" textShadow="2px 2px #000" textAlign="center">
          Negotiation Room
        </Heading>
      </CardHeader>
      <CardBody p={0} flex="1" display="flex" flexDirection="column">
        <VStack 
          spacing={4} 
          align="stretch" 
          flex="1"
          className="chat-messages" 
          p={4}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              className={message.sender === 'player' ? 'chat-bubble player-message' : 'chat-bubble character-message'}
            >
              <Text fontSize="sm" className="pixel-text">{message.text}</Text>
            </Box>
          ))}
          {isLoading && (
            <Box className="chat-bubble character-message">
              <HStack spacing={2}>
                <Box className="loading-dots">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </Box>
                <Text fontSize="sm" className="pixel-text">Thinking</Text>
              </HStack>
            </Box>
          )}
          <Box ref={messagesEndRef} />
        </VStack>
      </CardBody>
      <CardFooter>
        {!isNegotiating ? (
          <Button
            width="100%"
            onClick={startNegotiation}
            isLoading={isLoading}
            loadingText="Starting Negotiation..."
            className="pixel-button"
            _hover={{ transform: 'translateY(-2px)', filter: 'brightness(1.2)' }}
            _active={{ transform: 'translateY(2px)' }}
          >
            Start Negotiation
          </Button>
        ) : (
          <VStack width="100%" spacing={4}>
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              disabled={isLoading}
              className="pixel-box chat-input"
              _placeholder={{ color: 'gray.400' }}
            />
            <Button
              width="100%"
              onClick={handleSendMessage}
              isLoading={isLoading}
              loadingText="Sending..."
              className="pixel-button"
              _hover={{ transform: 'translateY(-2px)', filter: 'brightness(1.2)' }}
              _active={{ transform: 'translateY(2px)' }}
            >
              Send
            </Button>
          </VStack>
        )}
      </CardFooter>
    </Card>
  )
}

export default ChatInterface 