import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: "'Press Start 2P', cursive",
    body: "'Press Start 2P', cursive",
  },
  styles: {
    global: {
      body: {
        bg: '#181818',
        color: '#ffffff',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: "'Press Start 2P', cursive",
        transition: 'all 0.1s',
        textTransform: 'uppercase',
        fontSize: 'sm',
        _focus: {
          boxShadow: 'none',
        },
      },
      variants: {
        pixel: {
          bg: '#4a4a4a',
          border: '4px solid #ffffff',
          borderRadius: '0px',
          color: 'white',
          padding: '20px',
          boxShadow: '4px 4px 0 #000, inset 4px 4px 0 rgba(255, 255, 255, 0.2), inset -4px -4px 0 rgba(0, 0, 0, 0.3)',
          _hover: {
            bg: '#666666',
            transform: 'translateY(-2px)',
            boxShadow: '6px 6px 0 #000, inset 4px 4px 0 rgba(255, 255, 255, 0.2), inset -4px -4px 0 rgba(0, 0, 0, 0.3)',
          },
          _active: {
            bg: '#333333',
            transform: 'translateY(2px)',
            boxShadow: '2px 2px 0 #000, inset 4px 4px 0 rgba(255, 255, 255, 0.2), inset -4px -4px 0 rgba(0, 0, 0, 0.3)',
          },
        },
      },
      defaultProps: {
        variant: 'pixel',
      },
    },
    Card: {
      baseStyle: {
        container: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          borderRadius: '0',
          border: '4px solid #ffffff',
          boxShadow: '8px 8px 0 rgba(0, 0, 0, 0.5), inset 4px 4px 0 rgba(255, 255, 255, 0.1), inset -4px -4px 0 rgba(0, 0, 0, 0.3)',
          color: '#ffffff',
          padding: '16px',
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          backgroundColor: '#000000',
          color: '#00ff00',
          border: '4px solid #ffffff',
          borderRadius: '0',
          boxShadow: 'inset 4px 4px 0 rgba(0, 0, 0, 0.5), 4px 4px 0 #000',
          padding: '16px',
          fontFamily: "'Press Start 2P', cursive",
          fontSize: 'sm',
          _placeholder: {
            color: '#008800',
          },
          _focus: {
            borderColor: '#ffd700',
            boxShadow: 'inset 4px 4px 0 rgba(0, 0, 0, 0.5), 4px 4px 0 #000',
          },
        },
      },
    },
    Textarea: {
      baseStyle: {
        backgroundColor: '#000000',
        color: '#00ff00',
        border: '4px solid #ffffff',
        borderRadius: '0',
        boxShadow: 'inset 4px 4px 0 rgba(0, 0, 0, 0.5), 4px 4px 0 #000',
        padding: '16px',
        fontFamily: "'Press Start 2P', cursive",
        fontSize: 'sm',
        _placeholder: {
          color: '#008800',
        },
        _focus: {
          borderColor: '#ffd700',
          boxShadow: 'inset 4px 4px 0 rgba(0, 0, 0, 0.5), 4px 4px 0 #000',
        },
      },
    },
    FormLabel: {
      baseStyle: {
        color: '#ffd700',
        fontSize: 'xs',
        marginBottom: '4',
        textTransform: 'uppercase',
        textShadow: '2px 2px 0 #000',
      },
    },
    Heading: {
      baseStyle: {
        letterSpacing: '1px',
        lineHeight: '1.5',
        color: '#ffd700',
        textShadow: '4px 4px 0 #000, -4px -4px 0 #000, 4px -4px 0 #000, -4px 4px 0 #000',
        textTransform: 'uppercase',
      },
    },
    Text: {
      baseStyle: {
        letterSpacing: '1px',
        lineHeight: '1.5',
        color: '#ffffff',
        fontSize: 'sm',
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: '0',
        textTransform: 'uppercase',
        fontFamily: "'Press Start 2P', cursive",
        fontSize: 'xs',
        padding: '8px',
        boxShadow: '2px 2px 0 #000',
      },
    },
  },
})

export default theme 