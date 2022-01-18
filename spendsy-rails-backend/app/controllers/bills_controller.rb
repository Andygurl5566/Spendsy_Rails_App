class BillsController < ApplicationController


  def index
    bills = Bill.all 
    render json: bills
  end

  def create
    bill = Bill.create(bill_params)
    if bill.valid?
      render json: bill, status: :created
    else
      render json: {errors: bill.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    bill = Bill.find(params[:id])
    bill.update(bill_params)
    render json: bill
  end

  def destroy
    bill = Bill.find(params[:id])
    if bill
      bill.destroy
      head :no_content
    else
      render json: {error: 'Bill not found'}, status: :not_found
    end
  end

  private

  def bill_params
    params.permit(:bill_name, :bill_amount, :category_name, :wallet_id, :user_id)
  end

end
