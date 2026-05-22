import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client');

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private client: any;

  constructor() {
    this.client = new PrismaClient();
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }

  get user() { return this.client.user; }
  get category() { return this.client.category; }
  get expense() { return this.client.expense; }
}
