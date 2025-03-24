import React, { useEffect, useRef, useState } from 'react'
import { Box, IconButton, VStack } from '@chakra-ui/react'
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'

interface AudioManagerProps {
  gameStarted: boolean
}

export default function AudioManager({ gameStarted }: AudioManagerProps) {
  const [isMuted, setIsMuted] = useState(false)
  const menuMusicRef = useRef<HTMLAudioElement>(null)
  const gameMusicRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Handle music switching when game state changes
    if (gameStarted) {
      menuMusicRef.current?.pause()
      if (gameMusicRef.current) {
        gameMusicRef.current.currentTime = 0
        gameMusicRef.current.play()
      }
    } else {
      gameMusicRef.current?.pause()
      if (menuMusicRef.current) {
        menuMusicRef.current.currentTime = 0
        menuMusicRef.current.play()
      }
    }
  }, [gameStarted])

  useEffect(() => {
    // Handle mute/unmute
    const handleMute = () => {
      if (menuMusicRef.current) menuMusicRef.current.muted = isMuted
      if (gameMusicRef.current) gameMusicRef.current.muted = isMuted
    }
    handleMute()
  }, [isMuted])

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <Box position="fixed" bottom="20px" right="20px" zIndex={1000}>
      <VStack>
        <IconButton
          aria-label="Toggle music"
          icon={
            <Box className="pixel-icon">
              {isMuted ? '🔇' : '🔊'}
            </Box>
          }
          onClick={toggleMute}
          className="pixel-button"
          size="lg"
        />
        <audio
          ref={menuMusicRef}
          src="/menu-music.mp3"
          loop
          preload="auto"
        />
        <audio
          ref={gameMusicRef}
          src="/game-music.mp3"
          loop
          preload="auto"
        />
      </VStack>
    </Box>
  )
} 