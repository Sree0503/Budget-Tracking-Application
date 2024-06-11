import React from 'react'
import {Button, Card, CardBody, CardTitle, ProgressBar, Stack } from 'react-bootstrap'
import { currencyFormatter } from '../utils.js'

export default function BudgetCard({name,amount,max,hideButtons,onAddExpenseClick,onViewExpenseClick}){
    return (
      <Card>
        <CardBody>
            <CardTitle className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                <div className='me-2'>{name}</div>
                <div className='d-flex align-items-baseline'>{currencyFormatter.format(amount)} <span className='text-muted fs-6 ms-1'>/ {currencyFormatter.format(max)} </span> </div>
            </CardTitle>
            <ProgressBar className='rounded-pill'
                        variant={getProgressBarVariant(amount,max)}
                        min={0}
                        max={max}
                        now={amount}/>
            {!hideButtons &&(
                        <Stack direction="horizontal" gap="2" className='mt-4'>
                            <Button variant='outline-primary' className='ms-auto' onClick={onAddExpenseClick}>Add Expense</Button>
                            <Button variant='outline-secondary' onClick={onViewExpenseClick}>View Expenses</Button>
                        </Stack>
            )}
        </CardBody>
    </Card>
    );
};
function getProgressBarVariant(amount,max){
    const ratio = amount/max;
    if (ratio < 0.5) return "primary"
    if(ratio < 0.75) return "warning"
    return "danger"
}
