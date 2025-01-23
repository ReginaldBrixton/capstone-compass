'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Button,
  CircularProgress,
  Divider
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

export default function SupervisorMessages() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/supervisor/students');
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchStudents();
    }
  }, [session]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedStudent) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/api/messages/${selectedStudent.id}`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Set up SSE for real-time messages
    if (selectedStudent) {
      const eventSource = new EventSource(`/api/messages/sse/${selectedStudent.id}`);
      
      eventSource.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        setMessages(prev => [...prev, newMessage]);
      };

      return () => {
        eventSource.close();
      };
    }
  }, [selectedStudent]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedStudent) return;

    try {
      setSending(true);
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientId: selectedStudent.id,
          content: newMessage,
        }),
      });

      if (response.ok) {
        const sentMessage = await response.json();
        setMessages(prev => [...prev, sentMessage]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '70vh', overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Students
            </Typography>
            <List>
              {students.map((student) => (
                <ListItem
                  key={student.id}
                  button
                  selected={selectedStudent?.id === student.id}
                  onClick={() => setSelectedStudent(student)}
                >
                  <ListItemAvatar>
                    <Avatar>{student.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={student.name}
                    secondary={student.email}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '70vh', display: 'flex', flexDirection: 'column' }}>
            {selectedStudent ? (
              <>
                <Typography variant="h6" gutterBottom>
                  Conversation with {selectedStudent.name}
                </Typography>
                <Divider />
                <Box sx={{ flexGrow: 1, overflow: 'auto', my: 2 }}>
                  {messages.map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        display: 'flex',
                        justifyContent: message.senderId === session?.user?.id ? 'flex-end' : 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          maxWidth: '70%',
                          bgcolor: message.senderId === session?.user?.id ? 'primary.light' : 'grey.100',
                          color: message.senderId === session?.user?.id ? 'white' : 'inherit',
                        }}
                      >
                        <Typography variant="body1">{message.content}</Typography>
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                          {new Date(message.timestamp).toLocaleString()}
                        </Typography>
                      </Paper>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleSendMessage}
                    disabled={sending || !newMessage.trim()}
                  >
                    Send
                  </Button>
                </Box>
              </>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Typography variant="h6" color="textSecondary">
                  Select a student to start messaging
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}