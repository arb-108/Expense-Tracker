const form = document.getElementById("form_i");
const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
let up_id;
let up_bool=false;
let state = {
    earning: 0,
    expense: 0,
    net: 0,
    transactions: [],
};
const updateRecord=(id)=>{
    console.log(`${id} uptdate ke liye`);
    const index=state.transactions.findIndex(element=>element.id==id);
    desc.value=state.transactions[index].text;
    amount.value=state.transactions[index].amount;
    up_bool=true;
    up_id=index;
}
const deleteRecord=(id)=>{
   const index=state.transactions.findIndex(element=>element.id==id);
   console.log(index);
   state.transactions.splice(index,1);
    renderTransaction(state.transactions);
}
const showlower=(id)=>{
    const selectedTrans=document.getElementById(id);
    const lowerinThat=selectedTrans.querySelector(".lower");
    lowerinThat.classList.toggle('showlower');
}
const renderTransaction = (transactions) => {
    const tr_sec = document.getElementById("Transactions");
    const remainEl = document.getElementById("remainAmount");
    const earnEl = document.getElementById("earnP");
    const expenseEl = document.getElementById("expenseP");

    tr_sec.innerHTML = "";
    const htmltrans = (ele) => {
        console.log(`id=${ele.id}`);
        const isCredit = ele.type == "credit" ? true : false;
        const sign = isCredit ? "+" : "-";
        const M_sign = isCredit ? "C" : "D";
        return  `<div class="transaction" id="${ele.id}">
    <div class="content" onclick="showlower(${ele.id})">

    <div class="left">
        <p>${ele.text}</p>
        <p>${sign}${ele.amount}</p>
    </div>
        <div class="status ${isCredit ? "credit" : "debit"}">${M_sign}</div>
    </div>
    <div class="lower">
        <i class="fa-solid fa-pen-to-square" onclick=(updateRecord(${ele.id})) ></i>
        <i class="fa-solid fa-trash" onclick=(deleteRecord(${ele.id}))></i>
    </div>
</div>`;
    };
    state.earning = 0;
    state.expense = 0;
    state.net = 0;
    transactions.forEach((element) => {
        // tr_sec.innerHTML +=htmltrans(element);
        tr_sec.insertAdjacentHTML("afterbegin", htmltrans(element));
        if (element.type == "credit") {
            state.earning += element.amount;
        } else {
            state.expense += element.amount;
        }
    });
    state.net = state.earning - state.expense;
    console.log(`earn:${state.earning}`);
    console.log(`expense:${state.expense}`);
    console.log(`net:${state.net}`);

    remainEl.innerText = `${state.net}`;
    if(state.net<0){
        remainEl.style.color="red";
    }else{
        remainEl.style.color="white";
    }
    earnEl.innerText = `$${state.earning}`;
    expenseEl.innerText = `$${state.expense}`;
};
const formsubmit = (e) => {
    e.preventDefault();
    console.log(e.submitter.id);
    const isEarn = e.submitter.id == "earning" ? true : false;
    console.log(isEarn);
    const formdata = new FormData(form);
    const data = {};
    formdata.forEach((value, key) => {
        data[key] = value;
    });
    console.log(data);
    const { description, amountadd } = data;
    const transaction = {
        id: Math.floor(Math.random() * (10000 - 100)) + 100,
        text: description,
        amount: +amountadd,
        type: isEarn ? "credit" : "debit",
    };
    if(up_bool){
        state.transactions[up_id].text=transaction.text;
        state.transactions[up_id].amount=transaction.amount;
        state.transactions[up_id].type=transaction.type;
        up_bool=false;
    }else{

        state.transactions.push(transaction);
    }
    console.log({ state });
    renderTransaction(state.transactions);
    clearfocus();
};
form.addEventListener("submit", formsubmit);
const clearfocus = () => {
    
    desc.value = "";
    amount.value = "";
    desc.focus();
};

