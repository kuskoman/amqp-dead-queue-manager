#!/usr/bin/env ts-node

import 'dotenv/config';
import { connect } from 'amqplib';

const setupQueue = async () => {
  const connection = await connect(process.env.QUEUE_URL!);
  const channel = await connection.createChannel();
  await channel.assertQueue('dead-letters-queue', { durable: true });
  await channel.close();
  await connection.close();
};

setupQueue();
