#!/usr/bin/env ts-node

import 'dotenv/config';
import { connect } from 'amqplib';

const sendQueueMessages = async () => {
  const connection = await connect(process.env.QUEUE_URL!);
  const channel = await connection.createChannel();
  for (let i = 0; i < 100; i++) {
    channel.sendToQueue('dead-letters-queue', Buffer.from(JSON.stringify({ random: 'body' })));
  }
  await channel.close();
  await connection.close();
};

sendQueueMessages();
