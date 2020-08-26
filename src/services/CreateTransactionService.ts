import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income'| 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // TODO
    // validar se o valor da transaction de outcome é maior do que o total
    const { total } = this.transactionsRepository.getBalance();

    if (type === "outcome" && total < value) {
      throw new Error('You do not have enough balance');
    }

    // é preciso utilizar o repositório pra criar uma nova transaction
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    });

    return transaction;
  }
}

export default CreateTransactionService;
