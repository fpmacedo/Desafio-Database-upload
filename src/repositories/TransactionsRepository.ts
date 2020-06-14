import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

// interface CreateTransactionDTO {
//   title: string;
//   value: number;
//   type: 'income' | 'outcome';
//   category: string;
// }

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // TODO
    const transactions = await this.find();

    const { income, outcome } = transactions.reduce(
      (accumulator, transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += Number(transaction.value);
            console.log(accumulator.income);
            break;
          case 'outcome':
            accumulator.outcome += Number(transaction.value);
            console.log(accumulator.outcome);
            break;
          default:
            break;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { total, income, outcome };
  }
}

export default TransactionsRepository;
