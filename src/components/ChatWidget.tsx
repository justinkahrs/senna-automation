"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Fab,
  Paper,
  Fade,
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";
import {
  ChatBubble as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const POLL_INTERVAL = 3000;
const STORAGE_KEY_SESSION = "tg_widget_session_id";
const STORAGE_KEY_CONSENT = "tg_widget_consented";
const STORAGE_KEY_NAME = "tg_widget_display_name";

type Message = {
  id: string;
  direction: "to_telegram" | "from_telegram";
  text: string;
  created_at: string;
};

export default function ChatWidget() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<string | null>(null);
  const [hasConsent, setHasConsent] = useState(false);

  // UI States
  const [inputName, setInputName] = useState("");
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [chatEnded, setChatEnded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<string | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load state from local storage on mount
  useEffect(() => {
    const storedSession = localStorage.getItem(STORAGE_KEY_SESSION);
    const storedConsent = localStorage.getItem(STORAGE_KEY_CONSENT);
    const storedName = localStorage.getItem(STORAGE_KEY_NAME);

    if (storedSession) setSession(storedSession);
    if (storedConsent === "true") setHasConsent(true);
    if (storedName) {
      setInputName(storedName);
    }
    setInitializing(false);
  }, []);

  const fetchMessages = useCallback(
    async (isInitial = false) => {
      if (!session) return;
      try {
        const url = new URL("/api/chat/poll", window.location.href);
        url.searchParams.append("session_id", session);
        if (cursorRef.current && !isInitial) {
          url.searchParams.append("cursor", cursorRef.current);
        }

        const res = await fetch(url.toString());
        if (res.ok) {
          const result = await res.json();
          if (result.messages && result.messages.length > 0) {
            // Provide safe default for sort
            const newMessages = result.messages;
            setMessages((prev) => {
              // Dedupe based on ID just in case
              const existingIds = new Set(prev.map((m) => m.id));
              const uniqueNew = newMessages.filter(
                (m: Message) => !existingIds.has(m.id)
              );
              // Merge and sort
              const combined = [...prev, ...uniqueNew].sort(
                (a, b) =>
                  new Date(a.created_at).getTime() -
                  new Date(b.created_at).getTime()
              );
              return combined;
            });

            if (result.nextCursor) {
              cursorRef.current = result.nextCursor;
            }
          }
        }
      } catch (err) {
        console.error("Polling error", err);
      }
    },
    [session]
  );

  // Poll for messages when chat is open and we have a session + consent
  useEffect(() => {
    if (isOpen && session && hasConsent) {
      fetchMessages(true); // Initial fetch
      pollIntervalRef.current = setInterval(
        () => fetchMessages(),
        POLL_INTERVAL
      );
    } else {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    }

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [isOpen, session, hasConsent, fetchMessages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleStartSession = async () => {
    if (!inputName.trim()) return;
    setLoading(true);

    // Generate new session ID if one doesn't exist
    const currentSession = session || crypto.randomUUID();

    try {
      const res = await fetch("/api/chat/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: currentSession,
          display_name: inputName,
          consented: true,
        }),
      });

      if (res.ok) {
        await res.json();
        // Persist everything
        localStorage.setItem(STORAGE_KEY_SESSION, currentSession);
        localStorage.setItem(STORAGE_KEY_CONSENT, "true");
        localStorage.setItem(STORAGE_KEY_NAME, inputName);

        setSession(currentSession);
        setHasConsent(true);
      } else {
        alert("Failed to start chat. Please try again.");
      }
    } catch (err) {
      console.error("Start error", err);
      alert("Error starting chat.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    // Clear storage
    localStorage.removeItem(STORAGE_KEY_SESSION);
    // Keep name and consent? Maybe keep name but require consent again to be safe?
    // Requirements say "clear out old thread ID".
    // Let's do a soft reset: keep name, but clear session and consent.
    localStorage.removeItem(STORAGE_KEY_CONSENT);

    // Reset state
    setSession(null);
    setHasConsent(false);
    setMessages([]);
    setChatEnded(false);
    cursorRef.current = null;
    setInputText("");
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !session) return;
    const textToSend = inputText.trim();
    setInputText(""); // Clear immediately for UX
    setSending(true);

    try {
      const res = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: session,
          text: textToSend,
        }),
      });

      if (res.status === 410) {
        setChatEnded(true);
        return;
      }

      if (res.ok) {
        const result = await res.json();
        // Add to local state immediately if valid
        if (result.message) {
          setMessages((prev) => [...prev, result.message]);
          cursorRef.current = result.message.created_at;
        }
      } else {
        // Restore text if failed
        setInputText(textToSend);
        alert("Failed to send.");
      }
    } catch (err) {
      console.error("Send error", err);
      setInputText(textToSend);
    } finally {
      setSending(false);
    }
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  if (initializing) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <Fade in={isOpen}>
        <Paper
          elevation={4}
          sx={{
            marginBottom: 2,
            width: 350,
            height: 500,
            maxHeight: "80vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Live Chat
            </Typography>
            <IconButton
              size="small"
              onClick={toggleOpen}
              sx={{ color: "inherit" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Content */}
          <Box
            sx={{
              flexGrow: 1,
              overflow: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {!hasConsent ? (
              <Stack spacing={3} justifyContent="center" height="100%">
                <Typography variant="body1" align="center">
                  To start a chat, please introduce yourself.
                </Typography>
                <TextField
                  label="Full Name"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  fullWidth
                />

                <Box sx={{ p: 2, bgcolor: "action.hover", borderRadius: 1 }}>
                  <Typography
                    variant="body2"
                    color="error"
                    gutterBottom
                    fontWeight="bold"
                  >
                    Disclaimer:
                  </Typography>
                  <Typography variant="body2">
                    This is not AI! Operating hours are Monday-Friday 9am-5pm
                    ET, but we will do our best to respond outside of those
                    hours.
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  onClick={handleStartSession}
                  disabled={!inputName.trim() || loading}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    "I Understand & Start Chat"
                  )}
                </Button>
              </Stack>
            ) : (
              // Chat View
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                {messages.length === 0 && (
                  <Typography
                    variant="caption"
                    align="center"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                  >
                    Start the conversation below...
                  </Typography>
                )}
                {messages.map((msg) => {
                  const isMe = msg.direction === "to_telegram";
                  return (
                    <Box
                      key={msg.id}
                      sx={{
                        alignSelf: isMe ? "flex-end" : "flex-start",
                        maxWidth: "80%",
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: isMe ? "primary.main" : "grey.200",
                        color: isMe ? "primary.contrastText" : "text.primary",
                        boxShadow: 1,
                      }}
                    >
                      <Typography variant="body2">{msg.text}</Typography>
                    </Box>
                  );
                })}
                <div ref={messagesEndRef} />
              </Stack>
            )}
          </Box>

          {/* Footer Input */}
          {hasConsent && (
            <Box
              sx={{
                p: 2,
                borderTop: 1,
                borderColor: "divider",
                display: "flex",
                gap: 1,
                flexDirection: chatEnded ? "column" : "row",
              }}
            >
              {chatEnded ? (
                <Box sx={{ textAlign: "center", width: "100%" }}>
                  <Typography variant="body2" color="error" gutterBottom>
                    The chat has been ended by the agent.
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleResetChat}
                  >
                    Start New Chat
                  </Button>
                </Box>
              ) : (
                <>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    disabled={sending}
                  />
                  <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || sending}
                  >
                    {sending ? <CircularProgress size={24} /> : <SendIcon />}
                  </IconButton>
                </>
              )}
            </Box>
          )}
        </Paper>
      </Fade>

      <Fab color="primary" aria-label="chat" onClick={toggleOpen}>
        <ChatIcon />
      </Fab>
    </Box>
  );
}
