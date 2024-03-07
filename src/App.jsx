import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
	const dispatcher = useDispatch();

	const cash = useSelector(({ cashReducer }) => cashReducer.cash);
	const isLoggedIn = useSelector(({ customerReducer }) => customerReducer.isLoggedIn);
	const customer = useSelector(({ customerReducer }) => customerReducer.customer);

	const [addAmount, setAddAmount] = useState("");
	const [getAmount, setGetAmount] = useState("");

	const addTransaction = (transaction) => {
		if (!isLoggedIn) return;

		dispatcher({
			type: "ADD TRANSACTION",
			payload: transaction,
		});
	};

	const addCash = (amount) => {
		if (isLoggedIn === false) return alert("You should login before performing any operations");

		dispatcher({
			type: "ADD CASH",
			payload: amount,
		});
	};

	const getCash = (amount) => {
		if (isLoggedIn === false) return alert("You should login before performing any operations");

		dispatcher({
			type: "GET CASH",
			payload: amount,
		});
	};

	return (
		<div>
			{/*App*/}
			{isLoggedIn ? "Logged in" : "Logged out"}

			<p>{customer.name && `Logged in as ${customer.name}`}</p>

			<div>
				{/*Container*/}

				<h1>Redux Pro</h1>

				<h2>Bank account: ${cash}.00</h2>

				<form
					onSubmit={(e) => {
						e.preventDefault();

						setAddAmount("");
						addCash(Number(addAmount));

						setTimeout(() => {
							addTransaction({
								id: customer.transactions.length,
								cashRecevied: addAmount,
								cashTransfered: getAmount,
								customer: customer.name,
								transactionMadeOn: new Date(),
							});
						}, 500);
					}}
				>
					<input value={addAmount} onChange={(e) => setAddAmount(e.target.value)} />
					<button>Add cash</button>
				</form>

				<form
					onSubmit={(e) => {
						e.preventDefault();

						setGetAmount("");
						getCash(Number(getAmount));
						setTimeout(() => {
							addTransaction({
								id: customer.transactions.length,
								cashRecevied: addAmount,
								cashTransfered: getAmount,
								customer: customer.name,
								transactionMadeOn: new Date(),
							});
						}, 500);
					}}
				>
					<input value={getAmount} onChange={(e) => setGetAmount(e.target.value)} />
					<button>Get cash</button>
				</form>

				<button
					onClick={() => {
						dispatcher({
							type: isLoggedIn === false ? "LOGIN" : "LOGOUT",
						});
					}}
				>
					{isLoggedIn === false ? "Login" : "Logout"}
				</button>
			</div>

			<div>
				<h1>Transactions</h1>
				{customer.transactions.length > 0 ? (
					<ul>
						{customer.transactions.map((transaction) => (
							<li key={transaction.id}>
								<p>Customer: {transaction.customer}</p>
								<p>Received: ${transaction.cashRecevied}.00</p>
								<p>Transfered: ${transaction.cashTransfered}.00</p>
								<p>Date: {transaction.transactionMadeOn.toLocaleString()}</p>
							</li>
						))}
					</ul>
				) : (
					<p>No transactions</p>
				)}
			</div>
		</div>
	);
}
