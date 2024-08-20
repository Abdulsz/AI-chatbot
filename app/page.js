'use client'
import { Content } from "next/font/google";
import Image from "next/image";
import {useState} from 'react'
import {Box, Button, Stack, TextField} from '@mui/material'




export default function Home() {
  const [messages, setMessages] = useState([{
    role:'assistant',
    content: `Hi! I'm Augustana College's Computer Science eAdvisor Support Agent, how can I assist you today? `
  },
])

  const [message, setMessage] = useState('')


  const sendMessage = async()=>{
    setMessage('')
    setMessages((messages)=>[
      ...messages,
      {role: "user", content : message},
      {role: "assistant", content: ''},

    ])

    const response = fetch('/api/chat',{
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, {role:'user', content:message}]),
    }).then(async (res) => {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      let result = ''
      return reader.read().then(function processText({done, value}){
        if(done){
          return result
        }
        const text = decoder.decode(value || new Int8Array(), {stream:true})
        setMessages((messages)=>{
          let lastMessage = messages[messages.length-1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text,
            },
          ]
        })
        return reader.read().then(processText)
      })
    })
  }

  return (
    <Box
      sx={{
        backgroundImage: `url('https://img.freepik.com/free-vector/winter-light-blue-gradient-background_53876-120755.jpg?w=996&t=st=1724122027~exp=1724122627~hmac=5a5dcd19068e9a14ebea15647eab0fa6dfdb02524efb25b9e06b88cee14b686f')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Stack
        direction="column"
        width="600px"
        height="700px"
        bgcolor="#3D314A"
        p={2}
        spacing={3}
        borderRadius={7}
        boxShadow={3}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="1005%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
              <Box
                bgcolor={message.role === "assistant" ? "#1A1423" : "#684756"}
                color="#bdbdbd"
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#684756",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#96705B",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#bdbdbd",
              },
              "& .MuiInputBase-input": {
                color: "#bdbdbd",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#bdbdbd",
              },
            }}
            label="message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button
            sx={{
              backgroundColor: "#96705B",
              color: "#bdbdbd",
              "&:hover": {
                backgroundColor: "#684756",
              },
              padding: "10px 20px",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
            variant="contained"
            onClick={sendMessage}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
