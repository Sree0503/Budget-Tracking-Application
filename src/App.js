import {Button,Stack} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./Components/AddBudgetModal";
import AddExpenseModal from "./Components/AddExpenseModal";
import BudgetCard from "./Components/BudgetCard";
import UncategorizedBudgetCard from "./Components/UncategorizedBudgetCard"
import TotalBudgetCard from "./Components/TotalBudgetCard"
import ViewExpenseModal from "./Components/ViewExpenseModal"
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./Contexts/BudgetContext";


function App(){

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId,setViewExpenseModalBudgetId]=useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(); 
  const {budgets, getBudgetExpenses} = useBudgets()

  function openAddExpenseModal(budgetId){
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }
    
  return(
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={()=>setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>
        <div
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fill, minmax(300px,1fr))",
            gap:"1rem",
            alignItems:"flex-start",
          }}
        >
          {budgets.map(budget =>{
            const amount = getBudgetExpenses(budget.id).reduce(
              (total,expense) => total + expense.amount,
              0
            )
            return(
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() => setViewExpenseModalBudgetId(budget.id)}
              />
            )
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpenseClick={() => setAddExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard/>
        </div>
      </Container>

      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={()=>setShowAddBudgetModal(false)}
      />

      <AddExpenseModal
          show={showAddExpenseModal}
          defaultBudgetId={addExpenseModalBudgetId}
          handleClose={()=>setShowAddExpenseModal(false)}
      />

      <ViewExpenseModal
          budgetId={viewExpensesModalBudgetId}
          handleClose={() => setViewExpenseModalBudgetId()}
      />
    </>
  );
};

export default App;

