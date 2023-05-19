import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'
import 'dotenv/config'
import { authRoutes } from './routes/auth'
import jwt from '@fastify/jwt'
import { uploadRoutes } from './routes/upload'
import multipart from '@fastify/multipart'
import static_fast from '@fastify/static'
import { resolve } from 'path'
const app = fastify()

app.register(jwt, {
  secret: 'spacetime',
})

app.register(cors, {
  origin: true,
})
app.register(multipart)

app.register(static_fast, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})
app.register(memoriesRoutes)
app.register(uploadRoutes)
app.register(authRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀🚀 HTTP server running on http://localhost:3333')
  })
