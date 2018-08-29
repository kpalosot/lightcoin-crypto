// let balance = 500.00;

class Account{
  constructor(username){
    this.username = username;
    this.transactions = [];
  }
  get balance(){
    let balance = 0;
    this.transactions.forEach((transaction) => {
      balance += transaction.value;
    });
    return balance;
  }

  addTransaction(transsaction){
    this.transactions.push(transsaction);
  }
}

class Transaction{
  constructor(amount, account){
    this.amount = amount;
    this.account = account;
  }
  commit() {
    // this.account.balance += this.value;
    this.time = new Date();
    if(this.isAllowed()){
      this.account.addTransaction(this);
      return true;
    } else {
      return false;
    }
  }
}

class Withdrawal  extends Transaction {
  get value(){
    return -(this.amount);
  }

  isAllowed(){
    return ((this.account.balance + this.value) > 0);
  }
}

class Deposit extends Transaction {
  get value(){
    return this.amount;
  }

  isAllowed(){
    return true;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();
console.log(myAccount.balance);
console.log('===================');

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();
console.log(myAccount.balance);
console.log('===================');

const t3 = new Withdrawal(50.00, myAccount);
t3.commit();
console.log(myAccount.balance);
console.log('===================');

const t4 = new Withdrawal(50.00, myAccount);
t4.commit();
console.log(myAccount.balance);
console.log('===================');

console.log('Ending Balance:', myAccount.balance);



