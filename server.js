// const express = require('express');
// const { createServer } = require('vite');

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // You can set this to a specific origin if needed
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors());


// Proxy to Vite dev server
app.use(
  '/',
  createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
    ws: true, // Proxy websockets
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
  })
);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for the 'stateChanged' event
  socket.on('stateChanged', (state) => {
    console.log('State changed:', state);
    socket.broadcast.emit('stateChanged',state)
    // Handle state change or broadcast the event to other clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3001, () => {
  console.log('Listening on *:3001');
});